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
    
    // config.baseUrl = this.config.fhiraddress;    
    // console.log("FHIR.mkFhir",FHIR.mkFhir);
    // console.log("nativeFhir",nativeFhir);
    // var fhir = nativeFhir({
    //   baseUrl: 'https://ci-api.fhir.me',
    //   auth: {user: 'client', pass: 'secret'}
    // });
    // console.log("fhir",fhir);
    this.client = nativeFhir(config);
    console.log(this.client);
    

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
    
    return this.client.conformance({}).then((response) => {
      if(response.data){
        this.conformance = (response.data || []);
        console.log(this.conformance);
        alert("yeah"); 
      }
    }, (err) => {
      alert("err indian way");
      return {
        status: 'error',
        message: 'Data Source is just a template and has not been implemented yet.',
        title: 'Error'
      };
      
    });
  }
}
