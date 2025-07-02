import { DataQuery, DataSourceJsonData } from '@grafana/data';

export interface FhirQuery extends DataQuery {
  resourceType: string;
  searchParam?: string;
  operator?: string;
  searchValue?: string;
}

export const DEFAULT_QUERY: Partial<FhirQuery> = {
  resourceType: 'Observation',
  operator: '==',
};

export interface FhirDataSourceOptions extends DataSourceJsonData {
  fhirAddress?: string;
  useProxy?: boolean;
}

export interface FhirSecureJsonData {}
