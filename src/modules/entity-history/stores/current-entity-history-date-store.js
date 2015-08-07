import { Store } from 'nuclear-js';
import dateToStr from '../../../util/date-to-str';
import actionTypes from '../action-types';

class CurrentEntityHistoryDate extends Store {
  getInitialState() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return dateToStr(yesterday);
  }

  initialize() {
    this.on(actionTypes.ENTITY_HISTORY_DATE_SELECTED, dateSelected);
    this.on(actionTypes.LOG_OUT, logOut);
  }
}

const INSTANCE = new CurrentEntityHistoryDate();

export default INSTANCE;

function dateSelected(state, {date}) {
  return dateToStr(date);
}

function logOut(state) {
  return INSTANCE.getInitialState();
}
