import { Store } from 'nuclear-js';
import actionTypes from '../action-types';
import restApiActionTypes from '../../rest-api/action-types';

const INSTANCE = new Store({
  getInitialState() {
    return null;
  },

  initialize() {
    /* eslint-disable no-use-before-define */
    this.on(actionTypes.SELECT_SECTION, (state, { section }) => section);
    this.on(restApiActionTypes.API_FETCH_SUCCESS, validateSection);
    /* eslint-enable no-use-before-define */
  },
});

function validateSection(state, { model, result, params }) {
  if (state === null || model.entity !== 'entity' || !params.replace) {
    return state;
  }

  // Validate that current section exists in the new states
  for (let i = 0; i < result.length; i++) {
    if (result[i].entity_id === state) {
      return state;
    }
  }

  return null;
}

export default INSTANCE;
