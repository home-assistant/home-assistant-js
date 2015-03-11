'use strict';

import dispatcher from '../app_dispatcher';
import constants from '../constants';
import Store from '../stores/store';

let notifications = [];

class NotificationStore extends Store {

  hasNewNotifications(lastId) {
    lastId = lastId || -1;
    return lastId + 1 < notifications.length;
  }

  get lastNotification() {
    return notifications[notifications.length-1];
  }

}

const INSTANCE = new NotificationStore();

INSTANCE.dispatchToken = dispatcher.register(function(payload) {
  switch(payload.actionType) {
    case constants.ACTION_NEW_NOTIFICATION:
      notifications.push({id: notifications.length, message: payload.message});

      INSTANCE.emitChange();
      break;

    case constants.ACTION_LOG_OUT:
      notifications = [];

      INSTANCE.emitChange();
      break;
  }
});

export default INSTANCE;
