'use strict';

var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

var CHANGE_EVENT = 'change';

var Store = function() {};

_.assign(Store.prototype, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

module.exports = Store;
