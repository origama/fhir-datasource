#!/usr/bin/env python3
"""
generate_fhir_data.py
--------------------------------------------------
• 10 Person + 10 matching Patient resources
• 10 DiagnosticReport resources per Patient
• 10 Observation resources per Patient with recent values
• Uses urn:uuid: placeholders so order doesn’t matter
• Optional POST to a FHIR endpoint
"""

import argparse
import datetime as dt
import json
import random
import uuid
from pathlib import Path
from typing import List

try:
    import requests            # only needed when --endpoint is used
except ImportError:
    requests = None

# ---------------------------------------------------------------------------
# Simple random data pools
# ---------------------------------------------------------------------------

FAMILY_NAMES = [
    "Rossi", "Russo", "Ferrari", "Bianchi", "Esposito",
    "Romano", "Bruno", "Gallo", "Greco", "Conti"
]
GIVEN_NAMES = [
    "Luca", "Giulia", "Marco", "Sara", "Francesco",
    "Alessia", "Davide", "Martina", "Matteo", "Chiara"
]
GENDERS = ["male", "female", "other", "unknown"]

SNOMED_CODES = [
    ("433472006", "Blood chemistry panel"),
    ("363680008", "MRI of brain"),
    ("365860008", "Electrocardiogram"),
    ("386053000", "Ultrasound scan"),
    ("104177005", "Chest X-ray")
]

OBSERVATION_CODES = [
    ("29463-7", "Body Weight", "kg"),
    ("8867-4", "Heart rate", "beats/min"),
    ("8480-6", "Systolic blood pressure", "mmHg"),
    ("8462-4", "Diastolic blood pressure", "mmHg"),
    ("8310-5", "Body temperature", "°C"),
]

# ---------------------------------------------------------------------------
# Helper functions
# ---------------------------------------------------------------------------


def random_date(start_year: int = 1940, end_year: int = 2024) -> str:
    s = dt.date(start_year, 1, 1).toordinal()
    e = dt.date(end_year, 12, 31).toordinal()
    return dt.date.fromordinal(random.randint(s, e)).isoformat()


def random_datetime(start_year: int = 2020) -> str:
    s = dt.datetime(start_year, 1, 1).timestamp()
    e = dt.datetime.now().timestamp()
    ts = random.uniform(s, e)
    return dt.datetime.fromtimestamp(ts).replace(microsecond=0).isoformat()


def random_recent_datetime(days: int = 15) -> str:
    now = dt.datetime.now()
    earliest = now - dt.timedelta(days=days)
    ts = random.uniform(earliest.timestamp(), now.timestamp())
    return dt.datetime.fromtimestamp(ts).replace(microsecond=0).isoformat()


def observation_value(code: str) -> float:
    if code == "29463-7":  # Body Weight
        return round(random.uniform(50.0, 100.0), 1)
    if code == "8867-4":  # Heart rate
        return random.randint(60, 100)
    if code == "8480-6":  # Systolic blood pressure
        return random.randint(110, 140)
    if code == "8462-4":  # Diastolic blood pressure
        return random.randint(70, 90)
    if code == "8310-5":  # Body temperature
        return round(random.uniform(36.0, 38.0), 1)
    return random.uniform(0, 100)


# ---------------------------------------------------------------------------
# Bundle helpers
# ---------------------------------------------------------------------------

def tx_entry(resource: dict, full_url: str) -> dict:
    """Wrap a resource for a transaction bundle."""
    return {
        "fullUrl": full_url,
        "resource": resource,
        "request": {"method": "POST", "url": resource["resourceType"]}
    }


