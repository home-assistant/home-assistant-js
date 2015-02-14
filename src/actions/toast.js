'use strict';

var dispatcher = require('../app_dispatcher');
var constants = require('../constants');

module.exports = {

  show: function(message) {
    dispatcher.dispatch({
      actionType: constants.ACTION_SHOW_TOAST,
      message: message,
    });
  },
    
};
