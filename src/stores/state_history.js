import _ from 'lodash';
import dispatcher from '../app_dispatcher';
import constants from '../constants';
import Store from '../stores/store';

// Consider data stale if not fetched in last minute
const STALE_TIME = 60000;

let _lastUpdated = null;
let _lastUpdatedEntity = {};
let _history = {};

class HistoryStore extends Store {

  isStale(entityId=null) {
    // do we want to know if fetchAll or specific entity is stale.
    let lastUpdate = entityId === null ?
                       _lastUpdated : _lastUpdatedEntity[entityId] || null;

    return lastUpdate === null ||
           (new Date()).getTime() - lastUpdate.getTime() > STALE_TIME;
  }

  get(entityId) {
    return _history[entityId] || null;
  }

  get all() {
    return _.sortBy(
      _.values(_history), function(coll) { return coll[0].entityId; });
  }

}

const INSTANCE = new HistoryStore();

INSTANCE.dispatchToken = dispatcher.register(function(payload) {
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

      INSTANCE.emitChange();
      break;

    case constants.ACTION_LOG_OUT:
      _lastUpdated = null;
      _lastUpdatedEntity = {};
      _history = {};
      INSTANCE.emitChange();
      break;
  }
});

export default INSTANCE;
