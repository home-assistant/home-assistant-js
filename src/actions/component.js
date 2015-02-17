'use strict';

var callApi = require('../call_api');
var dispatcher = require('../app_dispatcher');
var constants = require('../constants');

module.exports = {
  newLoaded(components) {
    dispatcher.dispatch({
      actionType: constants.ACTION_NEW_LOADED_COMPONENTS,
      components: components,
    });
  },

  fetchAll() {
    return callApi('GET', 'components').then(this.newLoaded.bind(this));
  },    
};
