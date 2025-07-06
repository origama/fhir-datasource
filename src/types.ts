import { DataQuery, DataSourceJsonData } from '@grafana/data';

export interface FhirQuery extends DataQuery {
  /**
   * Raw query string in the form `Resource?param=value` as entered in the
   * editor's code mode. When provided this value takes precedence over the
   * structured fields below.
   */
  queryString?: string;

  /** The resource type to query when using the builder UI */
  resourceType: string;
  /** Search parameter name */
  searchParam?: string;
  /** Comparison operator */
  operator?: string;
  /** Search parameter value */
  searchValue?: string;

  /** Desired response format */
  frameFormat?: 'table' | 'timeseries';
}

export const DEFAULT_QUERY: Partial<FhirQuery> = {
  resourceType: 'Observation',
  operator: '==',
  frameFormat: 'table',
};

export interface FhirDataSourceOptions extends DataSourceJsonData {
  fhirAddress?: string;
  useProxy?: boolean;
}

export interface FhirSecureJsonData {}
