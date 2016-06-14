import nuclearJS from 'nuclear-js';
import actionTypes from '../action-types';

const { Store } = nuclearJS;

const INSTANCE = new Store({
  getInitialState() {
    return true;
  },

  initialize() {
    this.on(actionTypes.API_FETCH_ALL_START, () => true);
    this.on(actionTypes.API_FETCH_ALL_SUCCESS, () => false);
    this.on(actionTypes.API_FETCH_ALL_FAIL, () => false);
    this.on(actionTypes.LOG_OUT, () => false);
  },
});

export default INSTANCE;
