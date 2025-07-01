import React, { ChangeEvent } from 'react';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { InlineField, Input } from '@grafana/ui';
import { FhirDataSourceOptions, FhirSecureJsonData } from '../types';

interface Props extends DataSourcePluginOptionsEditorProps<FhirDataSourceOptions, FhirSecureJsonData> {}

export function ConfigEditor({ options, onOptionsChange }: Props) {
  const { jsonData } = options;

  const onUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    onOptionsChange({
      ...options,
      jsonData: {
        ...jsonData,
        fhirAddress: event.target.value,
      },
    });
  };

  return (
    <InlineField label="FHIR base URL" labelWidth={20} tooltip="Root URL of the FHIR server">
      <Input
        width={40}
        value={jsonData.fhirAddress || ''}
        placeholder="http://localhost:8080/fhir"
        onChange={onUrlChange}
      />
    </InlineField>
  );
}
