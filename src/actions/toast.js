'use strict';

var dispatcher = require('../app_dispatcher');
var actions = require('../actions/actions');

module.exports = {

  show: function(message) {
    dispatcher.dispatch({
      actionType: actions.ACTION_SHOW_TOAST,
      message: message,
    });
  },
    
};
