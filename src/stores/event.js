'use strict';

var _ = require('lodash');
var dispatcher = require('../app_dispatcher');
var actions = require('../actions/actions');
var Store = require('../stores/store');

var events = [];

var eventStore = {};
_.assign(eventStore, Store.prototype, {
  all: function() {
    return events;
  },

});

eventStore.dispatchToken = dispatcher.register(function(payload) {
  switch(payload.actionType) {
    case actions.ACTION_NEW_EVENTS:
      events = payload.events;
      eventStore.emitChange();
      break;

    case actions.ACTION_LOG_OUT:
      events = [];
      eventStore.emitChange();
      break;
  }
});


module.exports = eventStore;
