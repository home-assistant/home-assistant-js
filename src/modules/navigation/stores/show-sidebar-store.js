import { Store } from 'nuclear-js';
import actionTypes from '../action-types';

class ShowSidebarStore extends Store {
  getInitialState() {
    return false;
  }

  initialize() {
    /* eslint-disable no-use-before-define */
    this.on(actionTypes.SHOW_SIDEBAR, showSidebar);
    this.on(actionTypes.LOG_OUT, logOut);
    /* eslint-enable no-use-before-define */
  }
}

const INSTANCE = new ShowSidebarStore();

export default INSTANCE;

function showSidebar(state, {show}) {
  return show;
}

function logOut() {
  return INSTANCE.getInitialState();
}
