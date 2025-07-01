/**
 * Simple configuration object used when instantiating the fhir.js client.
 */
export class FhirConfig {
    private _url : URL
    get baseUrl () : string {
        return this._url.href;
    }
    set baseUrl (url : string ) {
        this._url = new URL(url);
    }
    credential: string    
    auth?: { user: string, pass: string}
}

// console.log("FHIR.mkFhir",FHIR.mkFhir);
    // console.log("nativeFhir",nativeFhir);
    // var fhir = nativeFhir({
    //   baseUrl: 'https://ci-api.fhir.me',
    //   auth: {user: 'client', pass: 'secret'}
    // });
    // console.log("fhir",fhir);

/**
 * Wrapper that exposes the fhir.js client instance.
 */
export class Fhir {
    client: any
}