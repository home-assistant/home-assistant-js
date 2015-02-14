'use strict';

/**

Put this in your class to have it listen to stores.

When you want to start listening, call this.listenToStores(fireOnListen)
If fireOnListen is true will call all change listeners when they start listening.

When you want to stop listening, call stopListeningToStores()

All functions that you define that follow the format:

  function <storeName>StoreChanged(store);

will be automatically fired on a store change.

*/

var _ = require('lodash');

var STORES = [
  'auth', 'component', 'event', 'service', 'state', 'state_history',
  'stream', 'sync'];

var getStore = function(name) {
  return require('../stores/' + name);
};

var StoreListenerMixIn = {
  _storeListeners: {},

  listenToStores: function(fireOnListen) {
    _.forEach(STORES, function(storeName) {
      var listenerName = storeName + 'StoreChanged';

      if (this[listenerName]) {
        var store = getStore(storeName);
        var listener = this[listenerName].bind(this, store);

        store.addChangeListener(listener);

        this._storeListeners[storeName] = listener;

        if (fireOnListen) {
          listener();
        }
      }
    }.bind(this));
  },

  stopListeningToStores: function() {
    _.forEach(this._storeListeners, function(listener, storeName) {
      getStore(storeName).removeChangeListener(listener);
    });
  },

};

module.exports = StoreListenerMixIn;
