import { DataSourcePlugin } from '@grafana/data';
import { FhirDataSource } from './reactDatasource';
import { ConfigEditor } from './ConfigEditor';
import { QueryEditor } from './QueryEditor';
import { MyQuery, MyDataSourceOptions } from './types';

export const plugin = new DataSourcePlugin<FhirDataSource, MyQuery, MyDataSourceOptions>(FhirDataSource)
  .setConfigEditor(ConfigEditor)
  .setQueryEditor(QueryEditor);
