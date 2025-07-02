## TypeScript FHIR Datasource plugin

This is a datasource plugin for Grafana that queries a FHIR HL7 server.
It is written in TypeScript and uses the latest Grafana plugin APIs.

### Developer Notes

The project targets **Node.js 20**, **TypeScript 5**, and Grafana **v12**.
A simple docker-compose setup can build the plugin and start Grafana.
First build the datasource using the dedicated compose file:

```bash
docker compose -f dockerTest/docker-compose.build.yml run --rm builder
```

This runs a Node 20 container that installs dependencies and executes the
build command, producing the `dist` directory.

Then start Grafana:

```bash
docker compose -f dockerTest/docker-compose-grafana-hapi.yml up
```

Grafana will load the compiled plugin from `dist` without rebuilding it.

### Build

```bash
npm run build
```

Copy the `dist` directory into Grafana's plugin directory to install manually.
