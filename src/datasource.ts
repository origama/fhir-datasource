import { DataSourceApi, DataSourceInstanceSettings, DataQueryRequest, DataQueryResponse, MutableDataFrame, FieldType, MetricFindValue, AppEvents } from '@grafana/data';
import { getBackendSrv, getAppEvents, getTemplateSrv } from '@grafana/runtime';
import { firstValueFrom } from 'rxjs';
import * as lodash from 'lodash';
const lodashGet: any = (lodash as any).get || (lodash as any).default?.get;
import { FhirQuery, FhirDataSourceOptions, DEFAULT_QUERY } from './types';
import { isTimeSeriesResource, extractDatapoints, pointsToDataFrame, TimeSeriesPoint } from './timeseries';

export class DataSource extends DataSourceApi<FhirQuery, FhirDataSourceOptions> {
  instanceSettings: DataSourceInstanceSettings<FhirDataSourceOptions>;

  constructor(instanceSettings: DataSourceInstanceSettings<FhirDataSourceOptions>) {
    super(instanceSettings);
    this.instanceSettings = instanceSettings;
  }

  private getProxyBase() {
    return `/api/datasources/proxy/${this.instanceSettings.id}`;
  }

  private getDirectBase() {
    const { jsonData, url } = this.instanceSettings;
    return jsonData.fhirAddress || url || 'http://localhost:8080/fhir';
  }

  private getBaseUrl() {
    const { jsonData } = this.instanceSettings;
    return jsonData.useProxy ? this.getProxyBase() : this.getDirectBase();
  }

  getDefaultQuery() {
    return DEFAULT_QUERY;
  }

  async query(options: DataQueryRequest<FhirQuery>): Promise<DataQueryResponse> {
    const templateSrv = getTemplateSrv();
    const promises = options.targets.map(t => {
      const replaced: FhirQuery = {
        ...t,
        queryString: t.queryString ? templateSrv.replace(t.queryString, options.scopedVars) : undefined,
        searchValue: t.searchValue ? templateSrv.replace(t.searchValue, options.scopedVars) : undefined,
        resourceType: t.resourceType ? templateSrv.replace(t.resourceType, options.scopedVars) : t.resourceType,
        legend: t.legend ? templateSrv.replace(t.legend, options.scopedVars) : t.legend,
      };
      return this.fetchSeries(replaced);
    });
    const results = await Promise.all(promises);
    const frames = results.flat();
    return { data: frames };
  }

  async fetchSeries(query: FhirQuery) {
    let url = '';
    if (query.queryString) {
      url = `${this.getBaseUrl()}/${query.queryString}`;
    } else {
      let params = '';
      if (query.searchParam && query.searchValue) {
        const prefix = query.operator === '!=' ? ':ne' : '';
        params = `?${encodeURIComponent(query.searchParam)}${prefix}=${encodeURIComponent(query.searchValue)}`;
      }
      url = `${this.getBaseUrl()}/${query.resourceType}${params}`;
    }
    const res = await firstValueFrom(getBackendSrv().fetch<any>({ url }));

    const resources = (res.data.entry || []).map((e: any) => e.resource || {});
    const tsPoints: TimeSeriesPoint[] = [];
    resources.forEach(r => {
      if (isTimeSeriesResource(r)) {
        tsPoints.push(...extractDatapoints(r));
      }
    });
    if (resources.length === 0) {
      return [new MutableDataFrame({ refId: query.refId, fields: [] })];
    }

    const columns: string[] = Array.from(new Set(resources.flatMap((r: any) => Object.keys(r)))) as string[];
    const fields = columns.map((name: string) => ({ name, type: FieldType.string }));
    const frame = new MutableDataFrame({ refId: query.refId, fields });

    resources.forEach((r: any) => {
      const row: Record<string, any> = {};
      columns.forEach((c) => {
        const v = r[c];
        if (v === null || v === undefined) {
          row[c] = null;
        } else if (typeof v === 'object') {
          row[c] = JSON.stringify(v);
        } else {
          row[c] = v;
        }
      });
      frame.add(row);
    });

    const tsFrame = tsPoints.length > 0 ? pointsToDataFrame(tsPoints, `${query.refId}_ts`) : new MutableDataFrame({ refId: `${query.refId}_ts`, fields: [] });

    let legend = query.legend;
    const sample = tsPoints[0]?.src || resources[0];
    if (legend && sample) {
      legend = legend.replace(/{{\s*([^}]+)\s*}}/g, (match, path) => {
        let p = (path || '').trim();
        if (p.startsWith('$.')) p = p.slice(2);
        else if (p.startsWith('$')) p = p.slice(1);
        const val = lodashGet(sample, p);
        return val == null ? match : String(val);
      });
    }
    if (legend) {
      (tsFrame as any).name = legend;
      (frame as any).name = legend;
    }

