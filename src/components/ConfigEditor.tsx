import React, { ChangeEvent } from 'react';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { InlineField, Input, InlineSwitch, Stack } from '@grafana/ui';
import { FhirDataSourceOptions, FhirSecureJsonData } from '../types';

interface Props extends DataSourcePluginOptionsEditorProps<FhirDataSourceOptions, FhirSecureJsonData> {}

export function ConfigEditor({ options, onOptionsChange }: Props) {
  const { jsonData } = options;

  const onUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onOptionsChange({
      ...options,
      url: value,
      jsonData: {
        ...jsonData,
        fhirAddress: value,
      },
    });
  };

  const onProxyChange = (event: ChangeEvent<HTMLInputElement>) => {
    onOptionsChange({
      ...options,
      jsonData: {
        ...jsonData,
        useProxy: event.target.checked,
      },
    });
  };

  return (
    <Stack gap={1} direction="column">
      <InlineField label="FHIR base URL" labelWidth={20} tooltip="Root URL of the FHIR server">
        <Input width={40} value={jsonData.fhirAddress || ''} placeholder="http://fhir:8080/fhir" onChange={onUrlChange} />
      </InlineField>
      <InlineField label="Use proxy" labelWidth={20} tooltip="Route requests through Grafana">
        <InlineSwitch value={jsonData.useProxy ?? false} onChange={onProxyChange} />
      </InlineField>
    </Stack>
  );
}
