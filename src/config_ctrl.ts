import config from 'grafana/app/core/config';
import { isVersionGtOrEq } from './version';


export class FhirDatasourceConfigCtrl {
  static templateUrl = 'partials/config.html';
  current: any;

  constructor($scope) {
  }
}
