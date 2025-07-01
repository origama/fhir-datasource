import React, { ChangeEvent } from 'react';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { MyDataSourceOptions } from './types';

export function ConfigEditor({ options, onOptionsChange }: DataSourcePluginOptionsEditorProps<MyDataSourceOptions>) {
  const onBaseUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    onOptionsChange({ ...options, jsonData: { ...options.jsonData, baseUrl: event.target.value } });
  };

  return (
    <div className="gf-form-group">
      <div className="gf-form">
        <span className="gf-form-label width-7">Base URL</span>
        <input
          type="text"
          className="gf-form-input"
          value={options.jsonData.baseUrl || ''}
          onChange={onBaseUrlChange}
        />
      </div>
    </div>
  );
}
