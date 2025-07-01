import { DataSourceApi, DataSourceInstanceSettings, DataQueryRequest, DataQueryResponse, MutableDataFrame, FieldType } from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';
import { FhirQuery, FhirDataSourceOptions, DEFAULT_QUERY } from './types';

export class DataSource extends DataSourceApi<FhirQuery, FhirDataSourceOptions> {
  baseUrl: string;

  constructor(instanceSettings: DataSourceInstanceSettings<FhirDataSourceOptions>) {
    super(instanceSettings);
    this.baseUrl = instanceSettings.jsonData.fhirAddress || instanceSettings.url || 'http://localhost:8080/fhir';
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
    const params = query.searchParam && query.searchValue ? `?${encodeURIComponent(query.searchParam)}=${encodeURIComponent(query.searchValue)}` : '';
    const url = `${this.baseUrl}/${query.resourceType}${params}`;
    const res = await getBackendSrv().fetch<any>({ url }).toPromise();
    const frame = new MutableDataFrame({ refId: query.refId, fields: [{ name: 'Time', type: FieldType.time }, { name: 'Value', type: FieldType.number }] });
    (res.data.entry || []).forEach((e: any) => {
      const r = e.resource || {};
      const ts = Date.parse(r.effectiveDateTime || r.issued || (r.meta && r.meta.lastUpdated) || '');
      const val = r.valueQuantity && r.valueQuantity.value;
      if (!isNaN(ts) && typeof val === 'number') {
        frame.add({ Time: ts, Value: val });
      }
    });
    return frame;
  }

  async testDatasource() {
    try {
      await getBackendSrv().fetch({ url: `${this.baseUrl}/metadata` }).toPromise();
      return { status: 'success', message: 'Success' };
    } catch (err) {
      return { status: 'error', message: 'Failed to connect to FHIR server' };
    }
  }

  async getResourceTypes() {
    try {
      const res = await getBackendSrv().fetch<any>({ url: `${this.baseUrl}/metadata` }).toPromise();
      const types = res.data.rest[0].resource.map((r: any) => ({ label: r.type, value: r.type }));
      return types;
    } catch (err) {
      return [];
    }
  }
}
