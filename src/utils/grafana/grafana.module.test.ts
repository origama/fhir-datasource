import { GrafanaHelper } from './grafana.module';

describe('GrafanaHelper.Response', () => {
  it('should build a success response', () => {
    const resp = GrafanaHelper.Response.success('title', 'message');
    expect(resp).toEqual({ status: GrafanaHelper.ReturnStatus.success, title: 'title', message: 'message' });
  });

  it('should build an error response', () => {
    const resp = GrafanaHelper.Response.error('oops', 'failed');
    expect(resp).toEqual({ status: GrafanaHelper.ReturnStatus.error, title: 'oops', message: 'failed' });
  });
});


describe('GrafanaHelper.Metric', () => {
  it('should store text and value', () => {
    const m = new GrafanaHelper.Metric('t', 5);
    expect(m.text).toBe('t');
    expect(m.value).toBe(5);
  });
});
