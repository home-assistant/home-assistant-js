'use strict';

var { EventEmitter } = require('events');
var _ = require('lodash');

var CHANGE_EVENT = 'change';

export default function Store() {};

_.assign(Store.prototype, EventEmitter.prototype, {

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});
