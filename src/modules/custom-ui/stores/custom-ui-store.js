import nuclearJS from 'nuclear-js';
import actionTypes from '../action-types';

const { Store, toImmutable } = nuclearJS;

const INSTANCE = new Store({
  getInitialState() {
    return toImmutable({});
  },

  initialize() {
    /* eslint-disable no-use-before-define */
    this.on(actionTypes.CUSTOM_UI_LOADED, customUiLoaded);
    /* eslint-enable no-use-before-define */
  },
});

export default INSTANCE;

function customUiLoaded(state, { customUi }) {
  return toImmutable(customUi);
}
