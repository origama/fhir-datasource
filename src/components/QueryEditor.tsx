import React, { useCallback, useEffect, useState } from 'react';
import { QueryEditorProps, SelectableValue } from '@grafana/data';
import { Button, InlineField, Input, Label, Stack, Select } from '@grafana/ui';
import { DataSource } from '../datasource';
import { FhirDataSourceOptions, FhirQuery } from '../types';

interface Props extends QueryEditorProps<DataSource, FhirQuery, FhirDataSourceOptions> {
  /** Optional callback invoked whenever the raw query string changes */
  onQueryChange?: (query: string) => void;
}

interface FilterRow {
  param: string;
  value: string;
}

export function QueryEditor({
  query,
  datasource,
  onChange,
  onRunQuery,
  onQueryChange,
}: Props) {
  const [mode, setMode] = useState<'builder' | 'code'>(() => (query.queryString ? 'code' : 'builder'));
  const [currentQuery, setCurrentQuery] = useState<string>(query.queryString || '');
  const [resources, setResources] = useState<Array<SelectableValue<string>>>([]);
  const [searchParams, setSearchParams] = useState<Array<SelectableValue<string>>>([]);
  const [resource, setResource] = useState<string>('');
  const [filters, setFilters] = useState<FilterRow[]>([{ param: '', value: '' }]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    datasource.getResourceTypes().then(setResources);
  }, [datasource]);

  useEffect(() => {
    if (resource) {
      datasource.getSearchParameters(resource).then(setSearchParams).catch(() => setSearchParams([]));
    }
  }, [datasource, resource]);

  const parseQuery = useCallback((qs: string) => {
    if (!qs) {
      return { resourceType: '', filters: [] as FilterRow[] };
    }
    const [res, params] = qs.split('?');
    if (!res) {
      throw new Error('Missing resource type');
    }
    const parsed: FilterRow[] = [];
    if (params) {
      const search = new URLSearchParams(params);
      search.forEach((v, k) => {
        parsed.push({ param: k, value: v });
      });
    }
    return { resourceType: res, filters: parsed };
  }, []);

  const buildQuery = useCallback((resType: string, fltrs: FilterRow[]) => {
    if (!resType) {
      return '';
    }
    const parts = fltrs
      .filter(f => f.param && f.value)
      .map(f => `${encodeURIComponent(f.param)}=${encodeURIComponent(f.value)}`)
      .join('&');
    return parts ? `${resType}?${parts}` : resType;
  }, []);

  // Keep query string up to date in builder mode
  useEffect(() => {
    if (mode === 'builder') {
      const q = buildQuery(resource, filters);
      setCurrentQuery(q);
      onChange({ ...query, queryString: q });
      onQueryChange?.(q);
    }
  }, [mode, resource, filters, buildQuery]);

  const switchMode = useCallback(() => {
    if (mode === 'code') {
      try {
        const parsed = parseQuery(currentQuery);
        setResource(parsed.resourceType);
        setFilters(parsed.filters.length > 0 ? parsed.filters : [{ param: '', value: '' }]);
        setMode('builder');
        setError(null);
      } catch (err: any) {
        setError(err.message);
      }
    } else {
      setMode('code');
      setError(null);
    }
  }, [mode, currentQuery, parseQuery]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'm') {
        e.preventDefault();
        switchMode();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [switchMode]);

  const onCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const q = e.target.value;
    setCurrentQuery(q);
    onChange({ ...query, queryString: q });
    onQueryChange?.(q);
  };

  const addFilter = () => {
    setFilters([...filters, { param: '', value: '' }]);
  };

  const changeParam = (idx: number, value: string) => {
    const next = filters.slice();
    next[idx].param = value;
    setFilters(next);
  };
  const changeValue = (idx: number, value: string) => {
    const next = filters.slice();
    next[idx].value = value;
    setFilters(next);
  };

  if (mode === 'code') {
    return (
      <Stack direction="column" gap={1} wrap="nowrap">
        <Input
          width={40}
          value={currentQuery}
          onChange={onCodeChange}
          placeholder="Patient?name=John"
        />
        {error && <Label color="red">{error}</Label>}
        <Button variant="secondary" size="sm" onClick={switchMode}>
          » Switch to Builder (Ctrl+⇧+M)
        </Button>
      </Stack>
    );
  }

  return (
    <Stack direction="column" gap={1} wrap="nowrap">
      <Stack direction="row" gap={1} wrap="nowrap">
        <InlineField label="Resource">
          <Select options={resources} value={resource} onChange={v => setResource(v.value || '')} width={20} />
        </InlineField>
      </Stack>
      {filters.map((f, i) => (
        <Stack direction="row" gap={1} wrap="nowrap" key={i} alignItems="flex-end">
          <InlineField label="Search">
            <Select
              options={searchParams}
              value={f.param}
              onChange={v => changeParam(i, v.value || '')}
              width={20}
            />
          </InlineField>
          <InlineField label="Value">
            <Input value={f.value} onChange={e => changeValue(i, e.target.value)} width={20} />
          </InlineField>
          {i === filters.length - 1 && (
            <Button variant="secondary" size="sm" onClick={addFilter}>
              + Add filter
            </Button>
          )}
        </Stack>
      ))}
      <Button variant="secondary" size="sm" onClick={switchMode}>
        » Switch to Code (Ctrl+⇧+M)
      </Button>
    </Stack>
  );
}
