# Developer Overview

This project implements a Grafana datasource that queries FHIR compliant servers.
It is written in TypeScript and packaged as a Grafana plugin.

## Repository layout

- **src/** – TypeScript sources for the plugin
  - `components/` – React components used by Grafana (editors and UI)
  - `datasource.ts` – main datasource implementation
  - `timeseries.ts` – helpers for converting FHIR resources into time series data
  - `utils/` – small helper modules and scripts
- **synthetic-data/** – example FHIR resources used with the test Docker setup
- **dockerTest/** – docker-compose files to build the plugin and run Grafana with a HAPI FHIR server
- **specs/** – helper files used by the Jest test suite
- **dist/** – output directory created when building the plugin (not tracked)

## Datasource functionality

The datasource talks to a configurable FHIR base URL. Queries can be entered in a
simple builder UI or in raw form using `Resource?param=value` syntax. Requests are
made either directly or through Grafana's proxy depending on the datasource
settings. Responses are mapped to Grafana data frames:

- Tabular frames contain the returned resources with one column per field.
- Time series frames are generated when the resources represent observations,
  medication administrations or conditions. Relevant values are extracted and
  normalised for display.

Template variables are supported in both query strings and search values. The
plugin also provides a variable query editor that maps FHIR resources to
`text/value` pairs for populating dashboard variables.

Automated tests are written with Jest and can be run via `npm test`.
