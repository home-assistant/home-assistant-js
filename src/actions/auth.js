'use strict';

var callApi = require('../call_api');
var dispatcher = require('../app_dispatcher');
var constants = require('../constants');
var syncActions = require('../actions/sync');
var streamActions = require('../actions/stream');

module.exports = {

  /**
   * Fetch the loaded components as a way to validate the API.
   */
  validate: function(authToken) {
    dispatcher.dispatch({
      actionType: constants.ACTION_VALIDATING_AUTH_TOKEN
    });

    callApi('GET', 'components', false, {auth: authToken}).then(

      function(newComponents) {
        dispatcher.dispatch({
          actionType: constants.ACTION_VALID_AUTH_TOKEN,
          authToken: authToken,
        });

        syncActions.sync({skipComponents: true});

        componentActions.newLoaded(newComponents);
      }, 

      function(payload) {
        dispatcher.dispatch({
          actionType: constants.ACTION_INVALID_AUTH_TOKEN,
          message: payload.message,
        });
      });
  },

  logOut: function() {
    dispatcher.dispatch({
      actionType: constants.ACTION_LOG_OUT,
    });
  },

};
