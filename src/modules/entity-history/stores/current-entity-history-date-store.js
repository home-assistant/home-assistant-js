import nuclearJS from 'nuclear-js';
import dateToStr from '../../../util/date-to-str';
import actionTypes from '../action-types';

const { Store } = nuclearJS;

const INSTANCE = new Store({
  getInitialState() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return dateToStr(yesterday, true);
  },

  initialize() {
    /* eslint-disable no-use-before-define */
    this.on(actionTypes.ENTITY_HISTORY_DATE_SELECTED, dateSelected);
    this.on(actionTypes.LOG_OUT, logOut);
    /* eslint-enable no-use-before-define */
  },
});

export default INSTANCE;

function dateSelected(state, { date }) {
  return dateToStr(date, true);
}

function logOut() {
  return INSTANCE.getInitialState();
}
