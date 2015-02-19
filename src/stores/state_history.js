'use strict';

import _ from 'lodash';
import dispatcher from '../app_dispatcher';
import constants from '../constants';
import Store from '../stores/store';

// Consider data stale if not fetched in last minute
let STALE_TIME = 60000;

let _lastUpdated = null;
let _lastUpdatedEntity = {};
let _history = {};

let historyStore = {};
_.assign(historyStore, Store.prototype, {

  isStale(entityId) {
    // do we want to know if fetchAll or specific entity is stale.
    let lastUpdate = _.isUndefined(entityId) ?
                       _lastUpdated : _lastUpdatedEntity[entityId] || null;

    return lastUpdate === null ||
           (new Date()).getTime() - lastUpdate.getTime() > STALE_TIME;
  },

  get(entityId) {
    return _history[entityId] || null;
  },

  all() {
    return _.values(_history);
  },

});

historyStore.dispatchToken = dispatcher.register(function(payload) {
  switch(payload.actionType) {
    case constants.ACTION_NEW_STATE_HISTORY:
      _.forEach(payload.stateHistory, function(entityStateHistory) {
        if (entityStateHistory.length === 0) return;

        let key = entityStateHistory[0].entityId;

        _history[key] = entityStateHistory;
        _lastUpdatedEntity[key] = new Date();
      });

      if (payload.isFetchAll) {
        _lastUpdated = new Date();
      }

      historyStore.emitChange();
      break;

    case constants.ACTION_LOG_OUT:
      _lastUpdated = null;
      _lastUpdatedEntity = {};
      _history = {};
      historyStore.emitChange();
      break;
  }
});


export default historyStore;
