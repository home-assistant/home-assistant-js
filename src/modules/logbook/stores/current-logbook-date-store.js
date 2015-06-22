import { Store } from 'nuclear-js';
import { dateToStr } from '../../../util';
import actionTypes from '../action-types';

class CurrentLogbookDate extends Store {
  getInitialState() {
    return dateToStr(new Date());
  }

  initialize() {
    this.on(actionTypes.LOGBOOK_DATE_SELECTED, dateSelected);
    this.on(actionTypes.LOG_OUT, logOut);
  }
}

const INSTANCE = new CurrentLogbookDate();

export default INSTANCE;

function dateSelected(state, {date}) {
  return dateToStr(date);
}

function logOut(state) {
  return INSTANCE.getInitialState();
}
