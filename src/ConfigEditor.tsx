import React, { ChangeEvent } from 'react';
import { InlineField, Input } from '@grafana/ui';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { FhirDataSourceOptions } from './types';

interface Props extends DataSourcePluginOptionsEditorProps<FhirDataSourceOptions> {}

export function ConfigEditor(props: Props) {
  const { onOptionsChange, options } = props;
  const { jsonData } = options;

  const onBaseUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    onOptionsChange({ ...options, jsonData: { ...jsonData, baseUrl: event.target.value } });
  };

  return (
    <InlineField label="FHIR Base Address" labelWidth={20}>
      <Input value={jsonData.baseUrl || ''} onChange={onBaseUrlChange} width={40} />
    </InlineField>
  );
}
