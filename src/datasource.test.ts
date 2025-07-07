import { of, throwError } from 'rxjs';
import { DataSource } from './datasource';
import { getBackendSrv, getAppEvents, getTemplateSrv } from '@grafana/runtime';

jest.mock('@grafana/runtime', () => ({
  getBackendSrv: jest.fn(),
  getAppEvents: jest.fn(),
  getTemplateSrv: jest.fn(),
}));

jest.mock('@grafana/data', () => {
  const addMock = jest.fn();
  class MockFrame {
    _opts: any;
    fields: any[];
    getFieldByName: (name: string) => any;
    add = addMock;
    constructor(opts?: any) {
      this._opts = opts;
      this.fields = (opts?.fields || []).map((f: any) => ({ ...f, config: {} }));
      this.getFieldByName = (name: string) => this.fields.find((fl: any) => fl.name === name);
    }
  }
  return {
    DataSourceApi: class {},
    MutableDataFrame: MockFrame,
    FieldType: { time: 'time', number: 'number', string: 'string' },
    SelectableValue: class {},
    AppEvents: { alertError: 'alert-error' },
    __addMock: addMock,
  };
});

describe('DataSource.fetchSeries', () => {
  it('converts resources to a dataframe', async () => {
    const { __addMock } = jest.requireMock('@grafana/data');
    __addMock.mockClear();
    const fetch = jest.fn().mockReturnValue(
      of({ data: { entry: [{ resource: { id: '1', name: 'Alice' } }, { resource: { id: '2', name: 'Bob' } }] } })
    );
    (getBackendSrv as jest.Mock).mockReturnValue({ fetch });

    const ds = new DataSource(makeSettings('http://example.com'));
    const frames: any[] = await ds.fetchSeries({ queryString: 'Patient', refId: 'A', frameFormat: 'table' } as any);
    const frame = frames[0];

    expect(fetch).toHaveBeenCalledWith({ url: '/api/datasources/proxy/1/Patient' });
    expect(frame._opts.fields).toEqual([
      { name: 'id', type: 'string' },
      { name: 'name', type: 'string' },
    ]);
    expect(__addMock).toHaveBeenCalledTimes(2);
    expect(__addMock.mock.calls[0][0]).toEqual({ id: '1', name: 'Alice' });
    expect(__addMock.mock.calls[1][0]).toEqual({ id: '2', name: 'Bob' });
  });

  it('applies time range and follows pagination', async () => {
    const fetch = jest
      .fn()
      .mockReturnValueOnce(
        of({
          data: {
            entry: [{ resource: { id: '1' } }],
            link: [{ relation: 'next', url: '/Patient?page=2' }],
          },
        })
      )
      .mockReturnValueOnce(
        of({ data: { entry: [{ resource: { id: '2' } }] } })
      );
    (getBackendSrv as jest.Mock).mockReturnValue({ fetch });

    const ds = new DataSource(makeSettings('http://example.com'));
    const range = { from: new Date('2024-01-01T00:00:00Z'), to: new Date('2024-01-02T00:00:00Z') };
    const frames: any[] = await ds.fetchSeries({ queryString: 'Patient', refId: 'A', frameFormat: 'table' } as any, range);
    const from = encodeURIComponent(range.from.toISOString());
    const to = encodeURIComponent(range.to.toISOString());
    expect(fetch.mock.calls[0][0]).toEqual({ url: `/api/datasources/proxy/1/Patient?_lastUpdated=ge${from}&_lastUpdated=le${to}` });
    expect(fetch.mock.calls[1][0]).toEqual({ url: '/api/datasources/proxy/1/Patient?page=2' });
    expect(frames[0]._opts.fields[0].name).toBe('id');
    expect(frames[0]._opts.fields.length).toBe(1);
  });

  it('returns a timeseries frame when requested', async () => {
    const fetch = jest.fn().mockReturnValue(
      of({
        data: {
          entry: [
            {
              resource: {
                resourceType: 'Observation',
                effectiveDateTime: '2023-01-01T00:00:00Z',
                code: { coding: [{ code: 'hr' }] },
                valueQuantity: { value: 70, unit: 'bpm' },
                subject: { reference: 'Patient/1' },
              },
            },
          ],
        },
      })
    );
    (getBackendSrv as jest.Mock).mockReturnValue({ fetch });

    const ds = new DataSource(makeSettings('http://example.com'));
    const frames: any[] = await ds.fetchSeries({ queryString: 'Observation', refId: 'B', frameFormat: 'timeseries' } as any);
    expect(frames[0]._opts.refId).toBe('B_ts');
    expect(frames[0]._opts.fields[0].name).toBe('seriesKey');
  });
});

