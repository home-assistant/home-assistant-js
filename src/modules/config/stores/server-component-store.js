import nuclearJS from 'nuclear-js';
import actionTypes from '../action-types';

const { Store, toImmutable } = nuclearJS;

const INSTANCE = new Store({
  getInitialState() {
    return toImmutable([]);
  },

  initialize() {
    /* eslint-disable no-use-before-define */
    this.on(actionTypes.COMPONENT_LOADED, componentLoaded);
    this.on(actionTypes.SERVER_CONFIG_LOADED, serverConfigLoaded);
    this.on(actionTypes.LOG_OUT, logOut);
    /* eslint-enable no-use-before-define */
  },
});

export default INSTANCE;

function componentLoaded(state, { component }) {
  return state.push(component);
}

function serverConfigLoaded(state, { components }) {
  return toImmutable(components);
}

function logOut() {
  return INSTANCE.getInitialState();
}
