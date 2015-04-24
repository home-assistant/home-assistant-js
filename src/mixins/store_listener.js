/**

Put this in your class to have it listen to stores.

When you want to start listening, call this.listenToStores(fireOnListen)
If fireOnListen is true will call all change listeners when they start listening.

When you want to stop listening, call stopListeningToStores()

All functions that you define that follow the format:

  function <storeName>StoreChanged(store);

will be automatically fired on a store change.

*/

let NAMES = [
  'auth', 'component', 'event', 'service', 'state', 'stateHistory',
  'stream', 'sync', 'notification', 'voice', 'logbook'];

let LISTENERS = NAMES.map(store => store + 'StoreChanged');
let STORES = NAMES.map(function(store) {
  // convert from camel to snake case
  let jsFile = store.replace(
    /([A-Z])/g, function($1){ return "_" + $1.toLowerCase(); });
  return require('../stores/' + jsFile);
});

export function listenToStores(fireOnListen) {
  var storeListeners = [];

  LISTENERS.forEach(function(listenerName, storeIndex) {
    if (this[listenerName]) {
      var store = STORES[storeIndex];
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
