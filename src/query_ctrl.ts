import _ from 'lodash';
import { QueryCtrl } from 'grafana/app/plugins/sdk';
import './css/query_editor.css';

/**
 * Controller used for the query editor UI.
 */
export class FhirDatasourceQueryCtrl extends QueryCtrl {
  static templateUrl = 'partials/query.editor.html';
  scope : any;
  defaults = {
    resourceType: 'Observation',
    searchParam: '',
    searchValue: '',
  };

  /**
   * Angular constructor injection point.
   */
  constructor($scope, $injector) {
    super($scope, $injector);
    console.log("FhirDatasourceQueryCtrl", $scope);
    this.scope = $scope;

    _.defaultsDeep(this.target, this.defaults);
    this.target.type = this.target.type || 'timeserie';
  }

  /**
   * Called as the user types to query metric suggestions.
   */
  getResources(query) {
    return this.datasource.metricFindQuery(query || '');
  }

  onChangeInternal() {
    this.panelCtrl.refresh(); // Asks the panel to refresh data.
  }

  toggleEditorMode() {
    this.target.rawQuery = !this.target.rawQuery;
  }
}
