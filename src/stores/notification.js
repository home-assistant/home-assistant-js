import { List } from 'immutable';
import dispatcher from '../app_dispatcher';
import constants from '../constants';
import Store from '../stores/store';
import Notification from '../models/notification';

let notifications = new List();

function _nextId() {
  return notifications.size;
}

class NotificationStore extends Store {

  hasNewNotifications(lastId=0) {
    return lastId + 1 <= notifications.size;
  }

  get lastNotification() {
    return notifications.last();
  }

}

const INSTANCE = new NotificationStore();

INSTANCE.dispatchToken = dispatcher.register(function(payload) {
  switch(payload.actionType) {
    case constants.ACTION_NEW_NOTIFICATION:
      notifications = notifications.push(
        new Notification(_nextId(), payload.message));

      INSTANCE.emitChange();
      break;

    case constants.ACTION_LOG_OUT:
      notifications = new List();

      INSTANCE.emitChange();
      break;
  }
});

export default INSTANCE;
