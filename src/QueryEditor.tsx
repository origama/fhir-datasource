import React, { ChangeEvent } from 'react';
import { InlineField, Input } from '@grafana/ui';
import { QueryEditorProps } from '@grafana/data';
import { DataSource } from './datasource';
import { FhirQuery, FhirDataSourceOptions } from './types';

type Props = QueryEditorProps<DataSource, FhirQuery, FhirDataSourceOptions>;

export function QueryEditor({ query, onChange, onRunQuery }: Props) {
  const onTargetChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...query, target: event.target.value });
    onRunQuery();
  };

  return (
    <InlineField label="Resource Type">
      <Input value={query.target || ''} onChange={onTargetChange} width={40} />
    </InlineField>
  );
}
