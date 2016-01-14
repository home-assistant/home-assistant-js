import { Store } from 'nuclear-js';
import actionTypes from '../action-types';

const INSTANCE = new Store({
  getInitialState() {
    return null;
  },

  initialize() {
    /* eslint-disable no-use-before-define */
    this.on(actionTypes.SELECT_ENTITY, selectEntity);
    this.on(actionTypes.LOG_OUT, logOut);
    /* eslint-enable no-use-before-define */
  },
});

export default INSTANCE;

function selectEntity(state, { entityId }) {
  return entityId;
}

function logOut() {
  return INSTANCE.getInitialState();
}
