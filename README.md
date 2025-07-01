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
The project now targets **Node.js 20** and **TypeScript 5** and works with Grafana 9.

We discovered a clean template here: 
https://github.com/CorpGlory/grafana-plugin-template-webpack-typescript

We made a much simpler docker-compose file to test the plugin locally.
You can find it in dockerTest:
 - base image selected
 - Grafana plugins volume is mounted on local dist
 - port binding on 127.0.0.1:3000

An extended compose file `docker-compose-grafana-hapi.yml` is available
for local development. It starts Grafana together with a HAPI FHIR server
preloaded with a few synthetic resources so you can try the datasource
without any external dependencies:

```bash
docker-compose -f dockerTest/docker-compose-grafana-hapi.yml up
```

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
