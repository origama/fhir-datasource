## TypeScript FHIR Datasource plugin

This is a datasource plugin for Grafana that queries a FHIR HL7 server.
It is written in TypeScript and uses the latest Grafana plugin APIs.

### Developer Notes

The project targets **Node.js 20**, **TypeScript 5**, and Grafana **v12**.
A simple docker-compose setup builds the plugin and starts Grafana:

```bash
docker-compose -f dockerTest/docker-compose-grafana-hapi.yml up
```

This starts Grafana together with a HAPI FHIR server populated with test data.
The `builder` service compiles the plugin before Grafana starts so you always
run the latest code without installing Node locally.

### Build

```bash
npm run build
```

Copy the `dist` directory into Grafana's plugin directory to install manually.
