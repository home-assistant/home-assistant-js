import forEach from 'lodash/collection/foreach';
import sortBy from 'lodash/collection/sortby';
import values from 'lodash/object/values';

import dispatcher from '../app_dispatcher';
import constants from '../constants';
import Store from '../stores/store';

// Consider data stale if not fetched in last minute
const STALE_TIME = 60000;

const curTime = function() {
  return (new Date()).getTime();
}

const isStale = function(updatedTime) {
  return !updatedTime || curTime() - updatedTime > STALE_TIME;
}

let _todayLastUpdated = null;
let _todayUpdatedEntity = {};
let _todayHistory = {};

let _specificDate = null;
let _specificHistory = {};

class HistoryStore extends Store {

  shouldFetchEntity(entityId) {
    return isStale(_todayUpdatedEntity[entityId]);
  }

  shouldFetch(date) {
    return date !== null ?
      date !== _specificDate : isStale(_todayLastUpdated);
  }

  get(entityId) {
    return _todayHistory[entityId] || null;
  }

  all(date=null) {
    let history;

    if (date === null) {
      history = _todayHistory;
    } else {
      if (date !== _specificDate) {
        throw `Date ${date} is not loaded.`;
      }
      history = _specificHistory;
    }

    return sortBy(
      values(history), function(coll) { return coll[0].entityId; });
  }

}

const INSTANCE = new HistoryStore();

INSTANCE.dispatchToken = dispatcher.register(function(payload) {
  switch(payload.actionType) {
    case constants.ACTION_NEW_STATE_HISTORY:
      let history, timeOfUpdate = curTime();

      if (payload.date) {
        _specificDate = payload.date;
        history = _specificHistory = {};
      } else {
        history = _todayHistory;
      }

      forEach(payload.stateHistory, function(entityStateHistory) {
        if (entityStateHistory.length === 0) return;

        let key = entityStateHistory[0].entityId;

        history[key] = entityStateHistory;

        if (!payload.date) {
          _todayUpdatedEntity[key] = timeOfUpdate;
        }
      });

      if (!payload.date && payload.isFetchAll) {
        _todayLastUpdated = timeOfUpdate;
      }

      INSTANCE.emitChange();
      break;

    case constants.ACTION_LOG_OUT:
      _todayLastUpdated = null;
      _todayUpdatedEntity = {};
      _todayHistory = {};
      _specificDate = null;
      _specificHistory = {};

      INSTANCE.emitChange();
      break;
  }
});

export default INSTANCE;
