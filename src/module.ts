import { FhirDatasource } from './datasource';
import { FhirDatasourceQueryCtrl } from './query_ctrl';
import { FhirDatasourceAnnotationsQueryCtrl } from './annotations_query_ctrl';
import { FhirDatasourceConfigCtrl } from './config_ctrl';


class GenericQueryOptionsCtrl {
  templateUrl = 'partials/query.options.html';
}

export {
  FhirDatasource as Datasource,
  FhirDatasourceQueryCtrl as QueryCtrl,
  FhirDatasourceConfigCtrl as ConfigCtrl,
  FhirDatasourceAnnotationsQueryCtrl as AnnotationsQueryCtrl,
  GenericQueryOptionsCtrl as QueryOptionsCtrl,
};
