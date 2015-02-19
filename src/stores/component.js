'use strict';

import _ from 'lodash';
import dispatcher from '../app_dispatcher';
import constants from '../constants';
import Store from './store';

let loadedComponents = [];

let componentStore = {};
_.assign(componentStore, Store.prototype, {
  loaded() {
    return loadedComponents;
  },

  isLoaded(component) {
    return loadedComponents.indexOf(component) !== -1;
  },

});

componentStore.dispatchToken = dispatcher.register(function(payload) {
  switch(payload.actionType) {

    case constants.ACTION_NEW_LOADED_COMPONENTS:
      loadedComponents = payload.components;
      componentStore.emitChange();
      break;

    case constants.ACTION_REMOTE_EVENT_RECEIVED:
      if (payload.event.event_type === constants.REMOTE_EVENT_COMPONENT_LOADED) {
        let component = payload.event.data.component;

        if (!componentStore.isLoaded(component)) {
          loadedComponents.push(component);
        }

        componentStore.emitChange();
      }
      break;

    case constants.ACTION_LOG_OUT:
      loadedComponents = [];
      componentStore.emitChange();
      break;

  }
});

export default componentStore;
