'use strict';

var _ = require('lodash');

var dispatcher = require('../app_dispatcher');

var actions = require('../actions/actions');
var eventActions = require('./event');
var stateActions = require('./state');
var serviceActions = require('./service');
var componentActions = require('./component');

var SYNC_INTERVAL = 30000;

var syncInterval = null;

var scheduleSync = function() {
  clearTimeout(syncInterval);

  syncInterval = setTimeout(syncActions.sync, SYNC_INTERVAL);
};

var syncActions = {

  sync: function(options) {
    options = options || {};

    dispatcher.dispatch({
      actionType: actions.ACTION_FETCH_ALL,
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
