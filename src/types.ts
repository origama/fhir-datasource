import { DataQuery, DataSourceJsonData } from '@grafana/data';

export interface MyQuery extends DataQuery {
  queryText?: string;
}

export interface MyDataSourceOptions extends DataSourceJsonData {
  baseUrl?: string;
}
