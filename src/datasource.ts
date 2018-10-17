///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
import nativeFhir from 'fhir.js/src/adapters/native';
import _ from 'lodash';
export default class FhirDatasourceDatasource {
  id: number;
  name: string;
  config: any;
  client: any;
  conformance: any;

  /** @ngInject */
  constructor(instanceSettings) {
    this.name = instanceSettings.name;
    this.id = instanceSettings.id;
    this.config = instanceSettings.jsonData;
    
    let config: any = {
      'baseUrl': 'http://fhirtest.uhn.ca/baseDstu2',
      'credentials': 'same-origin',
    };
    
    config.baseUrl = (this.config.fhiraddress || config.baseUrl);
    // console.log("FHIR.mkFhir",FHIR.mkFhir);
    // console.log("nativeFhir",nativeFhir);
    // var fhir = nativeFhir({
    //   baseUrl: 'https://ci-api.fhir.me',
    //   auth: {user: 'client', pass: 'secret'}
    // });
    // console.log("fhir",fhir);
    this.client = nativeFhir(config);
    (<any>window).fhir_datasource=this;

  }

  query(options) {
    throw new Error("Query Support not implemented yet.");
  }

  annotationQuery(options) {
    throw new Error("Annotation Support not implemented yet.");
  }

  metricFindQuery(query: string) {
    throw new Error("Template Variable Support not implemented yet.");
  }

  testDatasource() {
    return this.client.conformance({}).then(
      (response) => {
      if(response.data){
        this.conformance = (response.data || []);
        console.log(this.conformance);        
        if (this.isValidServer()){
          return Response.success(
            "Server added successfully!",
            this.conformance.software.name+" is a valid Fhir Server.");
        }
        else
          return Response.error("Cannot add Server!","The server doesn't seem to be a valid one!")
      }
      else return Response.error("Cannot add Server!","The server's response is not compliant!")
    }, (err) => {
      let errmsg=""
      if (err.error && err.error instanceof TypeError) errmsg=err.error.message;
      else errmsg=`[${err.error.status}] ${err.error.statusText}`
      return Response.error("Cannot add Server!",`We couldn't add the server:\n${errmsg}`)
    });
  }

  /** 
   * Contains the logic to check if the provided server is a valid one.
   * At the moment it only checks if it has a conformance object and
   * if the conformance has a fhirVersion attribute.
  */
  isValidServer(){
    if(this.conformance!=[] && this.conformance.fhirVersion){
      return true;
    }
    return false;
  }
}

/**
 * Possible result statuses for testDatasource
 */
enum ReturnStatus {
  success = "success",
  error = "error",
}

/**
 * Helper class to generate the right json object to pass over to grafana.
 * It handles success and error object messages.
 */
class Response {
    retObj = {}

    /**
     * Generates error json message
     * @param title Message title 
     * @param msg Message body
     */
    static error(title:String, msg : String){
      return {
        status: ReturnStatus.error,
        title: title,
        message: msg        
      }
    }

    /**
     * Generates success json messages
     * @param title Message title 
     * @param msg Message body
     */
    static success(title:String, msg : String){
      return {
        status: ReturnStatus.success,
        title: title,
        message: msg        
      }
    }
}