    switch (query.frameFormat) {
      case 'timeseries':
        return [tsFrame];
      case 'table':
      default:
        return [frame];
    }
  }

  async testDatasource() {
    try {
      await firstValueFrom(getBackendSrv().fetch({ url: `${this.getBaseUrl()}/metadata` }));
      return { status: 'success', message: 'Success' };
    } catch (err) {
      const e: any = err;
      const detail = e?.status ? e.status : e?.message;
      const msg = detail ? `Failed to connect to FHIR server: ${detail}` : 'Failed to connect to FHIR server';
      return { status: 'error', message: msg };
    }
  }

  async getResourceTypes() {
    try {
      const res = await firstValueFrom(getBackendSrv().fetch<any>({ url: `${this.getBaseUrl()}/metadata` }));
      const types = res.data.rest[0].resource.map((r: any) => ({ label: r.type, value: r.type }));
      return types;
    } catch (err) {
      console.error('Failed to fetch resource types', err);
      throw err;
    }
  }

  /**
   * Returns the available search parameters for the given resource type by
   * reading the server's capability statement.
   */
  async getSearchParameters(resourceType: string) {
    try {
      const res = await firstValueFrom(getBackendSrv().fetch<any>({ url: `${this.getBaseUrl()}/metadata` }));
      const resource = res.data.rest[0].resource.find((r: any) => r.type === resourceType);
      const params = (resource?.searchParam || []).map((p: any) => ({ label: p.name, value: p.name }));
      return params;
    } catch (err) {
      console.error('Failed to fetch search parameters', err);
      throw err;
    }
  }

  async metricFindQuery(query: string | { resource?: string; textField?: string; valueField?: string }): Promise<MetricFindValue[]> {
    let resource: string | undefined;
    let textField: string | undefined;
    let valueField: string | undefined;

    if (typeof query === 'string') {
      [resource, textField, valueField] = query.split('|');
    } else if (query) {
      ({ resource, textField, valueField } = query);
    }

    if (!resource || !textField || !valueField) {
      return [];
    }

    const url = `${this.getBaseUrl()}/${resource}`;
    try {
      const res = await firstValueFrom(getBackendSrv().fetch<any>({ url }));

      if (res.data.issue) {
        const detail = res.data.issue[0]?.diagnostics || res.data.issue[0]?.details?.text;
        (getAppEvents() as any)?.emit(AppEvents.alertError, ['FHIR query error', detail]);
        return [];
      }

      const resources = (res.data.entry || []).map((e: any) => e.resource || {});
      const textPaths = textField!.split(',').map(p => p.trim()).filter(Boolean);
      return resources.map((r: any) => ({
        text: textPaths.map(p => lodashGet(r, p)).filter(v => v != null).join(' '),
        value: lodashGet(r, valueField!),
      }));
    } catch (err: any) {
      const detail = err?.statusText || err?.message;
      (getAppEvents() as any)?.emit(AppEvents.alertError, ['FHIR query error', detail]);
      throw err;
    }
  }
}
