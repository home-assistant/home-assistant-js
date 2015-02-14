'use strict';

var _ = require('lodash');

var callApi = require('../call_api');
var dispatcher = require('../app_dispatcher');
var constants = require('../constants');
var State = require('../models/state');

module.exports = {
  newStateHistory: function(isFetchAll, stateHistory) {
    dispatcher.dispatch({
      actionType: constants.ACTION_NEW_STATE_HISTORY,
      stateHistory: _.map(stateHistory, function(states) {
        return _.map(states, State.fromJSON);
      }),
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
