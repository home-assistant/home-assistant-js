import nuclearJS from 'nuclear-js';
import actionTypes from '../action-types';

const { Store } = nuclearJS;

const INSTANCE = new Store({
  getInitialState() {
    var date = new Date();
    date.setHours(0, 0, 0, 0);
    return date.toISOString();
  },

  initialize() {
    /* eslint-disable no-use-before-define */
    this.on(actionTypes.LOGBOOK_DATE_SELECTED, dateSelected);
    this.on(actionTypes.LOG_OUT, logOut);
    /* eslint-enable no-use-before-define */
  },
});

export default INSTANCE;

function dateSelected(state, { date }) {
  return date.toISOString();
}

function logOut() {
  return INSTANCE.getInitialState();
}
