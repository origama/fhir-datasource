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

We discovered a clean template here: 
https://github.com/CorpGlory/grafana-plugin-template-webpack-typescript

We made a much simpler docker-compose file to test the plugin locally.
You can find it in dockerTest:
 - base image selected
 - Grafana plugins volume is mounted on local dist
 - port binding on 127.0.0.1:3000

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

### Getting Started


### ROADMAP

No Roadmap yet!

### CHANGELOG

#### v0.0.0
