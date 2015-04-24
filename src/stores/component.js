import { List } from 'immutable';
import dispatcher from '../app_dispatcher';
import constants from '../constants';
import Store from './store';

let loadedComponents = new List();

class ComponentStore extends Store {
  get loaded() {
    return loadedComponents;
  }

  isLoaded(component) {
    return loadedComponents.contains(component);
  }
}

const INSTANCE = new ComponentStore();

INSTANCE.dispatchToken = dispatcher.register(payload => {
  switch(payload.actionType) {

    case constants.ACTION_NEW_LOADED_COMPONENTS:
      loadedComponents = new List(payload.components);
      INSTANCE.emitChange();
      break;

    case constants.ACTION_REMOTE_EVENT_RECEIVED:
      if (payload.event.event_type !== constants.REMOTE_EVENT_COMPONENT_LOADED) {
        break;
      }

      let component = payload.event.data.component;

      if (INSTANCE.isLoaded(component)) {
        break;
      }

      loadedComponents = loadedComponents.push(component);

      INSTANCE.emitChange();
      break;

    case constants.ACTION_LOG_OUT:
      loadedComponents = new List();
      INSTANCE.emitChange();
      break;

  }
});

export default INSTANCE;
