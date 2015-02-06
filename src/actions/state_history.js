'use strict';

var callApi = require('../call_api');
var dispatcher = require('../app_dispatcher');
var actions = require('../actions/actions');

module.exports = {
  newStateHistory: function(isFetchAll, stateHistory) {
    dispatcher.dispatch({
      actionType: actions.ACTION_NEW_STATE_HISTORY,
      stateHistory: stateHistory,
      isFetchAll: isFetchAll,
    });
  },

  fetchAll: function() {
    callApi('GET', 'history/period').then(this.newStateHistory.bind(this, true));
  },

  fetch: function(entityId) {
    callApi('GET', 'history/period?filter_entity_id=' + entityId).then(

      this.newStateHistory.bind(this, false));
  },
};
