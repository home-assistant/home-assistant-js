import { Store } from 'nuclear-js';
import actionTypes from '../action-types';

class CurrentEntityIdStore extends Store {
  getInitialState() {
    return null;
  }

  initialize() {
    this.on(actionTypes.SELECT_ENTITY, selectEntity);
    this.on(actionTypes.DESELECT_ENTITY, deselectEntity);
    this.on(actionTypes.LOG_OUT, logOut);
  }
}

const INSTANCE = new CurrentEntityIdStore();

export default INSTANCE;

function selectEntity(state, {entityId}) {
  return entityId;
}

function deselectEntity(state) {
  return null;
}

function logOut(state) {
  return INSTANCE.getInitialState();
}
