import { of } from 'rxjs';
import { DataSource } from './datasource';
import { getBackendSrv } from '@grafana/runtime';

jest.mock('@grafana/runtime', () => ({
  getBackendSrv: jest.fn(),
}));

jest.mock('@grafana/data', () => ({
  DataSourceApi: class {},
  MutableDataFrame: class { constructor(public _opts?: any) {} add() {} },
  FieldType: { time: 'time', number: 'number' },
}));

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
});
