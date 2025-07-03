import { DataSourceApi, DataSourceInstanceSettings, DataQueryRequest, DataQueryResponse, MutableDataFrame, FieldType, SelectableValue } from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';
import { firstValueFrom } from 'rxjs';
import { MyQuery, Filter, FhirDataSourceOptions, DEFAULT_QUERY } from './types';

export class DataSource extends DataSourceApi<MyQuery, FhirDataSourceOptions> {
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

  async query(options: DataQueryRequest<MyQuery>): Promise<DataQueryResponse> {
    const promises = options.targets.flatMap(target =>
      target.filters.map(f => this.fetchSeries({ ...f, refId: target.refId }))
    );
    const data = await Promise.all(promises);
    return { data };
  }

  async fetchSeries(filter: Filter & { refId?: string }) {
    if (!filter.resourceType) {
      return new MutableDataFrame({ refId: filter.refId, fields: [] });
    }
    let params = '';
    if (filter.field && filter.value) {
      const opMap: Record<string, string> = { '!=': ':ne', '>': ':gt', '<': ':lt', contains: ':contains', '=': '' };
      const op = opMap[filter.operator || '='] || '';
      params = `?${encodeURIComponent(filter.field)}${op}=${encodeURIComponent(filter.value)}`;
    }
    const url = `${this.getBaseUrl()}/${filter.resourceType}${params}`;
    const res = await firstValueFrom(getBackendSrv().fetch<any>({ url }));

    const resources = (res.data.entry || []).map((e: any) => e.resource || {});
    if (resources.length === 0) {
      return new MutableDataFrame({ refId: filter.refId, fields: [] });
    }

    const columns: string[] = Array.from(new Set(resources.flatMap((r: any) => Object.keys(r)))) as string[];
    const fields = columns.map((name: string) => ({ name, type: FieldType.string }));
    const frame = new MutableDataFrame({ refId: filter.refId, fields });

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

    return frame;
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

  async getFields(resourceType: string): Promise<Array<SelectableValue<string>>> {
    const base = this.getBaseUrl();
    try {
      const res = await firstValueFrom(
        getBackendSrv().fetch<any>({ url: `${base}/SearchParameter?base=${resourceType}` })
      );
      const entries = res.data.entry || [];
      if (entries.length > 0) {
        return entries.map((e: any) => ({ label: e.resource?.code, value: e.resource?.code }));
      }
    } catch (err) {
      console.error('SearchParameter fetch failed', err);
    }

    try {
      const res = await firstValueFrom(
        getBackendSrv().fetch<any>({ url: `${base}/StructureDefinition/${resourceType}` })
      );
      const elements = res.data.snapshot?.element || [];
      return elements.map((e: any) => ({ label: e.path, value: e.path }));
    } catch (err) {
      console.error('Failed to fetch fields', err);
      return [];
    }
  }
}
