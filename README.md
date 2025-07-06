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
build command. The compiled plugin files are written to the `dist` directory.
The folder is generated on demand during development and release and is not
tracked in version control.

Then start Grafana:

```bash
docker compose -f dockerTest/docker-compose-grafana-hapi.yml up
```

Grafana will load the compiled plugin from `dist` without rebuilding it.

### Configuration

Specify the FHIR server address in the **FHIR base URL** field on the datasource configuration page. Enable **Use proxy** to route requests through Grafana's datasource proxy (recommended to avoid CORS issues) or disable it for direct connectivity.

### Build

```bash
npm run build
```
Run the build script before manually installing the plugin. Copy the generated
`dist` directory into Grafana's plugin directory to install it.

### Template variables

Template variables can be populated using the datasource's variable query editor.
Specify the **Resource**, **Text field**, and **Value field** separately. The datasource
will fetch matching resources and map each to a text/value pair using the selected fields.

Example fields:

- Resource: `Patient`
- Text field: `name[0].family`
- Value field: `id`

Or:

- Resource: `Observation?code=weight`
- Text field: `subject.reference`
- Value field: `id`

If a query fails and the FHIR server returns a Bundle with an `issue` element,
the diagnostics text will be displayed as a toast notification in Grafana.
