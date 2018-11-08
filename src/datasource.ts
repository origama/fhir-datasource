///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
import _ from 'lodash';
import nativeFhir from 'fhir.js/src/adapters/native';
import { FhirConfig } from './utils/fhir/fhir.module';
import { GrafanaHelper } from './utils/grafana/grafana.module';

export class FhirDatasource {
  id: number;
  name: string;
  config: FhirConfig;
  client: any;
  conformance: any;
  type: string;
  url: string;
  q: any;
  backendSrv: any;
  templateSrv: any;
  withCredentials: any;
  headers: { 'Content-Type': string; };

  //@ngInject
  constructor(instanceSettings, $q, backendSrv, templateSrv) {
    console.log("FhirDatasourceDatasource Ctor", instanceSettings);

    this.id = instanceSettings.id;
    this.type = instanceSettings.type;
    this.url = instanceSettings.url;
    this.name = instanceSettings.name;
    this.q = $q;
    this.backendSrv = backendSrv;
    this.templateSrv = templateSrv;
    this.withCredentials = instanceSettings.withCredentials;
    this.headers = { 'Content-Type': 'application/json' };
    this.config = instanceSettings.jsonData;
    console.log("config", this.config);
    let config: any = {
      'baseUrl': 'http://fhirtest.uhn.ca/baseDstu3',
      'credentials': 'same-origin',
    };
    config.baseUrl = (this.config.baseUrl || new URL(config.baseUrl).href);

    this.client = nativeFhir(config);
    (<any>window).fhir_datasource = this;
    (<any>window).fhir_client = this.client;
    this.client.conformance({});
    console.log("url", this.url);
    console.log("backendSrv", this.backendSrv);
    console.log("templateSrv", this.templateSrv);

    this.backendSrv.datasourceRequest = function (request) {
      console.log("datasourceRequest", request);
      return this.$q.when({
        _request: request,
        data: ["metric_0",
          "metric_1",
          "metric_2"]
      });
    };

  }

  query(options) {
    console.log("FhirDatasourceDatasource Query", options);
    var query = this.buildQueryParameters(options);
    query.targets = query.targets.filter(t => !t.hide);
    console.log("query", query);
    
    if (query.targets.length <= 0) {
      return this.q.when({ data: [] });
    }
    return this.q.when({
      data: []
    });



    //return this.doRequest(options);
    //    return this.q.when(options);
    /*    return this.q.when({
          "range": { "from": "2015-12-22T03:06:13.851Z", "to": "2015-12-22T06:48:24.137Z" },
          "interval": "5s",
          "targets": [
            { "refId": "B", "target": "upper_75" },
            { "refId": "A", "target": "upper_90" }
          ],
          "format": "json",
          "maxDataPoints": 2495, //decided by the panel
          "data" : [ "uno","due","tre"]
        });
        */
    /*
        if (query.targets.length <= 0) {
          return this.q.when({data: []});
        }
    
        if (this.templateSrv.getAdhocFilters) {
          query.adhocFilters = this.templateSrv.getAdhocFilters(this.name);
        } else {
          query.adhocFilters = [];
        }
       
        let x = this.doRequest(options);
        console.log(x)
        return x;
    */
    // return this.doRequest({
    //   url: this.url + '/query',
    //   data: query,
    //   method: 'POST'
    // });
  }



  annotationQuery(options) {
    console.log("FhirDatasourceDatasource annotationQuery", options);
    throw new Error("Annotation Support not implemented yet.");
    // var query = this.templateSrv.replace(options.annotation.query, {}, 'glob');
    // var annotationQuery = {
    //   range: options.range,
    //   annotation: {
    //     name: options.annotation.name,
    //     datasource: options.annotation.datasource,
    //     enable: options.annotation.enable,
    //     iconColor: options.annotation.iconColor,
    //     query: query
    //   },
    //   rangeRaw: options.rangeRaw
    // };

    // return this.doRequest({
    //   url: this.url + '/annotations',
    //   method: 'POST',
    //   data: annotationQuery
    // }).then(result => {
    //   return result.data;
    // });

  }

  metricFindQuery(query) {
    console.log("metricFindQuery", query);
    var interpolated = {
      target: this.templateSrv.replace(query, null, 'regex')
    };

    return this.client.conformance({}).then((response) => {
      var toRet = [];
      toRet = response.data.rest[0].resource.map((tmp) => { return new GrafanaHelper.Metric(tmp.type, tmp.type); });
      return toRet;
    });
  }


  testDatasource() {
    return this.client.conformance({}).then(
      (response) => {
        if (response.data) {
          this.conformance = (response.data || []);
          console.log(this.conformance);
          if (this.isValidServer()) {
            return GrafanaHelper.Response.success(
              "Server added successfully!",
              this.conformance.software.name + " is a valid Fhir Server.");
          }
          else
            return GrafanaHelper.Response.error("Cannot add Server!", "The server doesn't seem to be a valid one!")
        }
        else return GrafanaHelper.Response.error("Cannot add Server!", "The server's response is not compliant!")
      }, (err) => {
        let errmsg = ""
        if (err.error && err.error instanceof TypeError) errmsg = err.error.message;
        else errmsg = `[${err.error.status}] ${err.error.statusText}`
        return GrafanaHelper.Response.error("Cannot add Server!", `We couldn't add the server:\n${errmsg}`)
      });
  }
  /** 
   * Contains the logic to check if the provided server is a valid one.
   * At the moment it only checks if it has a conformance object and
   * if the conformance has a fhirVersion attribute.
  */
  isValidServer() {
    if (this.conformance != [] && this.conformance.fhirVersion) {
      return true;
    }
    return false;
  }

  doRequest(options) {
    options.withCredentials = this.withCredentials;
    options.headers = this.headers;
    console.log("options", options);
    let x = this.backendSrv.datasourceRequest(options);
    console.log("backend", x);
    return x;
  }

  buildQueryParameters(options) {
    //remove placeholder targets
    options.targets = _.filter(options.targets, target => {
      return target.target !== 'select metric';
    });
    console.log("buildQueryParameters", options);
    var targets = _.map(options.targets, target => {
      return {
        target: this.templateSrv.replace(target.target, options.scopedVars, 'regex'),
        refId: target.refId,
        hide: target.hide,
        type: target.type || 'timeserie'
      };
    });

    options.targets = targets;

    return options;
  }


  getTagKeys(options) {
    return new Promise((resolve, reject) => {
      this.doRequest({
        url: this.url + '/tag-keys',
        method: 'POST',
        data: options
      }).then(result => {
        return resolve(result.data);
      });
    });
  }

  getTagValues(options) {
    return new Promise((resolve, reject) => {
      this.doRequest({
        url: this.url + '/tag-values',
        method: 'POST',
        data: options
      }).then(result => {
        return resolve(result.data);
      });
    });
  }
}