import { DataSourceApi, DataSourceInstanceSettings, DataQueryRequest, DataQueryResponse, MutableDataFrame, FieldType } from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';
import { firstValueFrom } from 'rxjs';
import { FhirQuery, FhirDataSourceOptions, DEFAULT_QUERY } from './types';

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
    const promises = options.targets.map(t => this.fetchSeries(t));
    const data = await Promise.all(promises);
    return { data };
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
    if (resources.length === 0) {
      return new MutableDataFrame({ refId: query.refId, fields: [] });
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
}
