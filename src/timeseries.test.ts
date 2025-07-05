import { isTimeSeriesResource, extractDatapoints, pointsToDataFrame } from './timeseries';

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
    MutableDataFrame: MockFrame,
    FieldType: { time: 'time', number: 'number', string: 'string', other: 'other' },
    __addMock: addMock,
  };
});

describe('TimeSeries utilities', () => {

  it('handles Observation with Period and components', () => {
    const obs = {
      resourceType: 'Observation',
      effectivePeriod: { start: '2023-01-01T00:00:00Z' },
      code: { coding: [{ code: 'heart-rate' }] },
      subject: { reference: 'Patient/1' },
      component: [
        { code: { coding: [{ code: 'systolic' }] }, valueQuantity: { value: 120, unit: 'mmHg' } },
        { code: { coding: [{ code: 'diastolic' }] }, valueQuantity: { value: 80, unit: 'mmHg' } },
      ],
    };
    expect(isTimeSeriesResource(obs)).toBe(true);
    const pts = extractDatapoints(obs);
    expect(pts.length).toBe(2);
    expect(pts[0].seriesKey).toBe('Patient/1|systolic');
    expect(pts[0].value).toBe(120);
  });

  it('handles MedicationAdministration dose', () => {
    const m = {
      resourceType: 'MedicationAdministration',
      occurrenceDateTime: '2023-01-02T00:00:00Z',
      medicationCodeableConcept: { coding: [{ code: 'med' }] },
      dosage: { dose: { value: 10, unit: 'mg' } },
      subject: { reference: 'Patient/1' },
    };
    expect(isTimeSeriesResource(m)).toBe(true);
    const pts = extractDatapoints(m);
    expect(pts.length).toBe(1);
    expect(pts[0].value).toBe(10);
  });

  it('handles Condition onset', () => {
    const c = {
      resourceType: 'Condition',
      onsetDateTime: '2023-01-03T00:00:00Z',
      code: { coding: [{ code: 'flu' }] },
      clinicalStatus: { coding: [{ code: 'active' }] },
      subject: { reference: 'Patient/1' },
    };
    expect(isTimeSeriesResource(c)).toBe(true);
    const pts = extractDatapoints(c);
    expect(pts[0].value).toBe('active');
  });

  it('converts points to a dataframe', () => {
    const pts = [
      {
        seriesKey: 'Patient/1|hr',
        variableCode: 'hr',
        timestamp: '2023-01-01T00:00:00Z',
        value: 70,
        unit: 'bpm',
        src: {},
      },
    ];
    const frame: any = pointsToDataFrame(pts, 'A');
    expect(frame._opts.refId).toBe('A');
    expect(frame._opts.fields.length).toBe(6);
  });
});
