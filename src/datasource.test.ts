import { of, throwError } from 'rxjs';
import { DataSource } from './datasource';
import { getBackendSrv } from '@grafana/runtime';

jest.mock('@grafana/runtime', () => ({
  getBackendSrv: jest.fn(),
}));

jest.mock('@grafana/data', () => {
  const addMock = jest.fn();
  class MockFrame {
    _opts: any;
    add = addMock;
    constructor(opts?: any) {
      this._opts = opts;
    }
  }
  return {
    DataSourceApi: class {},
    MutableDataFrame: MockFrame,
    FieldType: { time: 'time', number: 'number', string: 'string' },
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
    const frame: any = await ds.fetchSeries({ queryString: 'Patient', refId: 'A' } as any);

    expect(fetch).toHaveBeenCalledWith({ url: '/api/datasources/proxy/1/Patient' });
    expect(frame._opts.fields).toEqual([
      { name: 'id', type: 'string' },
      { name: 'name', type: 'string' },
    ]);
    expect(__addMock).toHaveBeenCalledTimes(2);
    expect(__addMock.mock.calls[0][0]).toEqual({ id: '1', name: 'Alice' });
    expect(__addMock.mock.calls[1][0]).toEqual({ id: '2', name: 'Bob' });
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
