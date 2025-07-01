import config from 'grafana/app/core/config';
import { isVersionGtOrEq } from './version';


/**
 * Controller for the datasource configuration page.
 */
export class FhirDatasourceConfigCtrl {
  static templateUrl = 'partials/config.html';
  current: any;

  constructor($scope) {
  }
}
