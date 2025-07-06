import React, { useState, useEffect } from 'react';
import { DataSourceVariableQueryEditorProps } from '@grafana/data';
import { InlineField, Input, Stack, Button } from '@grafana/ui';
import { DataSource } from '../datasource';

interface VariableQuery {
  resource?: string;
  textField?: string;
  valueField?: string;
}

export function VariableQueryEditor({ query, onChange, onRunQuery }: DataSourceVariableQueryEditorProps<DataSource>) {
  const q = (query || {}) as VariableQuery;

  const [resource, setResource] = useState(q.resource || '');
  const [textField, setTextField] = useState(q.textField || '');
  const [valueField, setValueField] = useState(q.valueField || '');

  useEffect(() => {
    setResource(q.resource || '');
    setTextField(q.textField || '');
    setValueField(q.valueField || '');
  }, [q.resource, q.textField, q.valueField]);

  const run = () => {
    const next = { resource, textField, valueField };
    const definition = `${resource}|${textField}|${valueField}`;
    onChange(next, definition);
    onRunQuery();
  };

  return (
    <Stack direction="column" gap={1} wrap="nowrap">
      <InlineField label="Resource">
        <Input value={resource} onChange={e => setResource(e.currentTarget.value)} width={20} />
      </InlineField>
      <InlineField label="Text field">
        <Input value={textField} onChange={e => setTextField(e.currentTarget.value)} width={20} />
      </InlineField>
      <InlineField label="Value field">
        <Input value={valueField} onChange={e => setValueField(e.currentTarget.value)} width={20} />
      </InlineField>
      <Button variant="secondary" size="sm" onClick={run}>
        Run query
      </Button>
    </Stack>
  );
}
