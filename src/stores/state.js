'use strict';

import _ from 'lodash';
import dispatcher from '../app_dispatcher';
import constants from '../constants';
import Store from './store';
import streamStore from './stream';
import State from '../models/state';

let states = {};

/**
 * Sort a list of states
 */
let sortStates = function(toSortStates) {
  return _.sortBy(toSortStates, 'entityId');
};

/**
 * Push new states
 */
let pushNewStates = function(newStates, removeNonPresent) {
  if (!removeNonPresent) {
    _.forEach(newStates, _pushNewState);
    return;
  }

  states = _.zipObject(
    _.map(newStates, _state_key),
    _.map(newStates, _pushNewState));
};

let _state_key = function(jsonState) {
  return jsonState.entity_id;
};

/**
 * Creates or updates a state. Returns bool if a new state was added.
 */
let _pushNewState = function(newState) {
  let key = _state_key(newState);

  states[key] = State.fromJSON(newState);

  return states[key];
};

let stateStore = {};
_.assign(stateStore, Store.prototype, {
  all() {
    return sortStates(_.values(states));
  },

  get(entityId) {
    entityId = entityId.toLowerCase();

    return states[entityId] || null;
  },

  gets(entityIds) {
    return sortStates(_.compact(_.map(entityIds, this.get, this)));
  },

  entityIDs() {
    return Object.keys(states);
  },

  getCustomGroups() {
    return _.filter(states, 'isCustomGroup');
  },
});

stateStore.dispatchToken =  dispatcher.register(function(payload) {
  switch(payload.actionType) {
    case constants.ACTION_NEW_STATES:
      // when we're streaming updates, we only care about full updates
      // because partial updates will be processed via remote events.
      if (!streamStore.isStreaming() || payload.replace) {
        pushNewStates(payload.states, payload.replace);
        stateStore.emitChange();
      }
      break;

    case constants.ACTION_REMOTE_EVENT_RECEIVED:
      if (payload.event.event_type === constants.REMOTE_EVENT_STATE_CHANGED) {
        _pushNewState(payload.event.data.new_state);
        stateStore.emitChange();
      }
      break;

    case constants.ACTION_LOG_OUT:
      states = {};
      stateStore.emitChange();
      break;
  }
});

export default stateStore;
