import { DataSourcePlugin } from '@grafana/data';
import { DataSource } from './datasource';
import { ConfigEditor } from './components/ConfigEditor';
import QueryEditor from './components/QueryEditor';
import { MyQuery, FhirDataSourceOptions } from './types';

export const plugin = new DataSourcePlugin<DataSource, MyQuery, FhirDataSourceOptions>(DataSource)
  .setConfigEditor(ConfigEditor)
  .setQueryEditor(QueryEditor);
