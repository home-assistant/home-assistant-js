import nuclearJS from 'nuclear-js';
import dateToStr from '../../../util/date-to-str';
import actionTypes from '../action-types';

const { Store } = nuclearJS;

const INSTANCE = new Store({
  getInitialState() {
    return dateToStr(new Date());
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
  return dateToStr(date);
}

function logOut() {
  return INSTANCE.getInitialState();
}
