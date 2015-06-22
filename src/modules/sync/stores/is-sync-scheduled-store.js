import { Store } from 'nuclear-js';
import actionTypes from '../action-types';

class SyncScheduled extends Store {
  getInitialState() {
    return false;
  }

  initialize() {
    this.on(actionTypes.SYNC_SCHEDULED, () => true);
    this.on(actionTypes.SYNC_SCHEDULE_CANCELLED, () => false);
    this.on(actionTypes.LOG_OUT, () => false);
  }
}

const INSTANCE = new SyncScheduled();

export default INSTANCE;
