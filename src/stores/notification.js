'use strict';

var _ = require('lodash');
var dispatcher = require('../app_dispatcher');
var constants = require('../constants');
var Store = require('../stores/store');

var notifications = [];

var notificationStore = {};
_.assign(notificationStore, Store.prototype, {

  hasNewNotifications: function(lastId) {
    lastId = lastId || -1;
    return lastId + 1 < notifications.length;
  },

  getLastNotification: function() {
    return notifications[notifications.length-1];
  },

});

notificationStore.dispatchToken = dispatcher.register(function(payload) {
  switch(payload.actionType) {
    case constants.ACTION_NEW_NOTIFICATION:
      notifications.push({id: notifications.length, message: payload.message});

      notificationStore.emitChange();
      break;

    case constants.ACTION_LOG_OUT:
      notifications = [];

      notificationStore.emitChange();
      break;
  }
});

module.exports = notificationStore;
