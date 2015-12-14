import { Store } from 'nuclear-js';
import actionTypes from '../action-types';

const INSTANCE = new Store({
  getInitialState() {
    return false;
  },

  initialize() {
    this.on(actionTypes.SYNC_SCHEDULED, () => true);
    this.on(actionTypes.SYNC_SCHEDULE_CANCELLED, () => false);
    this.on(actionTypes.LOG_OUT, () => false);
  },
});

export default INSTANCE;
