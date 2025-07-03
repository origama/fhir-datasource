import React, { useEffect, useRef, useState } from 'react';
import { QueryEditorProps, SelectableValue } from '@grafana/data';
import { Field, Select, AsyncSelect, Input, Button, stylesFactory } from '@grafana/ui';
import { DataSource } from '../datasource';
import { FhirDataSourceOptions, MyQuery, Filter } from '../types';
import debounce from 'lodash/debounce';

interface Props extends QueryEditorProps<DataSource, MyQuery, FhirDataSourceOptions> {}

export function buildFhirSearchString(filters: Filter[]): string {
  const opMap: Record<string, string> = { '!=': ':ne', '>': ':gt', '<': ':lt', contains: ':contains', '=': '' };
  return filters
    .filter(f => f.resourceType && f.field && f.value)
    .map(f => `${f.resourceType}?${f.field}${opMap[f.operator || '='] || ''}=${f.value}`)
    .join('&');
}

const operatorOptions: Array<SelectableValue<string>> = [
  { label: '=', value: '=' },
  { label: '!=', value: '!=' },
  { label: '>', value: '>' },
  { label: '<', value: '<' },
  { label: 'contains', value: 'contains' },
];

const getStyles = stylesFactory(() => ({
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '4px',
  },
}));

export default function QueryEditor({ query, datasource, onChange, onRunQuery }: Props) {
  const styles = getStyles();
  const [resources, setResources] = useState<Array<SelectableValue<string>>>([]);
  const fieldCache = useRef<Record<string, Array<SelectableValue<string>>>>({});

  useEffect(() => {
    datasource.getResourceTypes().then(setResources);
  }, [datasource]);

  useEffect(() => {
    if (!query.filters || query.filters.length === 0) {
      onChange({ ...query, filters: [{}] });
    }
  }, [query, onChange]);

  const loadFields = async (rt: string) => {
    if (fieldCache.current[rt]) {
      return fieldCache.current[rt];
    }
    const opts = await datasource.getFields(rt);
    fieldCache.current[rt] = opts;
    return opts;
  };

  const debouncedLoad = useRef(debounce(loadFields, 300)).current;

  const updateFilter = (idx: number, patch: Partial<Filter>) => {
    const filters = query.filters.map((f, i) => (i === idx ? { ...f, ...patch } : f));
    onChange({ ...query, filters });
    onRunQuery();
  };

  const addFilter = () => {
    onChange({ ...query, filters: [...query.filters, {}] });
    onRunQuery();
  };

  const removeFilter = (idx: number) => {
    const filters = query.filters.filter((_, i) => i !== idx);
    onChange({ ...query, filters: filters.length > 0 ? filters : [{}] });
    onRunQuery();
  };

  return (
    <div>
      {query.filters.map((f, i) => (
        <div className={styles.row} key={i}>
          <Field label="Resource Type" horizontal>
            <Select
              options={resources}
              value={f.resourceType}
              onChange={v => updateFilter(i, { resourceType: v.value, field: undefined })}
              width={20}
            />
          </Field>
          <Field label="Field" horizontal>
            <AsyncSelect
              isDisabled={!f.resourceType}
              loadOptions={(value) => (f.resourceType ? debouncedLoad(f.resourceType) : Promise.resolve([]))}
              onChange={v => updateFilter(i, { field: v.value })}
              value={f.field}
              width={20}
            />
          </Field>
          <Field label="Operator" horizontal>
            <Select
              options={operatorOptions}
              value={f.operator}
              onChange={v => updateFilter(i, { operator: v.value })}
              isDisabled={!f.field}
              width={12}
            />
          </Field>
          <Field label="Value" horizontal>
            <Input
              value={f.value || ''}
              onChange={e => updateFilter(i, { value: e.target.value }, true)}
              disabled={!f.operator}
              width={20}
            />
          </Field>
          <Button variant="secondary" icon="trash-alt" onClick={() => removeFilter(i)} />
        </div>
      ))}
      <Button variant="secondary" onClick={addFilter} icon="plus">
        ＋ Add filter
      </Button>
    </div>
  );
}
