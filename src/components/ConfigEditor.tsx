import React from 'react';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { Alert } from '@grafana/ui';
import { FhirDataSourceOptions, FhirSecureJsonData } from '../types';

interface Props extends DataSourcePluginOptionsEditorProps<FhirDataSourceOptions, FhirSecureJsonData> {}

export function ConfigEditor() {
  return (
    <Alert title="Configuration" severity="info">
      Use the built-in <strong>URL</strong> field above to configure the FHIR server.
    </Alert>
  );
}
