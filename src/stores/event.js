'use strict';

var _ = require('lodash');
var dispatcher = require('../app_dispatcher');
var constants = require('../constants');
var Store = require('../stores/store');

var events = [];

var eventStore = {};
_.assign(eventStore, Store.prototype, {
  all() {
    return events;
  },

});

eventStore.dispatchToken = dispatcher.register(function(payload) {
  switch(payload.actionType) {
    case constants.ACTION_NEW_EVENTS:
      events = payload.events;
      eventStore.emitChange();
      break;

    case constants.ACTION_LOG_OUT:
      events = [];
      eventStore.emitChange();
      break;
  }
});


module.exports = eventStore;
