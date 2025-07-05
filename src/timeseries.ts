export interface TimeSeriesPoint {
  seriesKey: string;
  variableCode: string;
  timestamp: string;
  value: number | string;
  unit?: string;
  src: any;
}


import { MutableDataFrame, FieldType } from '@grafana/data';

export function pointsToDataFrame(points: TimeSeriesPoint[], refId = 'timeseries'): MutableDataFrame {
  const frame = new MutableDataFrame({
    refId,
    fields: [
      { name: 'seriesKey', type: FieldType.string },
      { name: 'variableCode', type: FieldType.string },
      { name: 'timestamp', type: FieldType.time },
      { name: 'value', type: FieldType.other },
      { name: 'unit', type: FieldType.string },
      { name: 'src', type: FieldType.other },
    ],
  });

  points.forEach(p => frame.add(p));
  return frame;
}

export function normaliseUnit(unit?: string, system?: string): string | undefined {
  if (!unit) return undefined;
  // Very naive normalisation for demo purposes
  const map: Record<string, string> = {
    kg: 'kg',
    kilogram: 'kg',
    g: 'g',
    '[lb_av]': 'lb',
  };
  return map[unit] || unit;
}

export function isTimeSeriesResource(r: any): boolean {
  if (!r || !r.resourceType) return false;
  switch (r.resourceType) {
    case 'Observation':
      return !!(r.effectiveDateTime || r.effectivePeriod?.start) &&
             !!(r.valueQuantity || r.valueString || r.valueCodeableConcept || (Array.isArray(r.component) && r.component.some((c: any) => c.valueQuantity || c.valueString || c.valueCodeableConcept))) &&
             !!r.code && !!r.subject;
    case 'MedicationAdministration':
      return !!(r.occurrenceDateTime || r.occurrencePeriod?.start) && !!r.dosage?.dose && !!r.medicationCodeableConcept;
    case 'Condition':
      return !!(r.onsetDateTime || r.onsetPeriod?.start) && !!r.code && !!r.clinicalStatus;
    default:
      return false;
  }
}

export function extractDatapoints(r: any): TimeSeriesPoint[] {
  if (!isTimeSeriesResource(r)) return [];
  const points: TimeSeriesPoint[] = [];
  const subject = r.subject?.reference || 'unknown';
  const ts = r.effectiveDateTime || r.effectivePeriod?.start || r.occurrenceDateTime || r.occurrencePeriod?.start || r.onsetDateTime || r.onsetPeriod?.start;
  const code = r.code?.coding?.[0]?.code || r.medicationCodeableConcept?.coding?.[0]?.code;

  switch (r.resourceType) {
    case 'Observation':
      if (Array.isArray(r.component) && r.component.length > 0) {
        r.component.forEach((c: any) => {
          if (!c.valueQuantity && !c.valueString && !c.valueCodeableConcept) return;
          const value = c.valueQuantity?.value ?? c.valueString ?? c.valueCodeableConcept?.coding?.[0]?.code;
          const unit = normaliseUnit(c.valueQuantity?.unit, c.valueQuantity?.system);
          points.push({
            seriesKey: `${subject}|${c.code?.coding?.[0]?.code || code}`,
            variableCode: c.code?.coding?.[0]?.code || code,
            timestamp: ts,
            value,
            unit,
            src: r,
          });
        });
      } else {
        const value = r.valueQuantity?.value ?? r.valueString ?? r.valueCodeableConcept?.coding?.[0]?.code;
        const unit = normaliseUnit(r.valueQuantity?.unit, r.valueQuantity?.system);
        points.push({
          seriesKey: `${subject}|${code}`,
          variableCode: code,
          timestamp: ts,
          value,
          unit,
          src: r,
        });
      }
      break;
    case 'MedicationAdministration':
      if (r.dosage?.dose) {
        points.push({
          seriesKey: `${subject}|${code}`,
          variableCode: code,
          timestamp: ts,
          value: r.dosage.dose.value,
          unit: normaliseUnit(r.dosage.dose.unit, r.dosage.dose.system),
          src: r,
        });
      }
      break;
    case 'Condition':
      points.push({
        seriesKey: `${subject}|${code}`,
        variableCode: code,
        timestamp: ts,
        value: r.clinicalStatus?.coding?.[0]?.code,
        unit: undefined,
        src: r,
      });
      break;
  }
  return points;
}
