'use strict';

var _ = require('lodash');
var dispatcher = require('../app_dispatcher');
var constants = require('../constants');
var Store = require('./store');
var streamStore = require('./stream');
var State = require('../models/state');

var states = {};

/**
 * Sort a list of states
 */
var sortStates = function(toSortStates) {
  return _.sortBy(toSortStates, 'entityId');
};

/**
 * Push new states
 */
var pushNewStates = function(newStates, removeNonPresent) {
  if (!removeNonPresent) {
    _.forEach(newStates, _pushNewState);
    return;
  }

  states = _.zipObject(
    _.map(newStates, _state_key),
    _.map(newStates, _pushNewState));
};

var _state_key = function(jsonState) {
  return jsonState.entity_id;
};

/**
 * Creates or updates a state. Returns bool if a new state was added.
 */
var _pushNewState = function(newState) {
  var key = _state_key(newState);

  states[key] = State.fromJSON(newState);

  return states[key];
};

var stateStore = {};
_.assign(stateStore, Store.prototype, {
  all: function() {
    return sortStates(_.values(states));
  },

  get: function(entityId) {
    entityId = entityId.toLowerCase();

    return states[entityId] || null;
  },

  gets: function(entityIds) {
    return sortStates(_.compact(_.map(entityIds, this.get, this)));
  },

  entityIDs: function() {
    return Object.keys(states);
  },

  getCustomGroups: function() {
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

module.exports = stateStore;
