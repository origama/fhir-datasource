import { DataQuery, DataSourceJsonData } from '@grafana/data';

export interface Filter {
  resourceType?: string;
  field?: string;
  operator?: string;
  value?: string;
}

export interface MyQuery extends DataQuery {
  filters: Filter[];
}

export const DEFAULT_QUERY: MyQuery = {
  refId: '',
  filters: [{}],
};

export interface FhirDataSourceOptions extends DataSourceJsonData {
  fhirAddress?: string;
  useProxy?: boolean;
}

export interface FhirSecureJsonData {}
