import React from 'react';
import { DataSourceVariableQueryEditorProps } from '@grafana/data';
import { InlineField, Input, Stack } from '@grafana/ui';
import { DataSource } from '../datasource';

interface VariableQuery {
  resource?: string;
  textField?: string;
  valueField?: string;
}

export function VariableQueryEditor({ query, onChange }: DataSourceVariableQueryEditorProps<DataSource>) {
  const q = (query || {}) as VariableQuery;

  const update = (patch: Partial<VariableQuery>) => {
    const next = { ...q, ...patch };
    const definition = `${next.resource || ''}|${next.textField || ''}|${next.valueField || ''}`;
    onChange(next, definition);
  };

  return (
    <Stack direction="column" gap={1} wrap="nowrap">
      <InlineField label="Resource">
        <Input value={q.resource || ''} onChange={e => update({ resource: e.currentTarget.value })} width={20} />
      </InlineField>
      <InlineField label="Text field">
        <Input value={q.textField || ''} onChange={e => update({ textField: e.currentTarget.value })} width={20} />
      </InlineField>
      <InlineField label="Value field">
        <Input value={q.valueField || ''} onChange={e => update({ valueField: e.currentTarget.value })} width={20} />
      </InlineField>
    </Stack>
  );
}
