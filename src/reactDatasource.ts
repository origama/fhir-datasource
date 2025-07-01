import { DataSourceApi, DataQueryRequest, DataQueryResponse, DataSourceInstanceSettings } from '@grafana/data';
import { MyQuery, MyDataSourceOptions } from './types';

export class FhirDataSource extends DataSourceApi<MyQuery, MyDataSourceOptions> {
  constructor(instanceSettings: DataSourceInstanceSettings<MyDataSourceOptions>) {
    super(instanceSettings);
  }

  async query(options: DataQueryRequest<MyQuery>): Promise<DataQueryResponse> {
    return { data: [] };
  }

  async testDatasource() {
    return { status: 'success', message: 'Success' };
  }
}
