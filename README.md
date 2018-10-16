## TypeScript FHIR Datasource plugin

This is a plugin to connect to a FHIR HL7 server 

@Authors: Giuseppe Virzì, Scuderi Giovanni Luca

### Current Status

Main Status: DRAFT

#### Features

- Configuration Panel : DRAFT
- All other Panel are missing

### Developer TIPS

It is developed merging concept from datasource template offered by grafana github.
We swithced from grunt to webpack.

We discovered a clean template here: https://github.com/CorpGlory/grafana-plugin-template-webpack-typescript

We made a very simplier docker-compose file to test locally the plugin
You can find in dockerTest:
 - base image selected
 - grafana plugins volume is mount on local dist
 - port binding on 127.0.0.1:3000

#### Usefull Reference

 - http://docs.grafana.org/plugins/developing/development/
 - http://docs.grafana.org/plugins/developing/datasources/
 - https://github.com/grafana/grafana-sdk-mocks
 - https://github.com/CorpGlory/types-grafana
 - https://github.com/CorpGlory/grafana-plugin-template-webpack-typescript

### HOW TO Build

npm run-scripts build

### HOW TO Install

*Shorty:*

 * ( Optional ) Build 
 * copy dist/* in  /var/lib/grafana/plugins your Grafana Host

*Official:*

Read carefully and follow:
http://docs.grafana.org/plugins/installation/

### Getting Started


### ROADMAP

No Roadmap yet!

### CHANGELOG

#### v0.0.0
