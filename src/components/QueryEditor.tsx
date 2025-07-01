import React, { useEffect, useState } from 'react';
import { QueryEditorProps, SelectableValue } from '@grafana/data';
import { InlineField, Select, Input, Stack } from '@grafana/ui';
import { DataSource } from '../datasource';
import { FhirDataSourceOptions, FhirQuery } from '../types';

type Props = QueryEditorProps<DataSource, FhirQuery, FhirDataSourceOptions>;

export function QueryEditor({ query, datasource, onChange, onRunQuery }: Props) {
  const [resources, setResources] = useState<Array<SelectableValue<string>>>([]);

  useEffect(() => {
    datasource.getResourceTypes().then((types) => setResources(types));
  }, [datasource]);

  const onResourceChange = (v: SelectableValue<string>) => {
    onChange({ ...query, resourceType: v.value || '' });
    onRunQuery();
  };

  const onParamChange = (v: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...query, searchParam: v.target.value });
  };

  const onValueChange = (v: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...query, searchValue: v.target.value });
    onRunQuery();
  };

  return (
    <Stack gap={1} wrap={false} direction="row">
      <InlineField label="Resource">
        <Select options={resources} value={query.resourceType} onChange={onResourceChange} width={20} />
      </InlineField>
      <InlineField label="Search">
        <Input width={20} value={query.searchParam || ''} onChange={onParamChange} placeholder="code" />
      </InlineField>
      <InlineField label="Value">
        <Input width={20} value={query.searchValue || ''} onChange={onValueChange} placeholder="*" />
      </InlineField>
    </Stack>
  );
}
