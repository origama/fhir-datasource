import { DataSourceApi, DataQueryRequest, DataQueryResponse, DataSourceInstanceSettings } from '@grafana/data';
import { getTemplateSrv } from '@grafana/runtime';
import nativeFhir from 'fhir.js/src/adapters/native';
import { GrafanaHelper } from './utils/grafana/grafana.module';
import { FhirQuery, FhirDataSourceOptions } from './types';

export class DataSource extends DataSourceApi<FhirQuery, FhirDataSourceOptions> {
  client: any;
  conformance: any;
  templateSrv: any;
  config: FhirDataSourceOptions;

  constructor(instanceSettings: DataSourceInstanceSettings<FhirDataSourceOptions>) {
    super(instanceSettings);
    this.templateSrv = getTemplateSrv();
    this.config = instanceSettings.jsonData || {};
    const conf: any = {
      baseUrl: this.config.baseUrl || 'http://fhirtest.uhn.ca/baseDstu3',
      credentials: 'same-origin',
    };
    this.client = nativeFhir(conf);
  }

  async query(_options: DataQueryRequest<FhirQuery>): Promise<DataQueryResponse> {
    return { data: [] };
  }

  async metricFindQuery(query: string) {
    const interpolated = {
      target: this.templateSrv.replace(query, {}, 'regex'),
    };
    const response = await this.client.conformance({});
    return response.data.rest[0].resource.map((r: any) => ({ text: r.type, value: r.type }));
  }

  async testDatasource() {
    try {
      const response = await this.client.conformance({});
      this.conformance = response.data;
      if (this.conformance && this.conformance.fhirVersion) {
        return GrafanaHelper.Response.success('Success', 'FHIR server reachable');
      }
      return GrafanaHelper.Response.error('Cannot add Server!', "The server doesn't seem to be a valid one!");
    } catch (err: any) {
      const msg = err?.message || 'Unknown error';
      return GrafanaHelper.Response.error('Cannot add Server!', msg);
    }
  }
}
