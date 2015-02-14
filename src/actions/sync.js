'use strict';

var dispatcher = require('../app_dispatcher');

var constants = require('../constants');
var eventActions = require('./event');
var stateActions = require('./state');
var serviceActions = require('./service');
var componentActions = require('./component');

var SYNC_INTERVAL = 30000;

var scheduledSync = null;

var scheduleSync = function() {
  clearTimeout(scheduledSync);

  scheduledSync = setTimeout(syncActions.sync, SYNC_INTERVAL);
};

var syncActions = {

  sync: function(options) {
    options = options || {};

    dispatcher.dispatch({
      actionType: constants.ACTION_FETCH_ALL,
    });

    eventActions.fetchAll();
    stateActions.fetchAll();
    serviceActions.fetchAll();

    if (_.isUndefined(options.skipComponents)) {
      componentActions.fetchAll();
    }

    scheduleSync();
  },

};

module.exports = syncActions;