function makeSettings(url: string, useProxy = true) {
  return {
    id: 1,
    uid: 'test',
    type: 'fhir-datasource',
    name: 'FHIR',
    jsonData: { fhirAddress: url, useProxy },
  } as any;
}

describe('DataSource.testDatasource', () => {
  it('fetches metadata via the datasource proxy', async () => {
    const fetch = jest.fn().mockReturnValue(of({ data: {} }));
    (getBackendSrv as jest.Mock).mockReturnValue({ fetch });
    const ds = new DataSource(makeSettings('http://example.com'));
    const result = await ds.testDatasource();
    expect(fetch).toHaveBeenCalledWith({ url: '/api/datasources/proxy/1/metadata' });
    expect(result).toEqual({ status: 'success', message: 'Success' });
  });

  it('fetches metadata directly when proxy disabled', async () => {
    const fetch = jest.fn().mockReturnValue(of({ data: {} }));
    (getBackendSrv as jest.Mock).mockReturnValue({ fetch });
    const ds = new DataSource(makeSettings('http://example.com', false));
    const result = await ds.testDatasource();
    expect(fetch).toHaveBeenCalledWith({ url: 'http://example.com/metadata' });
    expect(result).toEqual({ status: 'success', message: 'Success' });
  });

  it('returns error message with status code', async () => {
    const fetch = jest.fn().mockReturnValue(throwError(() => ({ status: 404, statusText: 'Not Found' })));
    (getBackendSrv as jest.Mock).mockReturnValue({ fetch });
    const ds = new DataSource(makeSettings('http://example.com'));
    const result = await ds.testDatasource();
    expect(result.status).toBe('error');
    expect(result.message).toContain('404');
  });

  it('returns error message with error text', async () => {
    const fetch = jest.fn().mockReturnValue(throwError(() => new Error('boom')));
    (getBackendSrv as jest.Mock).mockReturnValue({ fetch });
    const ds = new DataSource(makeSettings('http://example.com'));
    const result = await ds.testDatasource();
    expect(result.status).toBe('error');
    expect(result.message).toContain('boom');
  });
});

describe('DataSource.getResourceTypes', () => {
  it('propagates errors', async () => {
    const error = new Error('oops');
    const fetch = jest.fn().mockReturnValue(throwError(() => error));
    (getBackendSrv as jest.Mock).mockReturnValue({ fetch });
    const ds = new DataSource(makeSettings('http://example.com'));
    await expect(ds.getResourceTypes()).rejects.toThrow('oops');
  });
});

describe('DataSource.metricFindQuery', () => {
  it('fetches resources and maps text/value', async () => {
    const fetch = jest.fn().mockReturnValue(
      of({ data: { entry: [
        { resource: { id: '1', name: [{ family: 'Smith' }] } },
        { resource: { id: '2', name: [{ family: 'Jones' }] } },
      ] } })
    );
    (getBackendSrv as jest.Mock).mockReturnValue({ fetch });
    const ds = new DataSource(makeSettings('http://example.com'));
    const res = await ds.metricFindQuery('Patient|name[0].family|id');
    expect(fetch).toHaveBeenCalledWith({ url: '/api/datasources/proxy/1/Patient' });
    expect(res).toEqual([
      { text: 'Smith', value: '1' },
      { text: 'Jones', value: '2' },
    ]);
  });

  it('handles nested value fields', async () => {
    const fetch = jest.fn().mockReturnValue(
      of({ data: { entry: [
        { resource: { id: 'obs1', subject: { reference: 'Patient/1' } } },
      ] } })
    );
    (getBackendSrv as jest.Mock).mockReturnValue({ fetch });
    const ds = new DataSource(makeSettings('http://example.com'));
    const res = await ds.metricFindQuery('Observation|subject.reference|id');
    expect(res).toEqual([{ text: 'Patient/1', value: 'obs1' }]);
  });

  it('combines multiple text fields', async () => {
    const fetch = jest.fn().mockReturnValue(
      of({ data: { entry: [
        { resource: { id: '1', name: [{ given: ['Alice'], family: 'Smith' }] } },
      ] } })
    );
    (getBackendSrv as jest.Mock).mockReturnValue({ fetch });
    const ds = new DataSource(makeSettings('http://example.com'));
    const res = await ds.metricFindQuery('Patient|name[0].given[0], name[0].family|id');
    expect(res).toEqual([{ text: 'Alice Smith', value: '1' }]);
  });

  it('shows toast when response has issue', async () => {
    const fetch = jest.fn().mockReturnValue(
      of({ data: { issue: [{ diagnostics: 'bad request' }] } })
    );
    const emit = jest.fn();
    (getBackendSrv as jest.Mock).mockReturnValue({ fetch });
    (getAppEvents as jest.Mock).mockReturnValue({ emit });
    const ds = new DataSource(makeSettings('http://example.com'));
    const res = await ds.metricFindQuery('Patient|name|id');
    expect(res).toEqual([]);
    expect(emit).toHaveBeenCalledWith('alert-error', ['FHIR query error', 'bad request']);
  });
});

