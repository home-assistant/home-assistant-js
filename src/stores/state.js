'use strict';

var _ = require('lodash');
var dispatcher = require('../app_dispatcher');
var actions = require('../actions/actions');
var Store = require('../stores/store');
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
  removeNonPresent = !!removeNonPresent;
  var currentEntityIds = removeNonPresent ? Object.keys(states) : [];

  _.forEach(newStates, function(newState) {
    var isNewState = _pushNewState(newState);

    if (!isNewState && removeNonPresent) {
      currentEntityIds.splice(currentEntityIds.indexOf(newState.entity_id), 1);
    }
  });

  _.forEach(currentEntityIds, function(entityId) {
    delete states[entityId];
  });
};

/**
 * Creates or updates a state. Returns bool if a new state was added.
 */
var _pushNewState = function(new_state) {
  var key = new_state.entity_id.toLowerCase();

  if (_.has(states, key)) {
    var curState = states[key];

    curState.attributes = new_state.attributes;
    curState.last_changed = new_state.last_changed;
    curState.state = new_state.state;

    return false;
  } else {
    states[key] = new State(new_state);

    return true;
  }
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
    case actions.ACTION_NEW_STATES:
      pushNewStates(payload.states, payload.replace);
      stateStore.emitChange();
      break;

    case actions.ACTION_LOG_OUT:
      states = {};
      stateStore.emitChange();
      break;
  }
});

module.exports = stateStore;
