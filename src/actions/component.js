'use strict';

var callApi = require('../call_api');
var dispatcher = require('../app_dispatcher');
var actions = require('../actions/actions');

module.exports = {
  newLoaded: function(components) {
    dispatcher.dispatch({
      actionType: actions.ACTION_NEW_LOADED_COMPONENTS,
      components: components,
    });
  },

  fetchAll: function() {
    return callApi('GET', 'components').then(this.newLoaded.bind(this));
  },    
};
