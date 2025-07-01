#!/bin/sh
FHIR_URL=${FHIR_URL:-http://fhir:8080/fhir}
# wait for server
until curl -s -o /dev/null "$FHIR_URL/metadata"; do
  echo "Waiting for FHIR server..."
  sleep 5
done
for file in /data/*.json; do
  resource=$(grep -m1 -o '"resourceType"[[:space:]]*:[[:space:]]*"[^"]*"' "$file" | cut -d'"' -f4)
  echo "Loading $file to $FHIR_URL/$resource"
  curl -s -X POST -H 'Content-Type: application/fhir+json' --data @"$file" "$FHIR_URL/$resource"
  echo
done
