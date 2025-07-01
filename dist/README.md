## TypeScript FHIR Datasource plugin

This is a plugin to connect to a FHIR HL7 server 

@Authors: Giuseppe Virzì, Scuderi Giovanni Luca

### Current Status

Main Status: DRAFT

#### Features

- Configuration Panel : DRAFT
- All other panels are missing

### Developer TIPS

It is developed by merging concepts from the Grafana GitHub datasource template.
We switched from Grunt to Webpack.
The project now targets **Node.js 20** and **TypeScript 5** and works with Grafana 10.

We discovered a clean template here: 
https://github.com/CorpGlory/grafana-plugin-template-webpack-typescript

We made a much simpler docker-compose file to test the plugin locally.
You can find it in dockerTest:
- base image selected
- Grafana plugins volume is mounted on local dist
- port binding on 127.0.0.1:3000
- environment variable `GF_PLUGINS_ALLOW_LOADING_UNSIGNED_PLUGINS=fhir-datasource` to load the unsigned plugin
  (required because the plugin is not signed)
 - Grafana version pinned to `10.4.0` as the plugin now uses React and is compatible with Grafana 10+

An extended compose file `docker-compose-grafana-hapi.yml` is available
for local development. It starts Grafana together with a HAPI FHIR server
preloaded with a few synthetic resources so you can try the datasource
without any external dependencies:

```bash
docker-compose -f dockerTest/docker-compose-grafana-hapi.yml up
```
The compose setup includes a small loader container that sends the bundled
example resources to the FHIR server using their respective resource
endpoints, so the server accepts them without errors.
The `synthetic-data` folder now ships two official FHIR examples and one
patient record generated with [Synthea](https://synthetichealth.github.io/synthea/)
to demonstrate interoperability.

#### Useful References
 
 - http://docs.grafana.org/plugins/developing/development/
 - http://docs.grafana.org/plugins/developing/datasources/
 - https://github.com/grafana/grafana/tree/master/public/app/plugins/datasource
 - https://github.com/grafana/grafana-sdk-mocks
 - https://github.com/CorpGlory/types-grafana
 - https://github.com/CorpGlory/grafana-plugin-template-webpack-typescript

### HOW TO Build

npm run build

### HOW TO Install

*Shortly:*

 * ( Optional ) Build 
 * copy dist/* to /var/lib/grafana/plugins on your Grafana host

*Official:*

Read carefully and follow:
http://docs.grafana.org/plugins/installation/

### Releases

Every tagged commit triggers a GitHub Actions workflow that builds the plugin
and uploads a zip archive in the corresponding GitHub release. You can download
prebuilt versions of the datasource from the repository release page.

### Getting Started


### ROADMAP

No Roadmap yet!

### CHANGELOG

#### v0.0.0
