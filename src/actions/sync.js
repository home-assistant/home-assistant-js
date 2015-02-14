'use strict';

var dispatcher = require('../app_dispatcher');

var constants = require('../constants');
var eventActions = require('./event');
var stateActions = require('./state');
var serviceActions = require('./service');
var componentActions = require('./component');

var SYNC_INTERVAL = 30000;

var scheduledSync = null;

var stopSync = function() {
  clearTimeout(scheduledSync);
};

var scheduleSync = function() {
  stopSync();

  scheduledSync = setTimeout(syncActions.sync, SYNC_INTERVAL);
};

var syncActions = {

  sync: function() {
    this.fetchAll();

    scheduleSync();
  },

  stopSync: function() {
    stopSync();
  },

  fetchAll: function() {
    dispatcher.dispatch({
      actionType: constants.ACTION_FETCH_ALL,
    });

    eventActions.fetchAll();
    stateActions.fetchAll();
    serviceActions.fetchAll();
    componentActions.fetchAll();
  },

};

module.exports = syncActions;
