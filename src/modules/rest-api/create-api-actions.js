import actionTypes from './action-types';

/**
 * @param {Object} model
 * @param {String} model.entity
 * @param {Function} model.save
 * @param {Function} model.fetch
 * @param {Function} model.fetchAll
 * @param {Function} model.delete
 * @return {Object}
 */
export default function createApiActions(model) {
  const apiActions = {};
  /* eslint-disable no-use-before-define */
  apiActions.incrementData = function pushNewData(reactor, data, params = {}) {
    onFetchSuccess(reactor, model, params, data);
  };

  apiActions.replaceData = function pushNewData(reactor, data, params = {}) {
    onFetchSuccess(reactor, model, {...params, replace: true}, data);
  };

  if (model.fetch) {
    apiActions.fetch = function fetchAction(reactor, params = {}) {
      reactor.dispatch(actionTypes.API_FETCH_START, {
        model: model,
        method: 'fetch',
        params: params,
      });
      return model.fetch(reactor, params).then(
        onFetchSuccess.bind(null, reactor, model, params),
        onFetchFail.bind(null, reactor, model, params)
      );
    };
  }

  apiActions.fetchAll = function fetchAllAction(reactor, params = {}) {
    reactor.dispatch(actionTypes.API_FETCH_START, {
      model: model,
      method: 'fetchAll',
      params: params,
    });
    return model.fetchAll(reactor, params).then(
      onFetchSuccess.bind(null, reactor, model, {...params, replace: true}),
      onFetchFail.bind(null, reactor, model, params)
    );
  };

  if (model.save) {
    apiActions.save = function saveAction(reactor, params = {}) {
      reactor.dispatch(actionTypes.API_SAVE_START, {
        params: params,
      });
      return model.save(reactor, params).then(
        onSaveSuccess.bind(null, reactor, model, params),
        onSaveFail.bind(null, reactor, model, params)
      );
    };
  }

  /* eslint-disable dot-notation */
  if (model.delete) {
    apiActions['delete'] = function deleteAction(reactor, params = {}) {
      reactor.dispatch(actionTypes.API_DELETE_START, {
        params: params,
      });
      return model['delete'](reactor, params).then(
        onDeleteSuccess.bind(null, reactor, model, params),
        onDeleteFail.bind(null, reactor, model, params)
      );
    };
  }
  /* eslint-enable dot-notation */

  /* eslint-enable no-use-before-define */
  return apiActions;
}

/**
 * Handler for API fetch success, dispatches flux action to store the fetched
 * result in the api cache
 * @param {Model} model
 * @param {*} params used to call the `model.fetch(params)`
 * @param {Object} result
 * @return {Object}
 */
function onFetchSuccess(reactor, model, params, result) {
  reactor.dispatch(actionTypes.API_FETCH_SUCCESS, {
    model,
    params,
    result,
  });
  return result;
}

/**
 * Handler for API fetch success, dispatches flux action to store the fetched
 * result in the api cache
 * @param {Model} model
 * @param {*} params used to call the `model.fetch(params)`
 * @param {*} reason
 * @return {Object}
 */
function onFetchFail(reactor, model, params, reason) {
  reactor.dispatch(actionTypes.API_FETCH_FAIL, {
    model,
    params,
    reason,
  });
  return Promise.reject(reason);
}

/**
 * Handler for API save success, dispatches flux action to update the store with the
 * saved instance
 * @param {Model} model
 * @param {*} params used to call the `model.save(params)`
 * @param {Object} result
 * @return {Object}
 */
function onSaveSuccess(reactor, model, params, result) {
  reactor.dispatch(actionTypes.API_SAVE_SUCCESS, {
    model,
    params,
    result,
  });
  return result;
}

/**
 * Handler for API save success, dispatches flux action to update the store with the
 * saved instance
 * @param {Model} model
 * @param {*} params used to call the `model.save(params)`
 * @param {*} reason
 * @return {Object}
 */
function onSaveFail(reactor, model, params, reason) {
  reactor.dispatch(actionTypes.API_SAVE_FAIL, {
    model,
    params,
    reason,
  });
  return Promise.reject(reason);
}

/**
 * Handler for API delete success, dispatches flux action to remove the instance from the stores
 * @param {Model} model
 * @param {*} params used to call the `model.delete(params)`
 * @param {Object} result
 * @return {Object}
 */
function onDeleteSuccess(reactor, model, params, result) {
  reactor.dispatch(actionTypes.API_DELETE_SUCCESS, {
    model,
    params,
    result,
  });
  return result;
}

/**
 * Handler for API delete fail
 * @param {Model} model
 * @param {*} params used to call the `model.delete(params)`
 * @param {Object} result
 * @return {Object}
 */
function onDeleteFail(reactor, model, params, reason) {
  reactor.dispatch(actionTypes.API_DELETE_FAIL, {
    model,
    params,
    reason,
  });
  return Promise.reject(reason);
}
