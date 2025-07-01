import { DataQuery, DataSourceJsonData } from '@grafana/data';

export interface FhirQuery extends DataQuery {
  target?: string;
  type?: string;
}

export interface FhirDataSourceOptions extends DataSourceJsonData {
  baseUrl?: string;
}
