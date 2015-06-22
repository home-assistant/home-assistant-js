/**
 * Stores cached entities for the Rest API
 */
import isArray from 'lodash/lang/isarray';
import { Store, toImmutable } from 'nuclear-js';
import actionTypes from '../action-types';

class RestApiCacheStore extends Store {
  getInitialState() {
    return toImmutable({});
  }

  initialize() {
    this.on(actionTypes.API_FETCH_SUCCESS, loadData);
    this.on(actionTypes.API_SAVE_SUCCESS, loadData);
    this.on(actionTypes.API_DELETE_SUCCESS, removeData);
    this.on(actionTypes.LOG_OUT, () => this.getInitialState());
  }
}

const INSTANCE = new RestApiCacheStore();

export default INSTANCE;

/**
 * @param {Immutable.Map} state
 * @param {Object} payload
 * @param {Model} payload.model
 * @param {any} payload.params
 * @param {Object|Array} payload.result
 */
function loadData(state, {model, result, params}) {
  const entity = model.entity;

  if (!result) {
    // no-op if no real data was returned
    return state;
  }

  const newState = params.replace ? state.set(entity, toImmutable({})) : state;
  const data = isArray(result) ? result : [result];
  const fromJSON = model.fromJSON || toImmutable;

  return newState.withMutations(function mutateState(mState) {
    data.forEach(function jsonObjIterator(jsonObj) {
      const entry = fromJSON(jsonObj);
      mState.setIn([entity, entry.id], entry);
    });
  });
}

/**
 * @param {Immutable.Map} state
 * @param {Object} payload
 * @param {Model} payload.model
 * @param {any} payload.params
 * @param {Object|Array} payload.result
 */
function removeData(state, {model, params}) {
  return state.removeIn([model.entity, params.id]);
}