describe('DataSource.query template variables', () => {
  it('replaces vars in queryString', async () => {
    const fetch = jest.fn().mockReturnValue(of({ data: { entry: [] } }));
    const replace = jest.fn().mockImplementation((str: string) => str.replace('$id', '42'));
    (getBackendSrv as jest.Mock).mockReturnValue({ fetch });
    (getTemplateSrv as jest.Mock).mockReturnValue({ replace });

    const ds = new DataSource(makeSettings('http://example.com'));
    await ds.query({
      targets: [{ queryString: 'Patient/$id', refId: 'A', resourceType: '', frameFormat: 'table' }],
      scopedVars: {},
    } as any);

    expect(replace).toHaveBeenCalledWith('Patient/$id', {});
    expect(fetch).toHaveBeenCalledWith({ url: '/api/datasources/proxy/1/Patient/42' });
  });

  it('replaces vars in searchValue', async () => {
    const fetch = jest.fn().mockReturnValue(of({ data: { entry: [] } }));
    const replace = jest.fn().mockImplementation((str: string) => str.replace('$p', 'abc'));
    (getBackendSrv as jest.Mock).mockReturnValue({ fetch });
    (getTemplateSrv as jest.Mock).mockReturnValue({ replace });

    const ds = new DataSource(makeSettings('http://example.com'));
    await ds.query({
      targets: [{ resourceType: 'Observation', searchParam: 'subject', searchValue: '$p', refId: 'B', frameFormat: 'table' }],
      scopedVars: {},
    } as any);

    expect(fetch).toHaveBeenCalledWith({ url: '/api/datasources/proxy/1/Observation?subject=abc' });
  });
});

describe('Legend formatting', () => {
  it('handles single placeholder', async () => {
    const fetch = jest.fn().mockReturnValue(
      of({
        data: {
          entry: [
            {
              resource: {
                resourceType: 'Observation',
                id: '1',
                effectiveDateTime: '2023-01-01T00:00:00Z',
                valueQuantity: { value: 5, unit: 'mg' },
                subject: { reference: 'Patient/1' },
                code: { coding: [{ code: 'weight' }] },
              },
            },
          ],
        },
      })
    );
    (getBackendSrv as jest.Mock).mockReturnValue({ fetch });

    const ds = new DataSource(makeSettings('http://example.com'));
    const frames: any[] = await ds.fetchSeries({ queryString: 'Observation', legend: 'ID {{ $.id }}', refId: 'A', frameFormat: 'timeseries' } as any);
    expect((frames[0] as any).name).toBe('ID 1');
    expect(frames[0].fields.some((f: any) => f.name === 'ID 1')).toBe(true);
  });

  it('handles multiple placeholders and missing keys', async () => {
    const fetch = jest.fn().mockReturnValue(
      of({
        data: {
          entry: [
            {
              resource: {
                resourceType: 'Observation',
                id: '1',
                effectiveDateTime: '2023-01-01T00:00:00Z',
                valueQuantity: { value: 5, unit: 'mg' },
                subject: { reference: 'Patient/1' },
                code: { coding: [{ code: 'weight' }] },
              },
            },
          ],
        },
      })
    );
    (getBackendSrv as jest.Mock).mockReturnValue({ fetch });

    const ds = new DataSource(makeSettings('http://example.com'));
    const frames: any[] = await ds.fetchSeries({ queryString: 'Observation', legend: 'A {{ $.id }} {{ $.foo }} {{ $.subject.reference }}', refId: 'B', frameFormat: 'timeseries' } as any);
    expect((frames[0] as any).name).toBe('A 1 {{ $.foo }} Patient/1');
    expect(frames[0].fields.some((f: any) => f.name === 'A 1 {{ $.foo }} Patient/1')).toBe(true);
  });
});
