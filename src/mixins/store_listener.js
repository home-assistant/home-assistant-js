/**

Put this in your class to have it listen to stores.

When you want to start listening, call this.listenToStores(fireOnListen)
If fireOnListen is true will call all change listeners when they start listening.

When you want to stop listening, call stopListeningToStores()

All functions that you define that follow the format:

  function <storeName>StoreChanged(store);

will be automatically fired on a store change.

*/

_ = require('lodash');

let STORES = {
  'authStoreChanged': require('../stores/auth'),
  'componentStoreChanged': require('../stores/component'),
  'eventStoreChanged': require('../stores/event'),
  'serviceStoreChanged': require('../stores/service'),
  'stateStoreChanged': require('../stores/state'),
  'stateHistoryStoreChanged': require('../stores/state_history'),
  'streamStoreChanged': require('../stores/stream'),
  'syncStoreChanged': require('../stores/sync'),
  'notificationStoreChanged': require('../stores/notification'),
  'voiceStoreChanged': require('../stores/voice'),
  'logbookStoreChanged': require('../stores/logbook'),
};

export function listenToStores(fireOnListen) {
  var storeListeners = [];

  _.forEach(STORES, function(store, listenerName) {
    if (this[listenerName]) {
      var listener = this[listenerName].bind(this, store);

      store.addChangeListener(listener);

      storeListeners.push({store: store, listener: listener});

      if (fireOnListen) {
        listener();
      }
    }
  }.bind(this));

  this._storeListeners = storeListeners;
}

export function stopListeningToStores() {
  this._storeListeners.forEach(function({store, listener}) {
    store.removeChangeListener(listener);
  });
}
