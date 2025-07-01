import Datasource from './datasource';
// Entry point used by Grafana to discover plugin components
import { FhirDatasourceQueryCtrl } from './query_ctrl';
import { FhirDatasourceAnnotationsQueryCtrl } from './annotations_query_ctrl';
import { FhirDatasourceConfigCtrl } from './config_ctrl';


// Simple wrappers needed by Grafana's angular loader
class GenericQueryOptionsCtrl {
  templateUrl = 'partials/query.options.html';
}


class GenericAnnotationsQueryCtrl {
  templateUrl = 'partials/annotations.editor.html'
}



export {
  Datasource,
  FhirDatasourceQueryCtrl as QueryCtrl,
  FhirDatasourceConfigCtrl as ConfigCtrl,
  FhirDatasourceAnnotationsQueryCtrl as AnnotationsQueryCtrl,
  GenericQueryOptionsCtrl as QueryOptionsCtrl,
};
  
  //GenericAnnotationsQueryCtrl as AnnotationsQueryCtrl