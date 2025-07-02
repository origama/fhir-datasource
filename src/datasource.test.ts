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

function makeSettings(url: string) {
  return {
    id: 1,
    uid: 'test',
    type: 'fhir-datasource',
    name: 'FHIR',
    jsonData: { fhirAddress: url },
  } as any;
}

describe('DataSource.testDatasource', () => {
  it('fetches metadata from configured URL', async () => {
    const fetch = jest.fn().mockReturnValue(of({ data: {} }));
    (getBackendSrv as jest.Mock).mockReturnValue({ fetch });
    const ds = new DataSource(makeSettings('http://example.com'));
    const result = await ds.testDatasource();
    expect(fetch).toHaveBeenCalledWith({ url: 'http://example.com/metadata' });
    expect(result).toEqual({ status: 'success', message: 'Success' });
  });

  it('uses updated URL when settings change', async () => {
    const fetch = jest.fn().mockReturnValue(of({ data: {} }));
    (getBackendSrv as jest.Mock).mockReturnValue({ fetch });
    const settings = makeSettings('http://example.com');
    const ds = new DataSource(settings);
    settings.jsonData.fhirAddress = 'http://another.com';
    const result = await ds.testDatasource();
    expect(fetch).toHaveBeenCalledWith({ url: 'http://another.com/metadata' });
    expect(result).toEqual({ status: 'success', message: 'Success' });
  });
});
