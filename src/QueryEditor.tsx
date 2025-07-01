import React, { ChangeEvent } from 'react';
import { QueryEditorProps } from '@grafana/data';
import { MyDataSourceOptions, MyQuery } from './types';
import { FhirDataSource } from './reactDatasource';

export function QueryEditor({ query, onChange, onRunQuery }: QueryEditorProps<FhirDataSource, MyQuery, MyDataSourceOptions>) {
  const onQueryTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...query, queryText: event.target.value });
  };

  return (
    <div className="gf-form-inline">
      <div className="gf-form">
        <span className="gf-form-label">Query</span>
        <input
          type="text"
          className="gf-form-input"
          value={query.queryText || ''}
          onChange={onQueryTextChange}
          onBlur={onRunQuery}
        />
      </div>
    </div>
  );
}
