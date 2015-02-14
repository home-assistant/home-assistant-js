'use strict';

var _ = require('lodash');
var dispatcher = require('../app_dispatcher');
var constants = require('../constants');
var Store = require('../stores/store');

var loadedComponents = [];

var componentStore = {};
_.assign(componentStore, Store.prototype, {
  loaded: function() {
    return loadedComponents;
  },

  isLoaded: function(component) {
    return loadedComponents.indexOf(component) !== -1;
  },

});

componentStore.dispatchToken = dispatcher.register(function(payload) {
  switch(payload.actionType) {

    case constants.ACTION_NEW_LOADED_COMPONENTS:
      loadedComponents = payload.components;
      componentStore.emitChange();
      break;

    case constants.ACTION_LOG_OUT:
      loadedComponents = [];
      componentStore.emitChange();
      break;

  }
});

module.exports = componentStore;
