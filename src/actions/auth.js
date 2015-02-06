'use strict';

var callApi = require('../call_api');
var dispatcher = require('../app_dispatcher');
var actions = require('../actions/actions');
var syncActions = require('../actions/sync');
var componentActions = require('../actions/component');

module.exports = {

  /**
   * Fetch the loaded components as a way to validate the API.
   */
  validate: function(authToken) {
    dispatcher.dispatch({
      actionType: actions.ACTION_VALIDATING_AUTH_TOKEN
    });

    callApi('GET', 'components', false, {auth: authToken}).then(

      function(newComponents) {
        dispatcher.dispatch({
          actionType: actions.ACTION_VALID_AUTH_TOKEN,
          authToken: authToken,
        });

        syncActions.sync({skipComponents: true});

        componentActions.newLoaded(newComponents);
      }, 

      function(payload) {
        dispatcher.dispatch({
          actionType: actions.ACTION_INVALID_AUTH_TOKEN,
          message: payload.message,
        });
      });
  },

  logOut: function() {
    dispatcher.dispatch({
      actionType: actions.ACTION_LOG_OUT,
    });
  },

};
