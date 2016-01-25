import { Store } from 'nuclear-js';
import actionTypes from '../action-types';
import restApiActionTypes from '../../rest-api/action-types';

const INSTANCE = new Store({
  getInitialState() {
    return null;
  },

  initialize() {
    /* eslint-disable no-use-before-define */
    this.on(actionTypes.SELECT_VIEW, (state, { view }) => view);
    this.on(restApiActionTypes.API_FETCH_SUCCESS, validateView);
    /* eslint-enable no-use-before-define */
  },
});

function validateView(state, { model, result, params }) {
  if (state === null || model.entity !== 'entity' || !params.replace) {
    return state;
  }

  // Validate that current view exists in the new states
  for (let i = 0; i < result.length; i++) {
    if (result[i].entity_id === state) {
      return state;
    }
  }

  return null;
}

export default INSTANCE;
