'use strict';

import _ from 'lodash';
import dispatcher from '../app_dispatcher';
import constants from '../constants';
import Store from '../stores/store';

let notifications = [];

let notificationStore = {};
_.assign(notificationStore, Store.prototype, {

  hasNewNotifications(lastId) {
    lastId = lastId || -1;
    return lastId + 1 < notifications.length;
  },

  getLastNotification() {
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

export default notificationStore;