def build_bundle(n: int = 10) -> dict:
    entries: List[dict] = []

    for _ in range(n):
        # placeholder URNs
        patient_uuid = str(uuid.uuid4())
        person_uuid = str(uuid.uuid4())
        patient_ref = f"urn:uuid:{patient_uuid}"
        person_ref = f"urn:uuid:{person_uuid}"

        # shared demographics
        name = {
            "use": "official",
            "family": random.choice(FAMILY_NAMES),
            "given": [random.choice(GIVEN_NAMES)]
        }
        gender = random.choice(GENDERS)
        birth = random_date()

        # ----------------- Patient (NO link to Person) ----------------------
        patient = {
            "resourceType": "Patient",
            "id": patient_uuid,
            "identifier": [{
                "system": "http://example.org/ids/patient",
                "value": patient_uuid
            }],
            "name": [name],
            "gender": gender,
            "birthDate": birth
        }

        # ----------------- Person (links to Patient) ------------------------
        person = {
            "resourceType": "Person",
            "id": person_uuid,
            "identifier": [{
                "system": "http://example.org/ids/person",
                "value": person_uuid
            }],
            "name": [name],
            "gender": gender,
            "birthDate": birth,
            "link": [{
                "target": {"reference": patient_ref}
            }]
        }

        entries.append(tx_entry(patient, patient_ref))
        entries.append(tx_entry(person, person_ref))

        # ----------------- 10 DiagnosticReports -----------------------------
        for _ in range(10):
            report_uuid = str(uuid.uuid4())
            code_val, code_txt = random.choice(SNOMED_CODES)
            eff = random_datetime()
            issued = (
                dt.datetime.fromisoformat(eff) +
                dt.timedelta(minutes=random.randint(5, 120))
            ).isoformat()

            report = {
                "resourceType": "DiagnosticReport",
                "id": report_uuid,
                "status": "final",
                "code": {
                    "coding": [{
                        "system": "http://snomed.info/sct",
                        "code": code_val,
                        "display": code_txt
                    }],
                    "text": code_txt
                },
                "subject": {"reference": patient_ref},
                "effectiveDateTime": eff,
                "issued": issued,
                "performer": [{"display": "Acme Labs"}]
            }
            entries.append(tx_entry(report, f"urn:uuid:{report_uuid}"))

        # ----------------- 10 Observations ---------------------------------
        for _ in range(10):
            obs_uuid = str(uuid.uuid4())
            code_val, code_txt, unit = random.choice(OBSERVATION_CODES)
            eff = random_recent_datetime()
            value = observation_value(code_val)

            observation = {
                "resourceType": "Observation",
                "id": obs_uuid,
                "status": "final",
                "code": {
                    "coding": [{
                        "system": "http://loinc.org",
                        "code": code_val,
                        "display": code_txt
                    }],
                    "text": code_txt
                },
                "subject": {"reference": patient_ref},
                "effectiveDateTime": eff,
                "valueQuantity": {
                    "value": value,
                    "unit": unit,
                    "system": "http://unitsofmeasure.org"
                }
            }
            entries.append(tx_entry(observation, f"urn:uuid:{obs_uuid}"))

    return {
        "resourceType": "Bundle",
        "type": "transaction",
        "timestamp": dt.datetime.utcnow().isoformat() + "Z",
        "entry": entries
    }


# ---------------------------------------------------------------------------
# CLI driver
# ---------------------------------------------------------------------------

def main() -> None:
    ap = argparse.ArgumentParser(
        description="Generate random Person, Patient, DiagnosticReport and Observation data",
    )
    ap.add_argument("-o", "--outfile", default="bundle.json",
                    help="Output file (default: bundle.json)")
    ap.add_argument("--endpoint", "-e",
                    help="POST the bundle to this FHIR base URL")
    args = ap.parse_args()

    bundle = build_bundle()

    path = Path(args.outfile).expanduser().resolve()
    path.write_text(json.dumps(bundle, indent=2))
    print(f"Bundle written to {path}")

    if args.endpoint:
        if requests is None:
            raise RuntimeError("Install the 'requests' package to enable POSTing")
        url = args.endpoint.rstrip("/") + "/"
        resp = requests.post(url,
                             headers={"Content-Type": "application/fhir+json"},
                             json=bundle)
        print(f"POST {url} -> HTTP {resp.status_code}")
        if resp.status_code not in (200, 201):
            print("Server response:\n", resp.text)


if __name__ == "__main__":
    main()

