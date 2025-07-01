import { DataQuery, DataSourceJsonData } from '@grafana/data';

export interface FhirQuery extends DataQuery {
  resourceType: string;
  searchParam?: string;
  searchValue?: string;
}

export const DEFAULT_QUERY: Partial<FhirQuery> = {
  resourceType: 'Observation',
};

export interface FhirDataSourceOptions extends DataSourceJsonData {
  fhirAddress?: string;
}

export interface FhirSecureJsonData {}
