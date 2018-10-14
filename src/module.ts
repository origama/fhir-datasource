import FhirDatasourceDatasource from './datasource';
import {FhirDatasourceQueryCtrl} from './query_ctrl';
import {FhirDatasourceConfigCtrl} from './config_ctrl';

class FhirDatasourceAnnotationsQueryCtrl {
  static templateUrl = 'partials/annotations.editor.html';
}

export {
  FhirDatasourceDatasource as Datasource,
  FhirDatasourceQueryCtrl as QueryCtrl,
  FhirDatasourceConfigCtrl as ConfigCtrl,
  FhirDatasourceAnnotationsQueryCtrl as AnnotationsQueryCtrl,
};
