import { Store, toImmutable } from 'nuclear-js';
import actionTypes from '../action-types';

class ServerComponentStore extends Store {
  getInitialState() {
    return toImmutable([]);
  }

  initialize() {
    this.on(actionTypes.COMPONENT_LOADED, componentLoaded);
    this.on(actionTypes.SERVER_CONFIG_LOADED, serverConfigLoaded);
    this.on(actionTypes.LOG_OUT, logOut);
  }
}

const INSTANCE = new ServerComponentStore();

export default INSTANCE;

function componentLoaded(state, {component}) {
  return state.push(component);
}

function serverConfigLoaded(state, {components}) {
  return toImmutable(components);
}

function logOut(state) {
  return INSTANCE.getInitialState();
}
