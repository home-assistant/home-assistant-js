var dispatcher = require('../app_dispatcher');
var { ACTION_NEW_NOTIFICATION } = require('../constants');

export function notify(message) {
  dispatcher.dispatch({
    actionType: ACTION_NEW_NOTIFICATION,
    message: message,
  });
}
