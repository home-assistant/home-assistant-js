import { Map } from 'immutable';
import dispatcher from '../app_dispatcher';
import constants from '../constants';
import Store from './store';
import streamStore from './stream';
import State from '../models/state';

let states = new Map();

/**
 * Default sorter for a sequence of states.
 */
function defaultStateSort(state) {
  return state.entityId;
}

/**
 * Add a state.
 */
function pushNewState(jsonObj) {
  states = states.set(jsonObj.entity_id, State.fromJSON(jsonObj));
}

/**
 * Add new states
 */
function pushNewStates(newStates, removeNonPresent) {
  let currentStates = removeNonPresent ? new Map() : states;

  states = currentStates.withMutations(map => {
    newStates.forEach(
      jsonObj => map.set(jsonObj.entity_id, State.fromJSON(jsonObj)));

    return map;
  });
}

class StateStore extends Store {

  get all() {
    return states.valueSeq().sortBy(defaultStateSort);
  }

  get(entityId) {
    entityId = entityId.toLowerCase();

    return states.get(entityId) || null;
  }

  gets(entityIds) {
    entityIds = entityIds.map(entityId => entityId.toLowerCase());

    return states.valueSeq()
              .filter(state => entityIds.indexOf(state.entityId) !== -1)
              .sortBy(defaultStateSort);
  }

  get entityIDs() {
    return states.keySeq().sort();
  }

  get domains() {
    return states.keySeq().map((entity_id) => entity_id.split('.')[0])
             .sort().toOrderedSet();
  }

}

const INSTANCE = new StateStore();

INSTANCE.dispatchToken =  dispatcher.register(function(payload) {
  switch(payload.actionType) {
    case constants.ACTION_NEW_STATES:
      // when we're streaming updates, we only care about full updates
      // because partial updates will be processed via remote events.
      if (!streamStore.isStreaming || payload.replace) {
        pushNewStates(payload.states, payload.replace);
        INSTANCE.emitChange();
      }
      break;

    case constants.ACTION_REMOTE_EVENT_RECEIVED:
      if (payload.event.event_type === constants.REMOTE_EVENT_STATE_CHANGED) {
        pushNewState(payload.event.data.new_state);
        INSTANCE.emitChange();
      }
      break;

    case constants.ACTION_LOG_OUT:
      states = new Map();
      INSTANCE.emitChange();
      break;
  }
});

export default INSTANCE;
