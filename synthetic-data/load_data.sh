#!/bin/sh
FHIR_URL=${FHIR_URL:-http://fhir:8080/fhir}
# wait for server
until curl -s -o /dev/null "$FHIR_URL/metadata"; do
  echo "Waiting for FHIR server..."
  sleep 5
done
for file in /data/*.json; do
  echo "Loading $file"
  curl -s -X POST -H 'Content-Type: application/fhir+json' --data @"$file" "$FHIR_URL"
  echo
done
