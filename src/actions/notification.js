'use strict';

var dispatcher = require('../app_dispatcher');
var constants = require('../constants');

module.exports = {

  notify(message) {
    dispatcher.dispatch({
      actionType: constants.ACTION_NEW_NOTIFICATION,
      message: message,
    });
  },
    
};
