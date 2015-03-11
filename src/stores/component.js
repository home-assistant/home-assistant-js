'use strict';

import dispatcher from '../app_dispatcher';
import constants from '../constants';
import Store from './store';

let loadedComponents = [];

class ComponentStore extends Store {
  get loaded() {
    return loadedComponents;
  }

  isLoaded(component) {
    return loadedComponents.indexOf(component) !== -1;
  }
}

const INSTANCE = new ComponentStore();

INSTANCE.dispatchToken = dispatcher.register(payload => {
  switch(payload.actionType) {

    case constants.ACTION_NEW_LOADED_COMPONENTS:
      loadedComponents = payload.components;
      INSTANCE.emitChange();
      break;

    case constants.ACTION_REMOTE_EVENT_RECEIVED:
      if (payload.event.event_type === constants.REMOTE_EVENT_COMPONENT_LOADED) {
        let component = payload.event.data.component;

        if (!INSTANCE.isLoaded(component)) {
          loadedComponents.push(component);
        }

        INSTANCE.emitChange();
      }
      break;

    case constants.ACTION_LOG_OUT:
      loadedComponents = [];
      INSTANCE.emitChange();
      break;

  }
});

export default INSTANCE;
