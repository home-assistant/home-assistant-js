'use strict';

import { EventEmitter } from 'events';
import _ from 'lodash';

const CHANGE_EVENT = 'change';

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
