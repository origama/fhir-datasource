import _ from 'lodash';
import { QueryCtrl } from 'grafana/app/plugins/sdk';
import './css/query_editor.css';

export class FhirDatasourceQueryCtrl extends QueryCtrl {
  static templateUrl = 'partials/query.editor.html';
  scope : any;
  defaults = {
  };

  /** @ngInject **/
  constructor($scope, $injector) {
    super($scope, $injector);
    console.log("FhirDatasourceQueryCtrl"),$scope;
    this.scope = $scope;

    //_.defaultsDeep(this.target, this.defaults);

    this.target.target = this.target.target || 'select metric';
    this.target.type = this.target.type || 'timeserie';
  }

  getOptions(query) {
    console.log("getOptions",query);
    return this.datasource.metricFindQuery(query || '');
  }

  onChangeInternal() {
    this.panelCtrl.refresh(); // Asks the panel to refresh data.
  }

  toggleEditorMode() {
    this.target.rawQuery = !this.target.rawQuery;
  }
}
