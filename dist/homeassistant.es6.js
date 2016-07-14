var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var nuclear = createCommonjsModule(function (module, exports) {
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Nuclear"] = factory();
	else
		root["Nuclear"] = factory();
})(commonjsGlobal, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	__webpack_require__(1);

	var _store = __webpack_require__(2);

	var _store2 = _interopRequireDefault(_store);

	var _reactor = __webpack_require__(6);

	var _reactor2 = _interopRequireDefault(_reactor);

	var _immutable = __webpack_require__(3);

	var _immutable2 = _interopRequireDefault(_immutable);

	var _immutableHelpers = __webpack_require__(5);

	var _keyPath = __webpack_require__(11);

	var _getter = __webpack_require__(10);

	var _createReactMixin = __webpack_require__(7);

	var _createReactMixin2 = _interopRequireDefault(_createReactMixin);

	exports['default'] = {
	  Reactor: _reactor2['default'],
	  Store: _store2['default'],
	  Immutable: _immutable2['default'],
	  isKeyPath: _keyPath.isKeyPath,
	  isGetter: _getter.isGetter,
	  toJS: _immutableHelpers.toJS,
	  toImmutable: _immutableHelpers.toImmutable,
	  isImmutable: _immutableHelpers.isImmutable,
	  createReactMixin: _createReactMixin2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	try {
	  if (!(window.console && console.log)) {
	    console = {
	      log: function log() {},
	      debug: function debug() {},
	      info: function info() {},
	      warn: function warn() {},
	      error: function error() {}
	    };
	  }
	} catch (e) {}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	exports.isStore = isStore;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _immutable = __webpack_require__(3);

	var _utils = __webpack_require__(4);

	var _immutableHelpers = __webpack_require__(5);

	/**
	 * Stores define how a certain domain of the application should respond to actions
	 * taken on the whole system.  They manage their own section of the entire app state
	 * and have no knowledge about the other parts of the application state.
	 */

	var Store = (function () {
	  function Store(config) {
	    _classCallCheck(this, Store);

	    this.__handlers = (0, _immutable.Map)({});

	    if (config) {
	      // allow `MyStore extends Store` syntax without throwing error
	      (0, _utils.extend)(this, config);
	    }

	    this.initialize();
	  }

	  /**
	   * This method is overridden by extending classes to setup message handlers
	   * via `this.on` and to set up the initial state
	   *
	   * Anything returned from this function will be coerced into an ImmutableJS value
	   * and set as the initial state for the part of the ReactorCore
	   */

	  _createClass(Store, [{
	    key: 'initialize',
	    value: function initialize() {}
	    // extending classes implement to setup action handlers

	    /**
	     * Overridable method to get the initial state for this type of store
	     */

	  }, {
	    key: 'getInitialState',
	    value: function getInitialState() {
	      return (0, _immutable.Map)();
	    }

	    /**
	     * Takes a current reactor state, action type and payload
	     * does the reaction and returns the new state
	     */
	  }, {
	    key: 'handle',
	    value: function handle(state, type, payload) {
	      var handler = this.__handlers.get(type);

	      if (typeof handler === 'function') {
	        return handler.call(this, state, payload, type);
	      }

	      return state;
	    }

	    /**
	     * Pure function taking the current state of store and returning
	     * the new state after a NuclearJS reactor has been reset
	     *
	     * Overridable
	     */
	  }, {
	    key: 'handleReset',
	    value: function handleReset(state) {
	      return this.getInitialState();
	    }

	    /**
	     * Binds an action type => handler
	     */
	  }, {
	    key: 'on',
	    value: function on(actionType, handler) {
	      this.__handlers = this.__handlers.set(actionType, handler);
	    }

	    /**
	     * Serializes store state to plain JSON serializable JavaScript
	     * Overridable
	     * @param {*}
	     * @return {*}
	     */
	  }, {
	    key: 'serialize',
	    value: function serialize(state) {
	      return (0, _immutableHelpers.toJS)(state);
	    }

	    /**
	     * Deserializes plain JavaScript to store state
	     * Overridable
	     * @param {*}
	     * @return {*}
	     */
	  }, {
	    key: 'deserialize',
	    value: function deserialize(state) {
	      return (0, _immutableHelpers.toImmutable)(state);
	    }
	  }]);

	  return Store;
	})();

	function isStore(toTest) {
	  return toTest instanceof Store;
	}

	exports['default'] = (0, _utils.toFactory)(Store);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *  Copyright (c) 2014-2015, Facebook, Inc.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the BSD-style license found in the
	 *  LICENSE file in the root directory of this source tree. An additional grant
	 *  of patent rights can be found in the PATENTS file in the same directory.
	 */
	(function (global, factory) {
	   module.exports = factory()
	}(this, function () { 'use strict';var SLICE$0 = Array.prototype.slice;

	  function createClass(ctor, superClass) {
	    if (superClass) {
	      ctor.prototype = Object.create(superClass.prototype);
	    }
	    ctor.prototype.constructor = ctor;
	  }

	  // Used for setting prototype methods that IE8 chokes on.
	  var DELETE = 'delete';

	  // Constants describing the size of trie nodes.
	  var SHIFT = 5; // Resulted in best performance after ______?
	  var SIZE = 1 << SHIFT;
	  var MASK = SIZE - 1;

	  // A consistent shared value representing "not set" which equals nothing other
	  // than itself, and nothing that could be provided externally.
	  var NOT_SET = {};

	  // Boolean references, Rough equivalent of `bool &`.
	  var CHANGE_LENGTH = { value: false };
	  var DID_ALTER = { value: false };

	  function MakeRef(ref) {
	    ref.value = false;
	    return ref;
	  }

	  function SetRef(ref) {
	    ref && (ref.value = true);
	  }

	  // A function which returns a value representing an "owner" for transient writes
	  // to tries. The return value will only ever equal itself, and will not equal
	  // the return of any subsequent call of this function.
	  function OwnerID() {}

	  // http://jsperf.com/copy-array-inline
	  function arrCopy(arr, offset) {
	    offset = offset || 0;
	    var len = Math.max(0, arr.length - offset);
	    var newArr = new Array(len);
	    for (var ii = 0; ii < len; ii++) {
	      newArr[ii] = arr[ii + offset];
	    }
	    return newArr;
	  }

	  function ensureSize(iter) {
	    if (iter.size === undefined) {
	      iter.size = iter.__iterate(returnTrue);
	    }
	    return iter.size;
	  }

	  function wrapIndex(iter, index) {
	    // This implements "is array index" which the ECMAString spec defines as:
	    //     A String property name P is an array index if and only if
	    //     ToString(ToUint32(P)) is equal to P and ToUint32(P) is not equal
	    //     to 2^32−1.
	    // However note that we're currently calling ToNumber() instead of ToUint32()
	    // which should be improved in the future, as floating point numbers should
	    // not be accepted as an array index.
	    if (typeof index !== 'number') {
	      var numIndex = +index;
	      if ('' + numIndex !== index) {
	        return NaN;
	      }
	      index = numIndex;
	    }
	    return index < 0 ? ensureSize(iter) + index : index;
	  }

	  function returnTrue() {
	    return true;
	  }

	  function wholeSlice(begin, end, size) {
	    return (begin === 0 || (size !== undefined && begin <= -size)) &&
	      (end === undefined || (size !== undefined && end >= size));
	  }

	  function resolveBegin(begin, size) {
	    return resolveIndex(begin, size, 0);
	  }

	  function resolveEnd(end, size) {
	    return resolveIndex(end, size, size);
	  }

	  function resolveIndex(index, size, defaultIndex) {
	    return index === undefined ?
	      defaultIndex :
	      index < 0 ?
	        Math.max(0, size + index) :
	        size === undefined ?
	          index :
	          Math.min(size, index);
	  }

	  function Iterable(value) {
	      return isIterable(value) ? value : Seq(value);
	    }


	  createClass(KeyedIterable, Iterable);
	    function KeyedIterable(value) {
	      return isKeyed(value) ? value : KeyedSeq(value);
	    }


	  createClass(IndexedIterable, Iterable);
	    function IndexedIterable(value) {
	      return isIndexed(value) ? value : IndexedSeq(value);
	    }


	  createClass(SetIterable, Iterable);
	    function SetIterable(value) {
	      return isIterable(value) && !isAssociative(value) ? value : SetSeq(value);
	    }



	  function isIterable(maybeIterable) {
	    return !!(maybeIterable && maybeIterable[IS_ITERABLE_SENTINEL]);
	  }

	  function isKeyed(maybeKeyed) {
	    return !!(maybeKeyed && maybeKeyed[IS_KEYED_SENTINEL]);
	  }

	  function isIndexed(maybeIndexed) {
	    return !!(maybeIndexed && maybeIndexed[IS_INDEXED_SENTINEL]);
	  }

	  function isAssociative(maybeAssociative) {
	    return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
	  }

	  function isOrdered(maybeOrdered) {
	    return !!(maybeOrdered && maybeOrdered[IS_ORDERED_SENTINEL]);
	  }

	  Iterable.isIterable = isIterable;
	  Iterable.isKeyed = isKeyed;
	  Iterable.isIndexed = isIndexed;
	  Iterable.isAssociative = isAssociative;
	  Iterable.isOrdered = isOrdered;

	  Iterable.Keyed = KeyedIterable;
	  Iterable.Indexed = IndexedIterable;
	  Iterable.Set = SetIterable;


	  var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
	  var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
	  var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
	  var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

	  /* global Symbol */

	  var ITERATE_KEYS = 0;
	  var ITERATE_VALUES = 1;
	  var ITERATE_ENTRIES = 2;

	  var REAL_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator';

	  var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;


	  function src_Iterator__Iterator(next) {
	      this.next = next;
	    }

	    src_Iterator__Iterator.prototype.toString = function() {
	      return '[Iterator]';
	    };


	  src_Iterator__Iterator.KEYS = ITERATE_KEYS;
	  src_Iterator__Iterator.VALUES = ITERATE_VALUES;
	  src_Iterator__Iterator.ENTRIES = ITERATE_ENTRIES;

	  src_Iterator__Iterator.prototype.inspect =
	  src_Iterator__Iterator.prototype.toSource = function () { return this.toString(); }
	  src_Iterator__Iterator.prototype[ITERATOR_SYMBOL] = function () {
	    return this;
	  };


	  function iteratorValue(type, k, v, iteratorResult) {
	    var value = type === 0 ? k : type === 1 ? v : [k, v];
	    iteratorResult ? (iteratorResult.value = value) : (iteratorResult = {
	      value: value, done: false
	    });
	    return iteratorResult;
	  }

	  function iteratorDone() {
	    return { value: undefined, done: true };
	  }

	  function hasIterator(maybeIterable) {
	    return !!getIteratorFn(maybeIterable);
	  }

	  function isIterator(maybeIterator) {
	    return maybeIterator && typeof maybeIterator.next === 'function';
	  }

	  function getIterator(iterable) {
	    var iteratorFn = getIteratorFn(iterable);
	    return iteratorFn && iteratorFn.call(iterable);
	  }

	  function getIteratorFn(iterable) {
	    var iteratorFn = iterable && (
	      (REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL]) ||
	      iterable[FAUX_ITERATOR_SYMBOL]
	    );
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }

	  function isArrayLike(value) {
	    return value && typeof value.length === 'number';
	  }

	  createClass(Seq, Iterable);
	    function Seq(value) {
	      return value === null || value === undefined ? emptySequence() :
	        isIterable(value) ? value.toSeq() : seqFromValue(value);
	    }

	    Seq.of = function(/*...values*/) {
	      return Seq(arguments);
	    };

	    Seq.prototype.toSeq = function() {
	      return this;
	    };

	    Seq.prototype.toString = function() {
	      return this.__toString('Seq {', '}');
	    };

	    Seq.prototype.cacheResult = function() {
	      if (!this._cache && this.__iterateUncached) {
	        this._cache = this.entrySeq().toArray();
	        this.size = this._cache.length;
	      }
	      return this;
	    };

	    // abstract __iterateUncached(fn, reverse)

	    Seq.prototype.__iterate = function(fn, reverse) {
	      return seqIterate(this, fn, reverse, true);
	    };

	    // abstract __iteratorUncached(type, reverse)

	    Seq.prototype.__iterator = function(type, reverse) {
	      return seqIterator(this, type, reverse, true);
	    };



	  createClass(KeyedSeq, Seq);
	    function KeyedSeq(value) {
	      return value === null || value === undefined ?
	        emptySequence().toKeyedSeq() :
	        isIterable(value) ?
	          (isKeyed(value) ? value.toSeq() : value.fromEntrySeq()) :
	          keyedSeqFromValue(value);
	    }

	    KeyedSeq.prototype.toKeyedSeq = function() {
	      return this;
	    };



	  createClass(IndexedSeq, Seq);
	    function IndexedSeq(value) {
	      return value === null || value === undefined ? emptySequence() :
	        !isIterable(value) ? indexedSeqFromValue(value) :
	        isKeyed(value) ? value.entrySeq() : value.toIndexedSeq();
	    }

	    IndexedSeq.of = function(/*...values*/) {
	      return IndexedSeq(arguments);
	    };

	    IndexedSeq.prototype.toIndexedSeq = function() {
	      return this;
	    };

	    IndexedSeq.prototype.toString = function() {
	      return this.__toString('Seq [', ']');
	    };

	    IndexedSeq.prototype.__iterate = function(fn, reverse) {
	      return seqIterate(this, fn, reverse, false);
	    };

	    IndexedSeq.prototype.__iterator = function(type, reverse) {
	      return seqIterator(this, type, reverse, false);
	    };



	  createClass(SetSeq, Seq);
	    function SetSeq(value) {
	      return (
	        value === null || value === undefined ? emptySequence() :
	        !isIterable(value) ? indexedSeqFromValue(value) :
	        isKeyed(value) ? value.entrySeq() : value
	      ).toSetSeq();
	    }

	    SetSeq.of = function(/*...values*/) {
	      return SetSeq(arguments);
	    };

	    SetSeq.prototype.toSetSeq = function() {
	      return this;
	    };



	  Seq.isSeq = isSeq;
	  Seq.Keyed = KeyedSeq;
	  Seq.Set = SetSeq;
	  Seq.Indexed = IndexedSeq;

	  var IS_SEQ_SENTINEL = '@@__IMMUTABLE_SEQ__@@';

	  Seq.prototype[IS_SEQ_SENTINEL] = true;



	  // #pragma Root Sequences

	  createClass(ArraySeq, IndexedSeq);
	    function ArraySeq(array) {
	      this._array = array;
	      this.size = array.length;
	    }

	    ArraySeq.prototype.get = function(index, notSetValue) {
	      return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;
	    };

	    ArraySeq.prototype.__iterate = function(fn, reverse) {
	      var array = this._array;
	      var maxIndex = array.length - 1;
	      for (var ii = 0; ii <= maxIndex; ii++) {
	        if (fn(array[reverse ? maxIndex - ii : ii], ii, this) === false) {
	          return ii + 1;
	        }
	      }
	      return ii;
	    };

	    ArraySeq.prototype.__iterator = function(type, reverse) {
	      var array = this._array;
	      var maxIndex = array.length - 1;
	      var ii = 0;
	      return new src_Iterator__Iterator(function() 
	        {return ii > maxIndex ?
	          iteratorDone() :
	          iteratorValue(type, ii, array[reverse ? maxIndex - ii++ : ii++])}
	      );
	    };



	  createClass(ObjectSeq, KeyedSeq);
	    function ObjectSeq(object) {
	      var keys = Object.keys(object);
	      this._object = object;
	      this._keys = keys;
	      this.size = keys.length;
	    }

	    ObjectSeq.prototype.get = function(key, notSetValue) {
	      if (notSetValue !== undefined && !this.has(key)) {
	        return notSetValue;
	      }
	      return this._object[key];
	    };

	    ObjectSeq.prototype.has = function(key) {
	      return this._object.hasOwnProperty(key);
	    };

	    ObjectSeq.prototype.__iterate = function(fn, reverse) {
	      var object = this._object;
	      var keys = this._keys;
	      var maxIndex = keys.length - 1;
	      for (var ii = 0; ii <= maxIndex; ii++) {
	        var key = keys[reverse ? maxIndex - ii : ii];
	        if (fn(object[key], key, this) === false) {
	          return ii + 1;
	        }
	      }
	      return ii;
	    };

	    ObjectSeq.prototype.__iterator = function(type, reverse) {
	      var object = this._object;
	      var keys = this._keys;
	      var maxIndex = keys.length - 1;
	      var ii = 0;
	      return new src_Iterator__Iterator(function()  {
	        var key = keys[reverse ? maxIndex - ii : ii];
	        return ii++ > maxIndex ?
	          iteratorDone() :
	          iteratorValue(type, key, object[key]);
	      });
	    };

	  ObjectSeq.prototype[IS_ORDERED_SENTINEL] = true;


	  createClass(IterableSeq, IndexedSeq);
	    function IterableSeq(iterable) {
	      this._iterable = iterable;
	      this.size = iterable.length || iterable.size;
	    }

	    IterableSeq.prototype.__iterateUncached = function(fn, reverse) {
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var iterable = this._iterable;
	      var iterator = getIterator(iterable);
	      var iterations = 0;
	      if (isIterator(iterator)) {
	        var step;
	        while (!(step = iterator.next()).done) {
	          if (fn(step.value, iterations++, this) === false) {
	            break;
	          }
	        }
	      }
	      return iterations;
	    };

	    IterableSeq.prototype.__iteratorUncached = function(type, reverse) {
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterable = this._iterable;
	      var iterator = getIterator(iterable);
	      if (!isIterator(iterator)) {
	        return new src_Iterator__Iterator(iteratorDone);
	      }
	      var iterations = 0;
	      return new src_Iterator__Iterator(function()  {
	        var step = iterator.next();
	        return step.done ? step : iteratorValue(type, iterations++, step.value);
	      });
	    };



	  createClass(IteratorSeq, IndexedSeq);
	    function IteratorSeq(iterator) {
	      this._iterator = iterator;
	      this._iteratorCache = [];
	    }

	    IteratorSeq.prototype.__iterateUncached = function(fn, reverse) {
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var iterator = this._iterator;
	      var cache = this._iteratorCache;
	      var iterations = 0;
	      while (iterations < cache.length) {
	        if (fn(cache[iterations], iterations++, this) === false) {
	          return iterations;
	        }
	      }
	      var step;
	      while (!(step = iterator.next()).done) {
	        var val = step.value;
	        cache[iterations] = val;
	        if (fn(val, iterations++, this) === false) {
	          break;
	        }
	      }
	      return iterations;
	    };

	    IteratorSeq.prototype.__iteratorUncached = function(type, reverse) {
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterator = this._iterator;
	      var cache = this._iteratorCache;
	      var iterations = 0;
	      return new src_Iterator__Iterator(function()  {
	        if (iterations >= cache.length) {
	          var step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	          cache[iterations] = step.value;
	        }
	        return iteratorValue(type, iterations, cache[iterations++]);
	      });
	    };




	  // # pragma Helper functions

	  function isSeq(maybeSeq) {
	    return !!(maybeSeq && maybeSeq[IS_SEQ_SENTINEL]);
	  }

	  var EMPTY_SEQ;

	  function emptySequence() {
	    return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
	  }

	  function keyedSeqFromValue(value) {
	    var seq =
	      Array.isArray(value) ? new ArraySeq(value).fromEntrySeq() :
	      isIterator(value) ? new IteratorSeq(value).fromEntrySeq() :
	      hasIterator(value) ? new IterableSeq(value).fromEntrySeq() :
	      typeof value === 'object' ? new ObjectSeq(value) :
	      undefined;
	    if (!seq) {
	      throw new TypeError(
	        'Expected Array or iterable object of [k, v] entries, '+
	        'or keyed object: ' + value
	      );
	    }
	    return seq;
	  }

	  function indexedSeqFromValue(value) {
	    var seq = maybeIndexedSeqFromValue(value);
	    if (!seq) {
	      throw new TypeError(
	        'Expected Array or iterable object of values: ' + value
	      );
	    }
	    return seq;
	  }

	  function seqFromValue(value) {
	    var seq = maybeIndexedSeqFromValue(value) ||
	      (typeof value === 'object' && new ObjectSeq(value));
	    if (!seq) {
	      throw new TypeError(
	        'Expected Array or iterable object of values, or keyed object: ' + value
	      );
	    }
	    return seq;
	  }

	  function maybeIndexedSeqFromValue(value) {
	    return (
	      isArrayLike(value) ? new ArraySeq(value) :
	      isIterator(value) ? new IteratorSeq(value) :
	      hasIterator(value) ? new IterableSeq(value) :
	      undefined
	    );
	  }

	  function seqIterate(seq, fn, reverse, useKeys) {
	    var cache = seq._cache;
	    if (cache) {
	      var maxIndex = cache.length - 1;
	      for (var ii = 0; ii <= maxIndex; ii++) {
	        var entry = cache[reverse ? maxIndex - ii : ii];
	        if (fn(entry[1], useKeys ? entry[0] : ii, seq) === false) {
	          return ii + 1;
	        }
	      }
	      return ii;
	    }
	    return seq.__iterateUncached(fn, reverse);
	  }

	  function seqIterator(seq, type, reverse, useKeys) {
	    var cache = seq._cache;
	    if (cache) {
	      var maxIndex = cache.length - 1;
	      var ii = 0;
	      return new src_Iterator__Iterator(function()  {
	        var entry = cache[reverse ? maxIndex - ii : ii];
	        return ii++ > maxIndex ?
	          iteratorDone() :
	          iteratorValue(type, useKeys ? entry[0] : ii - 1, entry[1]);
	      });
	    }
	    return seq.__iteratorUncached(type, reverse);
	  }

	  createClass(Collection, Iterable);
	    function Collection() {
	      throw TypeError('Abstract');
	    }


	  createClass(KeyedCollection, Collection);function KeyedCollection() {}

	  createClass(IndexedCollection, Collection);function IndexedCollection() {}

	  createClass(SetCollection, Collection);function SetCollection() {}


	  Collection.Keyed = KeyedCollection;
	  Collection.Indexed = IndexedCollection;
	  Collection.Set = SetCollection;

	  /**
	   * An extension of the "same-value" algorithm as [described for use by ES6 Map
	   * and Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Key_equality)
	   *
	   * NaN is considered the same as NaN, however -0 and 0 are considered the same
	   * value, which is different from the algorithm described by
	   * [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).
	   *
	   * This is extended further to allow Objects to describe the values they
	   * represent, by way of `valueOf` or `equals` (and `hashCode`).
	   *
	   * Note: because of this extension, the key equality of Immutable.Map and the
	   * value equality of Immutable.Set will differ from ES6 Map and Set.
	   *
	   * ### Defining custom values
	   *
	   * The easiest way to describe the value an object represents is by implementing
	   * `valueOf`. For example, `Date` represents a value by returning a unix
	   * timestamp for `valueOf`:
	   *
	   *     var date1 = new Date(1234567890000); // Fri Feb 13 2009 ...
	   *     var date2 = new Date(1234567890000);
	   *     date1.valueOf(); // 1234567890000
	   *     assert( date1 !== date2 );
	   *     assert( Immutable.is( date1, date2 ) );
	   *
	   * Note: overriding `valueOf` may have other implications if you use this object
	   * where JavaScript expects a primitive, such as implicit string coercion.
	   *
	   * For more complex types, especially collections, implementing `valueOf` may
	   * not be performant. An alternative is to implement `equals` and `hashCode`.
	   *
	   * `equals` takes another object, presumably of similar type, and returns true
	   * if the it is equal. Equality is symmetrical, so the same result should be
	   * returned if this and the argument are flipped.
	   *
	   *     assert( a.equals(b) === b.equals(a) );
	   *
	   * `hashCode` returns a 32bit integer number representing the object which will
	   * be used to determine how to store the value object in a Map or Set. You must
	   * provide both or neither methods, one must not exist without the other.
	   *
	   * Also, an important relationship between these methods must be upheld: if two
	   * values are equal, they *must* return the same hashCode. If the values are not
	   * equal, they might have the same hashCode; this is called a hash collision,
	   * and while undesirable for performance reasons, it is acceptable.
	   *
	   *     if (a.equals(b)) {
	   *       assert( a.hashCode() === b.hashCode() );
	   *     }
	   *
	   * All Immutable collections implement `equals` and `hashCode`.
	   *
	   */
	  function is(valueA, valueB) {
	    if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
	      return true;
	    }
	    if (!valueA || !valueB) {
	      return false;
	    }
	    if (typeof valueA.valueOf === 'function' &&
	        typeof valueB.valueOf === 'function') {
	      valueA = valueA.valueOf();
	      valueB = valueB.valueOf();
	      if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
	        return true;
	      }
	      if (!valueA || !valueB) {
	        return false;
	      }
	    }
	    if (typeof valueA.equals === 'function' &&
	        typeof valueB.equals === 'function' &&
	        valueA.equals(valueB)) {
	      return true;
	    }
	    return false;
	  }

	  function fromJS(json, converter) {
	    return converter ?
	      fromJSWith(converter, json, '', {'': json}) :
	      fromJSDefault(json);
	  }

	  function fromJSWith(converter, json, key, parentJSON) {
	    if (Array.isArray(json)) {
	      return converter.call(parentJSON, key, IndexedSeq(json).map(function(v, k)  {return fromJSWith(converter, v, k, json)}));
	    }
	    if (isPlainObj(json)) {
	      return converter.call(parentJSON, key, KeyedSeq(json).map(function(v, k)  {return fromJSWith(converter, v, k, json)}));
	    }
	    return json;
	  }

	  function fromJSDefault(json) {
	    if (Array.isArray(json)) {
	      return IndexedSeq(json).map(fromJSDefault).toList();
	    }
	    if (isPlainObj(json)) {
	      return KeyedSeq(json).map(fromJSDefault).toMap();
	    }
	    return json;
	  }

	  function isPlainObj(value) {
	    return value && (value.constructor === Object || value.constructor === undefined);
	  }

	  var src_Math__imul =
	    typeof Math.imul === 'function' && Math.imul(0xffffffff, 2) === -2 ?
	    Math.imul :
	    function imul(a, b) {
	      a = a | 0; // int
	      b = b | 0; // int
	      var c = a & 0xffff;
	      var d = b & 0xffff;
	      // Shift by 0 fixes the sign on the high part.
	      return (c * d) + ((((a >>> 16) * d + c * (b >>> 16)) << 16) >>> 0) | 0; // int
	    };

	  // v8 has an optimization for storing 31-bit signed numbers.
	  // Values which have either 00 or 11 as the high order bits qualify.
	  // This function drops the highest order bit in a signed number, maintaining
	  // the sign bit.
	  function smi(i32) {
	    return ((i32 >>> 1) & 0x40000000) | (i32 & 0xBFFFFFFF);
	  }

	  function hash(o) {
	    if (o === false || o === null || o === undefined) {
	      return 0;
	    }
	    if (typeof o.valueOf === 'function') {
	      o = o.valueOf();
	      if (o === false || o === null || o === undefined) {
	        return 0;
	      }
	    }
	    if (o === true) {
	      return 1;
	    }
	    var type = typeof o;
	    if (type === 'number') {
	      var h = o | 0;
	      if (h !== o) {
	        h ^= o * 0xFFFFFFFF;
	      }
	      while (o > 0xFFFFFFFF) {
	        o /= 0xFFFFFFFF;
	        h ^= o;
	      }
	      return smi(h);
	    }
	    if (type === 'string') {
	      return o.length > STRING_HASH_CACHE_MIN_STRLEN ? cachedHashString(o) : hashString(o);
	    }
	    if (typeof o.hashCode === 'function') {
	      return o.hashCode();
	    }
	    return hashJSObj(o);
	  }

	  function cachedHashString(string) {
	    var hash = stringHashCache[string];
	    if (hash === undefined) {
	      hash = hashString(string);
	      if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
	        STRING_HASH_CACHE_SIZE = 0;
	        stringHashCache = {};
	      }
	      STRING_HASH_CACHE_SIZE++;
	      stringHashCache[string] = hash;
	    }
	    return hash;
	  }

	  // http://jsperf.com/hashing-strings
	  function hashString(string) {
	    // This is the hash from JVM
	    // The hash code for a string is computed as
	    // s[0] * 31 ^ (n - 1) + s[1] * 31 ^ (n - 2) + ... + s[n - 1],
	    // where s[i] is the ith character of the string and n is the length of
	    // the string. We "mod" the result to make it between 0 (inclusive) and 2^31
	    // (exclusive) by dropping high bits.
	    var hash = 0;
	    for (var ii = 0; ii < string.length; ii++) {
	      hash = 31 * hash + string.charCodeAt(ii) | 0;
	    }
	    return smi(hash);
	  }

	  function hashJSObj(obj) {
	    var hash;
	    if (usingWeakMap) {
	      hash = weakMap.get(obj);
	      if (hash !== undefined) {
	        return hash;
	      }
	    }

	    hash = obj[UID_HASH_KEY];
	    if (hash !== undefined) {
	      return hash;
	    }

	    if (!canDefineProperty) {
	      hash = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];
	      if (hash !== undefined) {
	        return hash;
	      }

	      hash = getIENodeHash(obj);
	      if (hash !== undefined) {
	        return hash;
	      }
	    }

	    hash = ++objHashUID;
	    if (objHashUID & 0x40000000) {
	      objHashUID = 0;
	    }

	    if (usingWeakMap) {
	      weakMap.set(obj, hash);
	    } else if (isExtensible !== undefined && isExtensible(obj) === false) {
	      throw new Error('Non-extensible objects are not allowed as keys.');
	    } else if (canDefineProperty) {
	      Object.defineProperty(obj, UID_HASH_KEY, {
	        'enumerable': false,
	        'configurable': false,
	        'writable': false,
	        'value': hash
	      });
	    } else if (obj.propertyIsEnumerable !== undefined &&
	               obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable) {
	      // Since we can't define a non-enumerable property on the object
	      // we'll hijack one of the less-used non-enumerable properties to
	      // save our hash on it. Since this is a function it will not show up in
	      // `JSON.stringify` which is what we want.
	      obj.propertyIsEnumerable = function() {
	        return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
	      };
	      obj.propertyIsEnumerable[UID_HASH_KEY] = hash;
	    } else if (obj.nodeType !== undefined) {
	      // At this point we couldn't get the IE `uniqueID` to use as a hash
	      // and we couldn't use a non-enumerable property to exploit the
	      // dontEnum bug so we simply add the `UID_HASH_KEY` on the node
	      // itself.
	      obj[UID_HASH_KEY] = hash;
	    } else {
	      throw new Error('Unable to set a non-enumerable property on object.');
	    }

	    return hash;
	  }

	  // Get references to ES5 object methods.
	  var isExtensible = Object.isExtensible;

	  // True if Object.defineProperty works as expected. IE8 fails this test.
	  var canDefineProperty = (function() {
	    try {
	      Object.defineProperty({}, '@', {});
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }());

	  // IE has a `uniqueID` property on DOM nodes. We can construct the hash from it
	  // and avoid memory leaks from the IE cloneNode bug.
	  function getIENodeHash(node) {
	    if (node && node.nodeType > 0) {
	      switch (node.nodeType) {
	        case 1: // Element
	          return node.uniqueID;
	        case 9: // Document
	          return node.documentElement && node.documentElement.uniqueID;
	      }
	    }
	  }

	  // If possible, use a WeakMap.
	  var usingWeakMap = typeof WeakMap === 'function';
	  var weakMap;
	  if (usingWeakMap) {
	    weakMap = new WeakMap();
	  }

	  var objHashUID = 0;

	  var UID_HASH_KEY = '__immutablehash__';
	  if (typeof Symbol === 'function') {
	    UID_HASH_KEY = Symbol(UID_HASH_KEY);
	  }

	  var STRING_HASH_CACHE_MIN_STRLEN = 16;
	  var STRING_HASH_CACHE_MAX_SIZE = 255;
	  var STRING_HASH_CACHE_SIZE = 0;
	  var stringHashCache = {};

	  function invariant(condition, error) {
	    if (!condition) throw new Error(error);
	  }

	  function assertNotInfinite(size) {
	    invariant(
	      size !== Infinity,
	      'Cannot perform this action with an infinite size.'
	    );
	  }

	  createClass(ToKeyedSequence, KeyedSeq);
	    function ToKeyedSequence(indexed, useKeys) {
	      this._iter = indexed;
	      this._useKeys = useKeys;
	      this.size = indexed.size;
	    }

	    ToKeyedSequence.prototype.get = function(key, notSetValue) {
	      return this._iter.get(key, notSetValue);
	    };

	    ToKeyedSequence.prototype.has = function(key) {
	      return this._iter.has(key);
	    };

	    ToKeyedSequence.prototype.valueSeq = function() {
	      return this._iter.valueSeq();
	    };

	    ToKeyedSequence.prototype.reverse = function() {var this$0 = this;
	      var reversedSequence = reverseFactory(this, true);
	      if (!this._useKeys) {
	        reversedSequence.valueSeq = function()  {return this$0._iter.toSeq().reverse()};
	      }
	      return reversedSequence;
	    };

	    ToKeyedSequence.prototype.map = function(mapper, context) {var this$0 = this;
	      var mappedSequence = mapFactory(this, mapper, context);
	      if (!this._useKeys) {
	        mappedSequence.valueSeq = function()  {return this$0._iter.toSeq().map(mapper, context)};
	      }
	      return mappedSequence;
	    };

	    ToKeyedSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      var ii;
	      return this._iter.__iterate(
	        this._useKeys ?
	          function(v, k)  {return fn(v, k, this$0)} :
	          ((ii = reverse ? resolveSize(this) : 0),
	            function(v ) {return fn(v, reverse ? --ii : ii++, this$0)}),
	        reverse
	      );
	    };

	    ToKeyedSequence.prototype.__iterator = function(type, reverse) {
	      if (this._useKeys) {
	        return this._iter.__iterator(type, reverse);
	      }
	      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	      var ii = reverse ? resolveSize(this) : 0;
	      return new src_Iterator__Iterator(function()  {
	        var step = iterator.next();
	        return step.done ? step :
	          iteratorValue(type, reverse ? --ii : ii++, step.value, step);
	      });
	    };

	  ToKeyedSequence.prototype[IS_ORDERED_SENTINEL] = true;


	  createClass(ToIndexedSequence, IndexedSeq);
	    function ToIndexedSequence(iter) {
	      this._iter = iter;
	      this.size = iter.size;
	    }

	    ToIndexedSequence.prototype.includes = function(value) {
	      return this._iter.includes(value);
	    };

	    ToIndexedSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      var iterations = 0;
	      return this._iter.__iterate(function(v ) {return fn(v, iterations++, this$0)}, reverse);
	    };

	    ToIndexedSequence.prototype.__iterator = function(type, reverse) {
	      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	      var iterations = 0;
	      return new src_Iterator__Iterator(function()  {
	        var step = iterator.next();
	        return step.done ? step :
	          iteratorValue(type, iterations++, step.value, step)
	      });
	    };



	  createClass(ToSetSequence, SetSeq);
	    function ToSetSequence(iter) {
	      this._iter = iter;
	      this.size = iter.size;
	    }

	    ToSetSequence.prototype.has = function(key) {
	      return this._iter.includes(key);
	    };

	    ToSetSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return this._iter.__iterate(function(v ) {return fn(v, v, this$0)}, reverse);
	    };

	    ToSetSequence.prototype.__iterator = function(type, reverse) {
	      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	      return new src_Iterator__Iterator(function()  {
	        var step = iterator.next();
	        return step.done ? step :
	          iteratorValue(type, step.value, step.value, step);
	      });
	    };



	  createClass(FromEntriesSequence, KeyedSeq);
	    function FromEntriesSequence(entries) {
	      this._iter = entries;
	      this.size = entries.size;
	    }

	    FromEntriesSequence.prototype.entrySeq = function() {
	      return this._iter.toSeq();
	    };

	    FromEntriesSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return this._iter.__iterate(function(entry ) {
	        // Check if entry exists first so array access doesn't throw for holes
	        // in the parent iteration.
	        if (entry) {
	          validateEntry(entry);
	          var indexedIterable = isIterable(entry);
	          return fn(
	            indexedIterable ? entry.get(1) : entry[1],
	            indexedIterable ? entry.get(0) : entry[0],
	            this$0
	          );
	        }
	      }, reverse);
	    };

	    FromEntriesSequence.prototype.__iterator = function(type, reverse) {
	      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	      return new src_Iterator__Iterator(function()  {
	        while (true) {
	          var step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	          var entry = step.value;
	          // Check if entry exists first so array access doesn't throw for holes
	          // in the parent iteration.
	          if (entry) {
	            validateEntry(entry);
	            var indexedIterable = isIterable(entry);
	            return iteratorValue(
	              type,
	              indexedIterable ? entry.get(0) : entry[0],
	              indexedIterable ? entry.get(1) : entry[1],
	              step
	            );
	          }
	        }
	      });
	    };


	  ToIndexedSequence.prototype.cacheResult =
	  ToKeyedSequence.prototype.cacheResult =
	  ToSetSequence.prototype.cacheResult =
	  FromEntriesSequence.prototype.cacheResult =
	    cacheResultThrough;


	  function flipFactory(iterable) {
	    var flipSequence = makeSequence(iterable);
	    flipSequence._iter = iterable;
	    flipSequence.size = iterable.size;
	    flipSequence.flip = function()  {return iterable};
	    flipSequence.reverse = function () {
	      var reversedSequence = iterable.reverse.apply(this); // super.reverse()
	      reversedSequence.flip = function()  {return iterable.reverse()};
	      return reversedSequence;
	    };
	    flipSequence.has = function(key ) {return iterable.includes(key)};
	    flipSequence.includes = function(key ) {return iterable.has(key)};
	    flipSequence.cacheResult = cacheResultThrough;
	    flipSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
	      return iterable.__iterate(function(v, k)  {return fn(k, v, this$0) !== false}, reverse);
	    }
	    flipSequence.__iteratorUncached = function(type, reverse) {
	      if (type === ITERATE_ENTRIES) {
	        var iterator = iterable.__iterator(type, reverse);
	        return new src_Iterator__Iterator(function()  {
	          var step = iterator.next();
	          if (!step.done) {
	            var k = step.value[0];
	            step.value[0] = step.value[1];
	            step.value[1] = k;
	          }
	          return step;
	        });
	      }
	      return iterable.__iterator(
	        type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES,
	        reverse
	      );
	    }
	    return flipSequence;
	  }


	  function mapFactory(iterable, mapper, context) {
	    var mappedSequence = makeSequence(iterable);
	    mappedSequence.size = iterable.size;
	    mappedSequence.has = function(key ) {return iterable.has(key)};
	    mappedSequence.get = function(key, notSetValue)  {
	      var v = iterable.get(key, NOT_SET);
	      return v === NOT_SET ?
	        notSetValue :
	        mapper.call(context, v, key, iterable);
	    };
	    mappedSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
	      return iterable.__iterate(
	        function(v, k, c)  {return fn(mapper.call(context, v, k, c), k, this$0) !== false},
	        reverse
	      );
	    }
	    mappedSequence.__iteratorUncached = function (type, reverse) {
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      return new src_Iterator__Iterator(function()  {
	        var step = iterator.next();
	        if (step.done) {
	          return step;
	        }
	        var entry = step.value;
	        var key = entry[0];
	        return iteratorValue(
	          type,
	          key,
	          mapper.call(context, entry[1], key, iterable),
	          step
	        );
	      });
	    }
	    return mappedSequence;
	  }


	  function reverseFactory(iterable, useKeys) {
	    var reversedSequence = makeSequence(iterable);
	    reversedSequence._iter = iterable;
	    reversedSequence.size = iterable.size;
	    reversedSequence.reverse = function()  {return iterable};
	    if (iterable.flip) {
	      reversedSequence.flip = function () {
	        var flipSequence = flipFactory(iterable);
	        flipSequence.reverse = function()  {return iterable.flip()};
	        return flipSequence;
	      };
	    }
	    reversedSequence.get = function(key, notSetValue) 
	      {return iterable.get(useKeys ? key : -1 - key, notSetValue)};
	    reversedSequence.has = function(key )
	      {return iterable.has(useKeys ? key : -1 - key)};
	    reversedSequence.includes = function(value ) {return iterable.includes(value)};
	    reversedSequence.cacheResult = cacheResultThrough;
	    reversedSequence.__iterate = function (fn, reverse) {var this$0 = this;
	      return iterable.__iterate(function(v, k)  {return fn(v, k, this$0)}, !reverse);
	    };
	    reversedSequence.__iterator =
	      function(type, reverse)  {return iterable.__iterator(type, !reverse)};
	    return reversedSequence;
	  }


	  function filterFactory(iterable, predicate, context, useKeys) {
	    var filterSequence = makeSequence(iterable);
	    if (useKeys) {
	      filterSequence.has = function(key ) {
	        var v = iterable.get(key, NOT_SET);
	        return v !== NOT_SET && !!predicate.call(context, v, key, iterable);
	      };
	      filterSequence.get = function(key, notSetValue)  {
	        var v = iterable.get(key, NOT_SET);
	        return v !== NOT_SET && predicate.call(context, v, key, iterable) ?
	          v : notSetValue;
	      };
	    }
	    filterSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
	      var iterations = 0;
	      iterable.__iterate(function(v, k, c)  {
	        if (predicate.call(context, v, k, c)) {
	          iterations++;
	          return fn(v, useKeys ? k : iterations - 1, this$0);
	        }
	      }, reverse);
	      return iterations;
	    };
	    filterSequence.__iteratorUncached = function (type, reverse) {
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      var iterations = 0;
	      return new src_Iterator__Iterator(function()  {
	        while (true) {
	          var step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	          var entry = step.value;
	          var key = entry[0];
	          var value = entry[1];
	          if (predicate.call(context, value, key, iterable)) {
	            return iteratorValue(type, useKeys ? key : iterations++, value, step);
	          }
	        }
	      });
	    }
	    return filterSequence;
	  }


	  function countByFactory(iterable, grouper, context) {
	    var groups = src_Map__Map().asMutable();
	    iterable.__iterate(function(v, k)  {
	      groups.update(
	        grouper.call(context, v, k, iterable),
	        0,
	        function(a ) {return a + 1}
	      );
	    });
	    return groups.asImmutable();
	  }


	  function groupByFactory(iterable, grouper, context) {
	    var isKeyedIter = isKeyed(iterable);
	    var groups = (isOrdered(iterable) ? OrderedMap() : src_Map__Map()).asMutable();
	    iterable.__iterate(function(v, k)  {
	      groups.update(
	        grouper.call(context, v, k, iterable),
	        function(a ) {return (a = a || [], a.push(isKeyedIter ? [k, v] : v), a)}
	      );
	    });
	    var coerce = iterableClass(iterable);
	    return groups.map(function(arr ) {return reify(iterable, coerce(arr))});
	  }


	  function sliceFactory(iterable, begin, end, useKeys) {
	    var originalSize = iterable.size;

	    // Sanitize begin & end using this shorthand for ToInt32(argument)
	    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
	    if (begin !== undefined) {
	      begin = begin | 0;
	    }
	    if (end !== undefined) {
	      end = end | 0;
	    }

	    if (wholeSlice(begin, end, originalSize)) {
	      return iterable;
	    }

	    var resolvedBegin = resolveBegin(begin, originalSize);
	    var resolvedEnd = resolveEnd(end, originalSize);

	    // begin or end will be NaN if they were provided as negative numbers and
	    // this iterable's size is unknown. In that case, cache first so there is
	    // a known size and these do not resolve to NaN.
	    if (resolvedBegin !== resolvedBegin || resolvedEnd !== resolvedEnd) {
	      return sliceFactory(iterable.toSeq().cacheResult(), begin, end, useKeys);
	    }

	    // Note: resolvedEnd is undefined when the original sequence's length is
	    // unknown and this slice did not supply an end and should contain all
	    // elements after resolvedBegin.
	    // In that case, resolvedSize will be NaN and sliceSize will remain undefined.
	    var resolvedSize = resolvedEnd - resolvedBegin;
	    var sliceSize;
	    if (resolvedSize === resolvedSize) {
	      sliceSize = resolvedSize < 0 ? 0 : resolvedSize;
	    }

	    var sliceSeq = makeSequence(iterable);

	    // If iterable.size is undefined, the size of the realized sliceSeq is
	    // unknown at this point unless the number of items to slice is 0
	    sliceSeq.size = sliceSize === 0 ? sliceSize : iterable.size && sliceSize || undefined;

	    if (!useKeys && isSeq(iterable) && sliceSize >= 0) {
	      sliceSeq.get = function (index, notSetValue) {
	        index = wrapIndex(this, index);
	        return index >= 0 && index < sliceSize ?
	          iterable.get(index + resolvedBegin, notSetValue) :
	          notSetValue;
	      }
	    }

	    sliceSeq.__iterateUncached = function(fn, reverse) {var this$0 = this;
	      if (sliceSize === 0) {
	        return 0;
	      }
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var skipped = 0;
	      var isSkipping = true;
	      var iterations = 0;
	      iterable.__iterate(function(v, k)  {
	        if (!(isSkipping && (isSkipping = skipped++ < resolvedBegin))) {
	          iterations++;
	          return fn(v, useKeys ? k : iterations - 1, this$0) !== false &&
	                 iterations !== sliceSize;
	        }
	      });
	      return iterations;
	    };

	    sliceSeq.__iteratorUncached = function(type, reverse) {
	      if (sliceSize !== 0 && reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      // Don't bother instantiating parent iterator if taking 0.
	      var iterator = sliceSize !== 0 && iterable.__iterator(type, reverse);
	      var skipped = 0;
	      var iterations = 0;
	      return new src_Iterator__Iterator(function()  {
	        while (skipped++ < resolvedBegin) {
	          iterator.next();
	        }
	        if (++iterations > sliceSize) {
	          return iteratorDone();
	        }
	        var step = iterator.next();
	        if (useKeys || type === ITERATE_VALUES) {
	          return step;
	        } else if (type === ITERATE_KEYS) {
	          return iteratorValue(type, iterations - 1, undefined, step);
	        } else {
	          return iteratorValue(type, iterations - 1, step.value[1], step);
	        }
	      });
	    }

	    return sliceSeq;
	  }


	  function takeWhileFactory(iterable, predicate, context) {
	    var takeSequence = makeSequence(iterable);
	    takeSequence.__iterateUncached = function(fn, reverse) {var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var iterations = 0;
	      iterable.__iterate(function(v, k, c) 
	        {return predicate.call(context, v, k, c) && ++iterations && fn(v, k, this$0)}
	      );
	      return iterations;
	    };
	    takeSequence.__iteratorUncached = function(type, reverse) {var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      var iterating = true;
	      return new src_Iterator__Iterator(function()  {
	        if (!iterating) {
	          return iteratorDone();
	        }
	        var step = iterator.next();
	        if (step.done) {
	          return step;
	        }
	        var entry = step.value;
	        var k = entry[0];
	        var v = entry[1];
	        if (!predicate.call(context, v, k, this$0)) {
	          iterating = false;
	          return iteratorDone();
	        }
	        return type === ITERATE_ENTRIES ? step :
	          iteratorValue(type, k, v, step);
	      });
	    };
	    return takeSequence;
	  }


	  function skipWhileFactory(iterable, predicate, context, useKeys) {
	    var skipSequence = makeSequence(iterable);
	    skipSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var isSkipping = true;
	      var iterations = 0;
	      iterable.__iterate(function(v, k, c)  {
	        if (!(isSkipping && (isSkipping = predicate.call(context, v, k, c)))) {
	          iterations++;
	          return fn(v, useKeys ? k : iterations - 1, this$0);
	        }
	      });
	      return iterations;
	    };
	    skipSequence.__iteratorUncached = function(type, reverse) {var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      var skipping = true;
	      var iterations = 0;
	      return new src_Iterator__Iterator(function()  {
	        var step, k, v;
	        do {
	          step = iterator.next();
	          if (step.done) {
	            if (useKeys || type === ITERATE_VALUES) {
	              return step;
	            } else if (type === ITERATE_KEYS) {
	              return iteratorValue(type, iterations++, undefined, step);
	            } else {
	              return iteratorValue(type, iterations++, step.value[1], step);
	            }
	          }
	          var entry = step.value;
	          k = entry[0];
	          v = entry[1];
	          skipping && (skipping = predicate.call(context, v, k, this$0));
	        } while (skipping);
	        return type === ITERATE_ENTRIES ? step :
	          iteratorValue(type, k, v, step);
	      });
	    };
	    return skipSequence;
	  }


	  function concatFactory(iterable, values) {
	    var isKeyedIterable = isKeyed(iterable);
	    var iters = [iterable].concat(values).map(function(v ) {
	      if (!isIterable(v)) {
	        v = isKeyedIterable ?
	          keyedSeqFromValue(v) :
	          indexedSeqFromValue(Array.isArray(v) ? v : [v]);
	      } else if (isKeyedIterable) {
	        v = KeyedIterable(v);
	      }
	      return v;
	    }).filter(function(v ) {return v.size !== 0});

	    if (iters.length === 0) {
	      return iterable;
	    }

	    if (iters.length === 1) {
	      var singleton = iters[0];
	      if (singleton === iterable ||
	          isKeyedIterable && isKeyed(singleton) ||
	          isIndexed(iterable) && isIndexed(singleton)) {
	        return singleton;
	      }
	    }

	    var concatSeq = new ArraySeq(iters);
	    if (isKeyedIterable) {
	      concatSeq = concatSeq.toKeyedSeq();
	    } else if (!isIndexed(iterable)) {
	      concatSeq = concatSeq.toSetSeq();
	    }
	    concatSeq = concatSeq.flatten(true);
	    concatSeq.size = iters.reduce(
	      function(sum, seq)  {
	        if (sum !== undefined) {
	          var size = seq.size;
	          if (size !== undefined) {
	            return sum + size;
	          }
	        }
	      },
	      0
	    );
	    return concatSeq;
	  }


	  function flattenFactory(iterable, depth, useKeys) {
	    var flatSequence = makeSequence(iterable);
	    flatSequence.__iterateUncached = function(fn, reverse) {
	      var iterations = 0;
	      var stopped = false;
	      function flatDeep(iter, currentDepth) {var this$0 = this;
	        iter.__iterate(function(v, k)  {
	          if ((!depth || currentDepth < depth) && isIterable(v)) {
	            flatDeep(v, currentDepth + 1);
	          } else if (fn(v, useKeys ? k : iterations++, this$0) === false) {
	            stopped = true;
	          }
	          return !stopped;
	        }, reverse);
	      }
	      flatDeep(iterable, 0);
	      return iterations;
	    }
	    flatSequence.__iteratorUncached = function(type, reverse) {
	      var iterator = iterable.__iterator(type, reverse);
	      var stack = [];
	      var iterations = 0;
	      return new src_Iterator__Iterator(function()  {
	        while (iterator) {
	          var step = iterator.next();
	          if (step.done !== false) {
	            iterator = stack.pop();
	            continue;
	          }
	          var v = step.value;
	          if (type === ITERATE_ENTRIES) {
	            v = v[1];
	          }
	          if ((!depth || stack.length < depth) && isIterable(v)) {
	            stack.push(iterator);
	            iterator = v.__iterator(type, reverse);
	          } else {
	            return useKeys ? step : iteratorValue(type, iterations++, v, step);
	          }
	        }
	        return iteratorDone();
	      });
	    }
	    return flatSequence;
	  }


	  function flatMapFactory(iterable, mapper, context) {
	    var coerce = iterableClass(iterable);
	    return iterable.toSeq().map(
	      function(v, k)  {return coerce(mapper.call(context, v, k, iterable))}
	    ).flatten(true);
	  }


	  function interposeFactory(iterable, separator) {
	    var interposedSequence = makeSequence(iterable);
	    interposedSequence.size = iterable.size && iterable.size * 2 -1;
	    interposedSequence.__iterateUncached = function(fn, reverse) {var this$0 = this;
	      var iterations = 0;
	      iterable.__iterate(function(v, k) 
	        {return (!iterations || fn(separator, iterations++, this$0) !== false) &&
	        fn(v, iterations++, this$0) !== false},
	        reverse
	      );
	      return iterations;
	    };
	    interposedSequence.__iteratorUncached = function(type, reverse) {
	      var iterator = iterable.__iterator(ITERATE_VALUES, reverse);
	      var iterations = 0;
	      var step;
	      return new src_Iterator__Iterator(function()  {
	        if (!step || iterations % 2) {
	          step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	        }
	        return iterations % 2 ?
	          iteratorValue(type, iterations++, separator) :
	          iteratorValue(type, iterations++, step.value, step);
	      });
	    };
	    return interposedSequence;
	  }


	  function sortFactory(iterable, comparator, mapper) {
	    if (!comparator) {
	      comparator = defaultComparator;
	    }
	    var isKeyedIterable = isKeyed(iterable);
	    var index = 0;
	    var entries = iterable.toSeq().map(
	      function(v, k)  {return [k, v, index++, mapper ? mapper(v, k, iterable) : v]}
	    ).toArray();
	    entries.sort(function(a, b)  {return comparator(a[3], b[3]) || a[2] - b[2]}).forEach(
	      isKeyedIterable ?
	      function(v, i)  { entries[i].length = 2; } :
	      function(v, i)  { entries[i] = v[1]; }
	    );
	    return isKeyedIterable ? KeyedSeq(entries) :
	      isIndexed(iterable) ? IndexedSeq(entries) :
	      SetSeq(entries);
	  }


	  function maxFactory(iterable, comparator, mapper) {
	    if (!comparator) {
	      comparator = defaultComparator;
	    }
	    if (mapper) {
	      var entry = iterable.toSeq()
	        .map(function(v, k)  {return [v, mapper(v, k, iterable)]})
	        .reduce(function(a, b)  {return maxCompare(comparator, a[1], b[1]) ? b : a});
	      return entry && entry[0];
	    } else {
	      return iterable.reduce(function(a, b)  {return maxCompare(comparator, a, b) ? b : a});
	    }
	  }

	  function maxCompare(comparator, a, b) {
	    var comp = comparator(b, a);
	    // b is considered the new max if the comparator declares them equal, but
	    // they are not equal and b is in fact a nullish value.
	    return (comp === 0 && b !== a && (b === undefined || b === null || b !== b)) || comp > 0;
	  }


	  function zipWithFactory(keyIter, zipper, iters) {
	    var zipSequence = makeSequence(keyIter);
	    zipSequence.size = new ArraySeq(iters).map(function(i ) {return i.size}).min();
	    // Note: this a generic base implementation of __iterate in terms of
	    // __iterator which may be more generically useful in the future.
	    zipSequence.__iterate = function(fn, reverse) {
	      /* generic:
	      var iterator = this.__iterator(ITERATE_ENTRIES, reverse);
	      var step;
	      var iterations = 0;
	      while (!(step = iterator.next()).done) {
	        iterations++;
	        if (fn(step.value[1], step.value[0], this) === false) {
	          break;
	        }
	      }
	      return iterations;
	      */
	      // indexed:
	      var iterator = this.__iterator(ITERATE_VALUES, reverse);
	      var step;
	      var iterations = 0;
	      while (!(step = iterator.next()).done) {
	        if (fn(step.value, iterations++, this) === false) {
	          break;
	        }
	      }
	      return iterations;
	    };
	    zipSequence.__iteratorUncached = function(type, reverse) {
	      var iterators = iters.map(function(i )
	        {return (i = Iterable(i), getIterator(reverse ? i.reverse() : i))}
	      );
	      var iterations = 0;
	      var isDone = false;
	      return new src_Iterator__Iterator(function()  {
	        var steps;
	        if (!isDone) {
	          steps = iterators.map(function(i ) {return i.next()});
	          isDone = steps.some(function(s ) {return s.done});
	        }
	        if (isDone) {
	          return iteratorDone();
	        }
	        return iteratorValue(
	          type,
	          iterations++,
	          zipper.apply(null, steps.map(function(s ) {return s.value}))
	        );
	      });
	    };
	    return zipSequence
	  }


	  // #pragma Helper Functions

	  function reify(iter, seq) {
	    return isSeq(iter) ? seq : iter.constructor(seq);
	  }

	  function validateEntry(entry) {
	    if (entry !== Object(entry)) {
	      throw new TypeError('Expected [K, V] tuple: ' + entry);
	    }
	  }

	  function resolveSize(iter) {
	    assertNotInfinite(iter.size);
	    return ensureSize(iter);
	  }

	  function iterableClass(iterable) {
	    return isKeyed(iterable) ? KeyedIterable :
	      isIndexed(iterable) ? IndexedIterable :
	      SetIterable;
	  }

	  function makeSequence(iterable) {
	    return Object.create(
	      (
	        isKeyed(iterable) ? KeyedSeq :
	        isIndexed(iterable) ? IndexedSeq :
	        SetSeq
	      ).prototype
	    );
	  }

	  function cacheResultThrough() {
	    if (this._iter.cacheResult) {
	      this._iter.cacheResult();
	      this.size = this._iter.size;
	      return this;
	    } else {
	      return Seq.prototype.cacheResult.call(this);
	    }
	  }

	  function defaultComparator(a, b) {
	    return a > b ? 1 : a < b ? -1 : 0;
	  }

	  function forceIterator(keyPath) {
	    var iter = getIterator(keyPath);
	    if (!iter) {
	      // Array might not be iterable in this environment, so we need a fallback
	      // to our wrapped type.
	      if (!isArrayLike(keyPath)) {
	        throw new TypeError('Expected iterable or array-like: ' + keyPath);
	      }
	      iter = getIterator(Iterable(keyPath));
	    }
	    return iter;
	  }

	  createClass(src_Map__Map, KeyedCollection);

	    // @pragma Construction

	    function src_Map__Map(value) {
	      return value === null || value === undefined ? emptyMap() :
	        isMap(value) && !isOrdered(value) ? value :
	        emptyMap().withMutations(function(map ) {
	          var iter = KeyedIterable(value);
	          assertNotInfinite(iter.size);
	          iter.forEach(function(v, k)  {return map.set(k, v)});
	        });
	    }

	    src_Map__Map.prototype.toString = function() {
	      return this.__toString('Map {', '}');
	    };

	    // @pragma Access

	    src_Map__Map.prototype.get = function(k, notSetValue) {
	      return this._root ?
	        this._root.get(0, undefined, k, notSetValue) :
	        notSetValue;
	    };

	    // @pragma Modification

	    src_Map__Map.prototype.set = function(k, v) {
	      return updateMap(this, k, v);
	    };

	    src_Map__Map.prototype.setIn = function(keyPath, v) {
	      return this.updateIn(keyPath, NOT_SET, function()  {return v});
	    };

	    src_Map__Map.prototype.remove = function(k) {
	      return updateMap(this, k, NOT_SET);
	    };

	    src_Map__Map.prototype.deleteIn = function(keyPath) {
	      return this.updateIn(keyPath, function()  {return NOT_SET});
	    };

	    src_Map__Map.prototype.update = function(k, notSetValue, updater) {
	      return arguments.length === 1 ?
	        k(this) :
	        this.updateIn([k], notSetValue, updater);
	    };

	    src_Map__Map.prototype.updateIn = function(keyPath, notSetValue, updater) {
	      if (!updater) {
	        updater = notSetValue;
	        notSetValue = undefined;
	      }
	      var updatedValue = updateInDeepMap(
	        this,
	        forceIterator(keyPath),
	        notSetValue,
	        updater
	      );
	      return updatedValue === NOT_SET ? undefined : updatedValue;
	    };

	    src_Map__Map.prototype.clear = function() {
	      if (this.size === 0) {
	        return this;
	      }
	      if (this.__ownerID) {
	        this.size = 0;
	        this._root = null;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return emptyMap();
	    };

	    // @pragma Composition

	    src_Map__Map.prototype.merge = function(/*...iters*/) {
	      return mergeIntoMapWith(this, undefined, arguments);
	    };

	    src_Map__Map.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return mergeIntoMapWith(this, merger, iters);
	    };

	    src_Map__Map.prototype.mergeIn = function(keyPath) {var iters = SLICE$0.call(arguments, 1);
	      return this.updateIn(
	        keyPath,
	        emptyMap(),
	        function(m ) {return typeof m.merge === 'function' ?
	          m.merge.apply(m, iters) :
	          iters[iters.length - 1]}
	      );
	    };

	    src_Map__Map.prototype.mergeDeep = function(/*...iters*/) {
	      return mergeIntoMapWith(this, deepMerger(undefined), arguments);
	    };

	    src_Map__Map.prototype.mergeDeepWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return mergeIntoMapWith(this, deepMerger(merger), iters);
	    };

	    src_Map__Map.prototype.mergeDeepIn = function(keyPath) {var iters = SLICE$0.call(arguments, 1);
	      return this.updateIn(
	        keyPath,
	        emptyMap(),
	        function(m ) {return typeof m.mergeDeep === 'function' ?
	          m.mergeDeep.apply(m, iters) :
	          iters[iters.length - 1]}
	      );
	    };

	    src_Map__Map.prototype.sort = function(comparator) {
	      // Late binding
	      return OrderedMap(sortFactory(this, comparator));
	    };

	    src_Map__Map.prototype.sortBy = function(mapper, comparator) {
	      // Late binding
	      return OrderedMap(sortFactory(this, comparator, mapper));
	    };

	    // @pragma Mutability

	    src_Map__Map.prototype.withMutations = function(fn) {
	      var mutable = this.asMutable();
	      fn(mutable);
	      return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
	    };

	    src_Map__Map.prototype.asMutable = function() {
	      return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
	    };

	    src_Map__Map.prototype.asImmutable = function() {
	      return this.__ensureOwner();
	    };

	    src_Map__Map.prototype.wasAltered = function() {
	      return this.__altered;
	    };

	    src_Map__Map.prototype.__iterator = function(type, reverse) {
	      return new MapIterator(this, type, reverse);
	    };

	    src_Map__Map.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      var iterations = 0;
	      this._root && this._root.iterate(function(entry ) {
	        iterations++;
	        return fn(entry[1], entry[0], this$0);
	      }, reverse);
	      return iterations;
	    };

	    src_Map__Map.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this.__altered = false;
	        return this;
	      }
	      return makeMap(this.size, this._root, ownerID, this.__hash);
	    };


	  function isMap(maybeMap) {
	    return !!(maybeMap && maybeMap[IS_MAP_SENTINEL]);
	  }

	  src_Map__Map.isMap = isMap;

	  var IS_MAP_SENTINEL = '@@__IMMUTABLE_MAP__@@';

	  var MapPrototype = src_Map__Map.prototype;
	  MapPrototype[IS_MAP_SENTINEL] = true;
	  MapPrototype[DELETE] = MapPrototype.remove;
	  MapPrototype.removeIn = MapPrototype.deleteIn;


	  // #pragma Trie Nodes



	    function ArrayMapNode(ownerID, entries) {
	      this.ownerID = ownerID;
	      this.entries = entries;
	    }

	    ArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      var entries = this.entries;
	      for (var ii = 0, len = entries.length; ii < len; ii++) {
	        if (is(key, entries[ii][0])) {
	          return entries[ii][1];
	        }
	      }
	      return notSetValue;
	    };

	    ArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      var removed = value === NOT_SET;

	      var entries = this.entries;
	      var idx = 0;
	      for (var len = entries.length; idx < len; idx++) {
	        if (is(key, entries[idx][0])) {
	          break;
	        }
	      }
	      var exists = idx < len;

	      if (exists ? entries[idx][1] === value : removed) {
	        return this;
	      }

	      SetRef(didAlter);
	      (removed || !exists) && SetRef(didChangeSize);

	      if (removed && entries.length === 1) {
	        return; // undefined
	      }

	      if (!exists && !removed && entries.length >= MAX_ARRAY_MAP_SIZE) {
	        return createNodes(ownerID, entries, key, value);
	      }

	      var isEditable = ownerID && ownerID === this.ownerID;
	      var newEntries = isEditable ? entries : arrCopy(entries);

	      if (exists) {
	        if (removed) {
	          idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());
	        } else {
	          newEntries[idx] = [key, value];
	        }
	      } else {
	        newEntries.push([key, value]);
	      }

	      if (isEditable) {
	        this.entries = newEntries;
	        return this;
	      }

	      return new ArrayMapNode(ownerID, newEntries);
	    };




	    function BitmapIndexedNode(ownerID, bitmap, nodes) {
	      this.ownerID = ownerID;
	      this.bitmap = bitmap;
	      this.nodes = nodes;
	    }

	    BitmapIndexedNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }
	      var bit = (1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK));
	      var bitmap = this.bitmap;
	      return (bitmap & bit) === 0 ? notSetValue :
	        this.nodes[popCount(bitmap & (bit - 1))].get(shift + SHIFT, keyHash, key, notSetValue);
	    };

	    BitmapIndexedNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }
	      var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	      var bit = 1 << keyHashFrag;
	      var bitmap = this.bitmap;
	      var exists = (bitmap & bit) !== 0;

	      if (!exists && value === NOT_SET) {
	        return this;
	      }

	      var idx = popCount(bitmap & (bit - 1));
	      var nodes = this.nodes;
	      var node = exists ? nodes[idx] : undefined;
	      var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);

	      if (newNode === node) {
	        return this;
	      }

	      if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {
	        return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);
	      }

	      if (exists && !newNode && nodes.length === 2 && isLeafNode(nodes[idx ^ 1])) {
	        return nodes[idx ^ 1];
	      }

	      if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {
	        return newNode;
	      }

	      var isEditable = ownerID && ownerID === this.ownerID;
	      var newBitmap = exists ? newNode ? bitmap : bitmap ^ bit : bitmap | bit;
	      var newNodes = exists ? newNode ?
	        setIn(nodes, idx, newNode, isEditable) :
	        spliceOut(nodes, idx, isEditable) :
	        spliceIn(nodes, idx, newNode, isEditable);

	      if (isEditable) {
	        this.bitmap = newBitmap;
	        this.nodes = newNodes;
	        return this;
	      }

	      return new BitmapIndexedNode(ownerID, newBitmap, newNodes);
	    };




	    function HashArrayMapNode(ownerID, count, nodes) {
	      this.ownerID = ownerID;
	      this.count = count;
	      this.nodes = nodes;
	    }

	    HashArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }
	      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	      var node = this.nodes[idx];
	      return node ? node.get(shift + SHIFT, keyHash, key, notSetValue) : notSetValue;
	    };

	    HashArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }
	      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	      var removed = value === NOT_SET;
	      var nodes = this.nodes;
	      var node = nodes[idx];

	      if (removed && !node) {
	        return this;
	      }

	      var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);
	      if (newNode === node) {
	        return this;
	      }

	      var newCount = this.count;
	      if (!node) {
	        newCount++;
	      } else if (!newNode) {
	        newCount--;
	        if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {
	          return packNodes(ownerID, nodes, newCount, idx);
	        }
	      }

	      var isEditable = ownerID && ownerID === this.ownerID;
	      var newNodes = setIn(nodes, idx, newNode, isEditable);

	      if (isEditable) {
	        this.count = newCount;
	        this.nodes = newNodes;
	        return this;
	      }

	      return new HashArrayMapNode(ownerID, newCount, newNodes);
	    };




	    function HashCollisionNode(ownerID, keyHash, entries) {
	      this.ownerID = ownerID;
	      this.keyHash = keyHash;
	      this.entries = entries;
	    }

	    HashCollisionNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      var entries = this.entries;
	      for (var ii = 0, len = entries.length; ii < len; ii++) {
	        if (is(key, entries[ii][0])) {
	          return entries[ii][1];
	        }
	      }
	      return notSetValue;
	    };

	    HashCollisionNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }

	      var removed = value === NOT_SET;

	      if (keyHash !== this.keyHash) {
	        if (removed) {
	          return this;
	        }
	        SetRef(didAlter);
	        SetRef(didChangeSize);
	        return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);
	      }

	      var entries = this.entries;
	      var idx = 0;
	      for (var len = entries.length; idx < len; idx++) {
	        if (is(key, entries[idx][0])) {
	          break;
	        }
	      }
	      var exists = idx < len;

	      if (exists ? entries[idx][1] === value : removed) {
	        return this;
	      }

	      SetRef(didAlter);
	      (removed || !exists) && SetRef(didChangeSize);

	      if (removed && len === 2) {
	        return new ValueNode(ownerID, this.keyHash, entries[idx ^ 1]);
	      }

	      var isEditable = ownerID && ownerID === this.ownerID;
	      var newEntries = isEditable ? entries : arrCopy(entries);

	      if (exists) {
	        if (removed) {
	          idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());
	        } else {
	          newEntries[idx] = [key, value];
	        }
	      } else {
	        newEntries.push([key, value]);
	      }

	      if (isEditable) {
	        this.entries = newEntries;
	        return this;
	      }

	      return new HashCollisionNode(ownerID, this.keyHash, newEntries);
	    };




	    function ValueNode(ownerID, keyHash, entry) {
	      this.ownerID = ownerID;
	      this.keyHash = keyHash;
	      this.entry = entry;
	    }

	    ValueNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
	    };

	    ValueNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      var removed = value === NOT_SET;
	      var keyMatch = is(key, this.entry[0]);
	      if (keyMatch ? value === this.entry[1] : removed) {
	        return this;
	      }

	      SetRef(didAlter);

	      if (removed) {
	        SetRef(didChangeSize);
	        return; // undefined
	      }

	      if (keyMatch) {
	        if (ownerID && ownerID === this.ownerID) {
	          this.entry[1] = value;
	          return this;
	        }
	        return new ValueNode(ownerID, this.keyHash, [key, value]);
	      }

	      SetRef(didChangeSize);
	      return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
	    };



	  // #pragma Iterators

	  ArrayMapNode.prototype.iterate =
	  HashCollisionNode.prototype.iterate = function (fn, reverse) {
	    var entries = this.entries;
	    for (var ii = 0, maxIndex = entries.length - 1; ii <= maxIndex; ii++) {
	      if (fn(entries[reverse ? maxIndex - ii : ii]) === false) {
	        return false;
	      }
	    }
	  }

	  BitmapIndexedNode.prototype.iterate =
	  HashArrayMapNode.prototype.iterate = function (fn, reverse) {
	    var nodes = this.nodes;
	    for (var ii = 0, maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {
	      var node = nodes[reverse ? maxIndex - ii : ii];
	      if (node && node.iterate(fn, reverse) === false) {
	        return false;
	      }
	    }
	  }

	  ValueNode.prototype.iterate = function (fn, reverse) {
	    return fn(this.entry);
	  }

	  createClass(MapIterator, src_Iterator__Iterator);

	    function MapIterator(map, type, reverse) {
	      this._type = type;
	      this._reverse = reverse;
	      this._stack = map._root && mapIteratorFrame(map._root);
	    }

	    MapIterator.prototype.next = function() {
	      var type = this._type;
	      var stack = this._stack;
	      while (stack) {
	        var node = stack.node;
	        var index = stack.index++;
	        var maxIndex;
	        if (node.entry) {
	          if (index === 0) {
	            return mapIteratorValue(type, node.entry);
	          }
	        } else if (node.entries) {
	          maxIndex = node.entries.length - 1;
	          if (index <= maxIndex) {
	            return mapIteratorValue(type, node.entries[this._reverse ? maxIndex - index : index]);
	          }
	        } else {
	          maxIndex = node.nodes.length - 1;
	          if (index <= maxIndex) {
	            var subNode = node.nodes[this._reverse ? maxIndex - index : index];
	            if (subNode) {
	              if (subNode.entry) {
	                return mapIteratorValue(type, subNode.entry);
	              }
	              stack = this._stack = mapIteratorFrame(subNode, stack);
	            }
	            continue;
	          }
	        }
	        stack = this._stack = this._stack.__prev;
	      }
	      return iteratorDone();
	    };


	  function mapIteratorValue(type, entry) {
	    return iteratorValue(type, entry[0], entry[1]);
	  }

	  function mapIteratorFrame(node, prev) {
	    return {
	      node: node,
	      index: 0,
	      __prev: prev
	    };
	  }

	  function makeMap(size, root, ownerID, hash) {
	    var map = Object.create(MapPrototype);
	    map.size = size;
	    map._root = root;
	    map.__ownerID = ownerID;
	    map.__hash = hash;
	    map.__altered = false;
	    return map;
	  }

	  var EMPTY_MAP;
	  function emptyMap() {
	    return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
	  }

	  function updateMap(map, k, v) {
	    var newRoot;
	    var newSize;
	    if (!map._root) {
	      if (v === NOT_SET) {
	        return map;
	      }
	      newSize = 1;
	      newRoot = new ArrayMapNode(map.__ownerID, [[k, v]]);
	    } else {
	      var didChangeSize = MakeRef(CHANGE_LENGTH);
	      var didAlter = MakeRef(DID_ALTER);
	      newRoot = updateNode(map._root, map.__ownerID, 0, undefined, k, v, didChangeSize, didAlter);
	      if (!didAlter.value) {
	        return map;
	      }
	      newSize = map.size + (didChangeSize.value ? v === NOT_SET ? -1 : 1 : 0);
	    }
	    if (map.__ownerID) {
	      map.size = newSize;
	      map._root = newRoot;
	      map.__hash = undefined;
	      map.__altered = true;
	      return map;
	    }
	    return newRoot ? makeMap(newSize, newRoot) : emptyMap();
	  }

	  function updateNode(node, ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	    if (!node) {
	      if (value === NOT_SET) {
	        return node;
	      }
	      SetRef(didAlter);
	      SetRef(didChangeSize);
	      return new ValueNode(ownerID, keyHash, [key, value]);
	    }
	    return node.update(ownerID, shift, keyHash, key, value, didChangeSize, didAlter);
	  }

	  function isLeafNode(node) {
	    return node.constructor === ValueNode || node.constructor === HashCollisionNode;
	  }

	  function mergeIntoNode(node, ownerID, shift, keyHash, entry) {
	    if (node.keyHash === keyHash) {
	      return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);
	    }

	    var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;
	    var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;

	    var newNode;
	    var nodes = idx1 === idx2 ?
	      [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)] :
	      ((newNode = new ValueNode(ownerID, keyHash, entry)), idx1 < idx2 ? [node, newNode] : [newNode, node]);

	    return new BitmapIndexedNode(ownerID, (1 << idx1) | (1 << idx2), nodes);
	  }

	  function createNodes(ownerID, entries, key, value) {
	    if (!ownerID) {
	      ownerID = new OwnerID();
	    }
	    var node = new ValueNode(ownerID, hash(key), [key, value]);
	    for (var ii = 0; ii < entries.length; ii++) {
	      var entry = entries[ii];
	      node = node.update(ownerID, 0, undefined, entry[0], entry[1]);
	    }
	    return node;
	  }

	  function packNodes(ownerID, nodes, count, excluding) {
	    var bitmap = 0;
	    var packedII = 0;
	    var packedNodes = new Array(count);
	    for (var ii = 0, bit = 1, len = nodes.length; ii < len; ii++, bit <<= 1) {
	      var node = nodes[ii];
	      if (node !== undefined && ii !== excluding) {
	        bitmap |= bit;
	        packedNodes[packedII++] = node;
	      }
	    }
	    return new BitmapIndexedNode(ownerID, bitmap, packedNodes);
	  }

	  function expandNodes(ownerID, nodes, bitmap, including, node) {
	    var count = 0;
	    var expandedNodes = new Array(SIZE);
	    for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
	      expandedNodes[ii] = bitmap & 1 ? nodes[count++] : undefined;
	    }
	    expandedNodes[including] = node;
	    return new HashArrayMapNode(ownerID, count + 1, expandedNodes);
	  }

	  function mergeIntoMapWith(map, merger, iterables) {
	    var iters = [];
	    for (var ii = 0; ii < iterables.length; ii++) {
	      var value = iterables[ii];
	      var iter = KeyedIterable(value);
	      if (!isIterable(value)) {
	        iter = iter.map(function(v ) {return fromJS(v)});
	      }
	      iters.push(iter);
	    }
	    return mergeIntoCollectionWith(map, merger, iters);
	  }

	  function deepMerger(merger) {
	    return function(existing, value, key) 
	      {return existing && existing.mergeDeepWith && isIterable(value) ?
	        existing.mergeDeepWith(merger, value) :
	        merger ? merger(existing, value, key) : value};
	  }

	  function mergeIntoCollectionWith(collection, merger, iters) {
	    iters = iters.filter(function(x ) {return x.size !== 0});
	    if (iters.length === 0) {
	      return collection;
	    }
	    if (collection.size === 0 && !collection.__ownerID && iters.length === 1) {
	      return collection.constructor(iters[0]);
	    }
	    return collection.withMutations(function(collection ) {
	      var mergeIntoMap = merger ?
	        function(value, key)  {
	          collection.update(key, NOT_SET, function(existing )
	            {return existing === NOT_SET ? value : merger(existing, value, key)}
	          );
	        } :
	        function(value, key)  {
	          collection.set(key, value);
	        }
	      for (var ii = 0; ii < iters.length; ii++) {
	        iters[ii].forEach(mergeIntoMap);
	      }
	    });
	  }

	  function updateInDeepMap(existing, keyPathIter, notSetValue, updater) {
	    var isNotSet = existing === NOT_SET;
	    var step = keyPathIter.next();
	    if (step.done) {
	      var existingValue = isNotSet ? notSetValue : existing;
	      var newValue = updater(existingValue);
	      return newValue === existingValue ? existing : newValue;
	    }
	    invariant(
	      isNotSet || (existing && existing.set),
	      'invalid keyPath'
	    );
	    var key = step.value;
	    var nextExisting = isNotSet ? NOT_SET : existing.get(key, NOT_SET);
	    var nextUpdated = updateInDeepMap(
	      nextExisting,
	      keyPathIter,
	      notSetValue,
	      updater
	    );
	    return nextUpdated === nextExisting ? existing :
	      nextUpdated === NOT_SET ? existing.remove(key) :
	      (isNotSet ? emptyMap() : existing).set(key, nextUpdated);
	  }

	  function popCount(x) {
	    x = x - ((x >> 1) & 0x55555555);
	    x = (x & 0x33333333) + ((x >> 2) & 0x33333333);
	    x = (x + (x >> 4)) & 0x0f0f0f0f;
	    x = x + (x >> 8);
	    x = x + (x >> 16);
	    return x & 0x7f;
	  }

	  function setIn(array, idx, val, canEdit) {
	    var newArray = canEdit ? array : arrCopy(array);
	    newArray[idx] = val;
	    return newArray;
	  }

	  function spliceIn(array, idx, val, canEdit) {
	    var newLen = array.length + 1;
	    if (canEdit && idx + 1 === newLen) {
	      array[idx] = val;
	      return array;
	    }
	    var newArray = new Array(newLen);
	    var after = 0;
	    for (var ii = 0; ii < newLen; ii++) {
	      if (ii === idx) {
	        newArray[ii] = val;
	        after = -1;
	      } else {
	        newArray[ii] = array[ii + after];
	      }
	    }
	    return newArray;
	  }

	  function spliceOut(array, idx, canEdit) {
	    var newLen = array.length - 1;
	    if (canEdit && idx === newLen) {
	      array.pop();
	      return array;
	    }
	    var newArray = new Array(newLen);
	    var after = 0;
	    for (var ii = 0; ii < newLen; ii++) {
	      if (ii === idx) {
	        after = 1;
	      }
	      newArray[ii] = array[ii + after];
	    }
	    return newArray;
	  }

	  var MAX_ARRAY_MAP_SIZE = SIZE / 4;
	  var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
	  var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;

	  createClass(List, IndexedCollection);

	    // @pragma Construction

	    function List(value) {
	      var empty = emptyList();
	      if (value === null || value === undefined) {
	        return empty;
	      }
	      if (isList(value)) {
	        return value;
	      }
	      var iter = IndexedIterable(value);
	      var size = iter.size;
	      if (size === 0) {
	        return empty;
	      }
	      assertNotInfinite(size);
	      if (size > 0 && size < SIZE) {
	        return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));
	      }
	      return empty.withMutations(function(list ) {
	        list.setSize(size);
	        iter.forEach(function(v, i)  {return list.set(i, v)});
	      });
	    }

	    List.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    List.prototype.toString = function() {
	      return this.__toString('List [', ']');
	    };

	    // @pragma Access

	    List.prototype.get = function(index, notSetValue) {
	      index = wrapIndex(this, index);
	      if (index >= 0 && index < this.size) {
	        index += this._origin;
	        var node = listNodeFor(this, index);
	        return node && node.array[index & MASK];
	      }
	      return notSetValue;
	    };

	    // @pragma Modification

	    List.prototype.set = function(index, value) {
	      return updateList(this, index, value);
	    };

	    List.prototype.remove = function(index) {
	      return !this.has(index) ? this :
	        index === 0 ? this.shift() :
	        index === this.size - 1 ? this.pop() :
	        this.splice(index, 1);
	    };

	    List.prototype.clear = function() {
	      if (this.size === 0) {
	        return this;
	      }
	      if (this.__ownerID) {
	        this.size = this._origin = this._capacity = 0;
	        this._level = SHIFT;
	        this._root = this._tail = null;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return emptyList();
	    };

	    List.prototype.push = function(/*...values*/) {
	      var values = arguments;
	      var oldSize = this.size;
	      return this.withMutations(function(list ) {
	        setListBounds(list, 0, oldSize + values.length);
	        for (var ii = 0; ii < values.length; ii++) {
	          list.set(oldSize + ii, values[ii]);
	        }
	      });
	    };

	    List.prototype.pop = function() {
	      return setListBounds(this, 0, -1);
	    };

	    List.prototype.unshift = function(/*...values*/) {
	      var values = arguments;
	      return this.withMutations(function(list ) {
	        setListBounds(list, -values.length);
	        for (var ii = 0; ii < values.length; ii++) {
	          list.set(ii, values[ii]);
	        }
	      });
	    };

	    List.prototype.shift = function() {
	      return setListBounds(this, 1);
	    };

	    // @pragma Composition

	    List.prototype.merge = function(/*...iters*/) {
	      return mergeIntoListWith(this, undefined, arguments);
	    };

	    List.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return mergeIntoListWith(this, merger, iters);
	    };

	    List.prototype.mergeDeep = function(/*...iters*/) {
	      return mergeIntoListWith(this, deepMerger(undefined), arguments);
	    };

	    List.prototype.mergeDeepWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return mergeIntoListWith(this, deepMerger(merger), iters);
	    };

	    List.prototype.setSize = function(size) {
	      return setListBounds(this, 0, size);
	    };

	    // @pragma Iteration

	    List.prototype.slice = function(begin, end) {
	      var size = this.size;
	      if (wholeSlice(begin, end, size)) {
	        return this;
	      }
	      return setListBounds(
	        this,
	        resolveBegin(begin, size),
	        resolveEnd(end, size)
	      );
	    };

	    List.prototype.__iterator = function(type, reverse) {
	      var index = 0;
	      var values = iterateList(this, reverse);
	      return new src_Iterator__Iterator(function()  {
	        var value = values();
	        return value === DONE ?
	          iteratorDone() :
	          iteratorValue(type, index++, value);
	      });
	    };

	    List.prototype.__iterate = function(fn, reverse) {
	      var index = 0;
	      var values = iterateList(this, reverse);
	      var value;
	      while ((value = values()) !== DONE) {
	        if (fn(value, index++, this) === false) {
	          break;
	        }
	      }
	      return index;
	    };

	    List.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        return this;
	      }
	      return makeList(this._origin, this._capacity, this._level, this._root, this._tail, ownerID, this.__hash);
	    };


	  function isList(maybeList) {
	    return !!(maybeList && maybeList[IS_LIST_SENTINEL]);
	  }

	  List.isList = isList;

	  var IS_LIST_SENTINEL = '@@__IMMUTABLE_LIST__@@';

	  var ListPrototype = List.prototype;
	  ListPrototype[IS_LIST_SENTINEL] = true;
	  ListPrototype[DELETE] = ListPrototype.remove;
	  ListPrototype.setIn = MapPrototype.setIn;
	  ListPrototype.deleteIn =
	  ListPrototype.removeIn = MapPrototype.removeIn;
	  ListPrototype.update = MapPrototype.update;
	  ListPrototype.updateIn = MapPrototype.updateIn;
	  ListPrototype.mergeIn = MapPrototype.mergeIn;
	  ListPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
	  ListPrototype.withMutations = MapPrototype.withMutations;
	  ListPrototype.asMutable = MapPrototype.asMutable;
	  ListPrototype.asImmutable = MapPrototype.asImmutable;
	  ListPrototype.wasAltered = MapPrototype.wasAltered;



	    function VNode(array, ownerID) {
	      this.array = array;
	      this.ownerID = ownerID;
	    }

	    // TODO: seems like these methods are very similar

	    VNode.prototype.removeBefore = function(ownerID, level, index) {
	      if (index === level ? 1 << level : 0 || this.array.length === 0) {
	        return this;
	      }
	      var originIndex = (index >>> level) & MASK;
	      if (originIndex >= this.array.length) {
	        return new VNode([], ownerID);
	      }
	      var removingFirst = originIndex === 0;
	      var newChild;
	      if (level > 0) {
	        var oldChild = this.array[originIndex];
	        newChild = oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index);
	        if (newChild === oldChild && removingFirst) {
	          return this;
	        }
	      }
	      if (removingFirst && !newChild) {
	        return this;
	      }
	      var editable = editableVNode(this, ownerID);
	      if (!removingFirst) {
	        for (var ii = 0; ii < originIndex; ii++) {
	          editable.array[ii] = undefined;
	        }
	      }
	      if (newChild) {
	        editable.array[originIndex] = newChild;
	      }
	      return editable;
	    };

	    VNode.prototype.removeAfter = function(ownerID, level, index) {
	      if (index === (level ? 1 << level : 0) || this.array.length === 0) {
	        return this;
	      }
	      var sizeIndex = ((index - 1) >>> level) & MASK;
	      if (sizeIndex >= this.array.length) {
	        return this;
	      }

	      var newChild;
	      if (level > 0) {
	        var oldChild = this.array[sizeIndex];
	        newChild = oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index);
	        if (newChild === oldChild && sizeIndex === this.array.length - 1) {
	          return this;
	        }
	      }

	      var editable = editableVNode(this, ownerID);
	      editable.array.splice(sizeIndex + 1);
	      if (newChild) {
	        editable.array[sizeIndex] = newChild;
	      }
	      return editable;
	    };



	  var DONE = {};

	  function iterateList(list, reverse) {
	    var left = list._origin;
	    var right = list._capacity;
	    var tailPos = getTailOffset(right);
	    var tail = list._tail;

	    return iterateNodeOrLeaf(list._root, list._level, 0);

	    function iterateNodeOrLeaf(node, level, offset) {
	      return level === 0 ?
	        iterateLeaf(node, offset) :
	        iterateNode(node, level, offset);
	    }

	    function iterateLeaf(node, offset) {
	      var array = offset === tailPos ? tail && tail.array : node && node.array;
	      var from = offset > left ? 0 : left - offset;
	      var to = right - offset;
	      if (to > SIZE) {
	        to = SIZE;
	      }
	      return function()  {
	        if (from === to) {
	          return DONE;
	        }
	        var idx = reverse ? --to : from++;
	        return array && array[idx];
	      };
	    }

	    function iterateNode(node, level, offset) {
	      var values;
	      var array = node && node.array;
	      var from = offset > left ? 0 : (left - offset) >> level;
	      var to = ((right - offset) >> level) + 1;
	      if (to > SIZE) {
	        to = SIZE;
	      }
	      return function()  {
	        do {
	          if (values) {
	            var value = values();
	            if (value !== DONE) {
	              return value;
	            }
	            values = null;
	          }
	          if (from === to) {
	            return DONE;
	          }
	          var idx = reverse ? --to : from++;
	          values = iterateNodeOrLeaf(
	            array && array[idx], level - SHIFT, offset + (idx << level)
	          );
	        } while (true);
	      };
	    }
	  }

	  function makeList(origin, capacity, level, root, tail, ownerID, hash) {
	    var list = Object.create(ListPrototype);
	    list.size = capacity - origin;
	    list._origin = origin;
	    list._capacity = capacity;
	    list._level = level;
	    list._root = root;
	    list._tail = tail;
	    list.__ownerID = ownerID;
	    list.__hash = hash;
	    list.__altered = false;
	    return list;
	  }

	  var EMPTY_LIST;
	  function emptyList() {
	    return EMPTY_LIST || (EMPTY_LIST = makeList(0, 0, SHIFT));
	  }

	  function updateList(list, index, value) {
	    index = wrapIndex(list, index);

	    if (index !== index) {
	      return list;
	    }

	    if (index >= list.size || index < 0) {
	      return list.withMutations(function(list ) {
	        index < 0 ?
	          setListBounds(list, index).set(0, value) :
	          setListBounds(list, 0, index + 1).set(index, value)
	      });
	    }

	    index += list._origin;

	    var newTail = list._tail;
	    var newRoot = list._root;
	    var didAlter = MakeRef(DID_ALTER);
	    if (index >= getTailOffset(list._capacity)) {
	      newTail = updateVNode(newTail, list.__ownerID, 0, index, value, didAlter);
	    } else {
	      newRoot = updateVNode(newRoot, list.__ownerID, list._level, index, value, didAlter);
	    }

	    if (!didAlter.value) {
	      return list;
	    }

	    if (list.__ownerID) {
	      list._root = newRoot;
	      list._tail = newTail;
	      list.__hash = undefined;
	      list.__altered = true;
	      return list;
	    }
	    return makeList(list._origin, list._capacity, list._level, newRoot, newTail);
	  }

	  function updateVNode(node, ownerID, level, index, value, didAlter) {
	    var idx = (index >>> level) & MASK;
	    var nodeHas = node && idx < node.array.length;
	    if (!nodeHas && value === undefined) {
	      return node;
	    }

	    var newNode;

	    if (level > 0) {
	      var lowerNode = node && node.array[idx];
	      var newLowerNode = updateVNode(lowerNode, ownerID, level - SHIFT, index, value, didAlter);
	      if (newLowerNode === lowerNode) {
	        return node;
	      }
	      newNode = editableVNode(node, ownerID);
	      newNode.array[idx] = newLowerNode;
	      return newNode;
	    }

	    if (nodeHas && node.array[idx] === value) {
	      return node;
	    }

	    SetRef(didAlter);

	    newNode = editableVNode(node, ownerID);
	    if (value === undefined && idx === newNode.array.length - 1) {
	      newNode.array.pop();
	    } else {
	      newNode.array[idx] = value;
	    }
	    return newNode;
	  }

	  function editableVNode(node, ownerID) {
	    if (ownerID && node && ownerID === node.ownerID) {
	      return node;
	    }
	    return new VNode(node ? node.array.slice() : [], ownerID);
	  }

	  function listNodeFor(list, rawIndex) {
	    if (rawIndex >= getTailOffset(list._capacity)) {
	      return list._tail;
	    }
	    if (rawIndex < 1 << (list._level + SHIFT)) {
	      var node = list._root;
	      var level = list._level;
	      while (node && level > 0) {
	        node = node.array[(rawIndex >>> level) & MASK];
	        level -= SHIFT;
	      }
	      return node;
	    }
	  }

	  function setListBounds(list, begin, end) {
	    // Sanitize begin & end using this shorthand for ToInt32(argument)
	    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
	    if (begin !== undefined) {
	      begin = begin | 0;
	    }
	    if (end !== undefined) {
	      end = end | 0;
	    }
	    var owner = list.__ownerID || new OwnerID();
	    var oldOrigin = list._origin;
	    var oldCapacity = list._capacity;
	    var newOrigin = oldOrigin + begin;
	    var newCapacity = end === undefined ? oldCapacity : end < 0 ? oldCapacity + end : oldOrigin + end;
	    if (newOrigin === oldOrigin && newCapacity === oldCapacity) {
	      return list;
	    }

	    // If it's going to end after it starts, it's empty.
	    if (newOrigin >= newCapacity) {
	      return list.clear();
	    }

	    var newLevel = list._level;
	    var newRoot = list._root;

	    // New origin might need creating a higher root.
	    var offsetShift = 0;
	    while (newOrigin + offsetShift < 0) {
	      newRoot = new VNode(newRoot && newRoot.array.length ? [undefined, newRoot] : [], owner);
	      newLevel += SHIFT;
	      offsetShift += 1 << newLevel;
	    }
	    if (offsetShift) {
	      newOrigin += offsetShift;
	      oldOrigin += offsetShift;
	      newCapacity += offsetShift;
	      oldCapacity += offsetShift;
	    }

	    var oldTailOffset = getTailOffset(oldCapacity);
	    var newTailOffset = getTailOffset(newCapacity);

	    // New size might need creating a higher root.
	    while (newTailOffset >= 1 << (newLevel + SHIFT)) {
	      newRoot = new VNode(newRoot && newRoot.array.length ? [newRoot] : [], owner);
	      newLevel += SHIFT;
	    }

	    // Locate or create the new tail.
	    var oldTail = list._tail;
	    var newTail = newTailOffset < oldTailOffset ?
	      listNodeFor(list, newCapacity - 1) :
	      newTailOffset > oldTailOffset ? new VNode([], owner) : oldTail;

	    // Merge Tail into tree.
	    if (oldTail && newTailOffset > oldTailOffset && newOrigin < oldCapacity && oldTail.array.length) {
	      newRoot = editableVNode(newRoot, owner);
	      var node = newRoot;
	      for (var level = newLevel; level > SHIFT; level -= SHIFT) {
	        var idx = (oldTailOffset >>> level) & MASK;
	        node = node.array[idx] = editableVNode(node.array[idx], owner);
	      }
	      node.array[(oldTailOffset >>> SHIFT) & MASK] = oldTail;
	    }

	    // If the size has been reduced, there's a chance the tail needs to be trimmed.
	    if (newCapacity < oldCapacity) {
	      newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);
	    }

	    // If the new origin is within the tail, then we do not need a root.
	    if (newOrigin >= newTailOffset) {
	      newOrigin -= newTailOffset;
	      newCapacity -= newTailOffset;
	      newLevel = SHIFT;
	      newRoot = null;
	      newTail = newTail && newTail.removeBefore(owner, 0, newOrigin);

	    // Otherwise, if the root has been trimmed, garbage collect.
	    } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {
	      offsetShift = 0;

	      // Identify the new top root node of the subtree of the old root.
	      while (newRoot) {
	        var beginIndex = (newOrigin >>> newLevel) & MASK;
	        if (beginIndex !== (newTailOffset >>> newLevel) & MASK) {
	          break;
	        }
	        if (beginIndex) {
	          offsetShift += (1 << newLevel) * beginIndex;
	        }
	        newLevel -= SHIFT;
	        newRoot = newRoot.array[beginIndex];
	      }

	      // Trim the new sides of the new root.
	      if (newRoot && newOrigin > oldOrigin) {
	        newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);
	      }
	      if (newRoot && newTailOffset < oldTailOffset) {
	        newRoot = newRoot.removeAfter(owner, newLevel, newTailOffset - offsetShift);
	      }
	      if (offsetShift) {
	        newOrigin -= offsetShift;
	        newCapacity -= offsetShift;
	      }
	    }

	    if (list.__ownerID) {
	      list.size = newCapacity - newOrigin;
	      list._origin = newOrigin;
	      list._capacity = newCapacity;
	      list._level = newLevel;
	      list._root = newRoot;
	      list._tail = newTail;
	      list.__hash = undefined;
	      list.__altered = true;
	      return list;
	    }
	    return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);
	  }

	  function mergeIntoListWith(list, merger, iterables) {
	    var iters = [];
	    var maxSize = 0;
	    for (var ii = 0; ii < iterables.length; ii++) {
	      var value = iterables[ii];
	      var iter = IndexedIterable(value);
	      if (iter.size > maxSize) {
	        maxSize = iter.size;
	      }
	      if (!isIterable(value)) {
	        iter = iter.map(function(v ) {return fromJS(v)});
	      }
	      iters.push(iter);
	    }
	    if (maxSize > list.size) {
	      list = list.setSize(maxSize);
	    }
	    return mergeIntoCollectionWith(list, merger, iters);
	  }

	  function getTailOffset(size) {
	    return size < SIZE ? 0 : (((size - 1) >>> SHIFT) << SHIFT);
	  }

	  createClass(OrderedMap, src_Map__Map);

	    // @pragma Construction

	    function OrderedMap(value) {
	      return value === null || value === undefined ? emptyOrderedMap() :
	        isOrderedMap(value) ? value :
	        emptyOrderedMap().withMutations(function(map ) {
	          var iter = KeyedIterable(value);
	          assertNotInfinite(iter.size);
	          iter.forEach(function(v, k)  {return map.set(k, v)});
	        });
	    }

	    OrderedMap.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    OrderedMap.prototype.toString = function() {
	      return this.__toString('OrderedMap {', '}');
	    };

	    // @pragma Access

	    OrderedMap.prototype.get = function(k, notSetValue) {
	      var index = this._map.get(k);
	      return index !== undefined ? this._list.get(index)[1] : notSetValue;
	    };

	    // @pragma Modification

	    OrderedMap.prototype.clear = function() {
	      if (this.size === 0) {
	        return this;
	      }
	      if (this.__ownerID) {
	        this.size = 0;
	        this._map.clear();
	        this._list.clear();
	        return this;
	      }
	      return emptyOrderedMap();
	    };

	    OrderedMap.prototype.set = function(k, v) {
	      return updateOrderedMap(this, k, v);
	    };

	    OrderedMap.prototype.remove = function(k) {
	      return updateOrderedMap(this, k, NOT_SET);
	    };

	    OrderedMap.prototype.wasAltered = function() {
	      return this._map.wasAltered() || this._list.wasAltered();
	    };

	    OrderedMap.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return this._list.__iterate(
	        function(entry ) {return entry && fn(entry[1], entry[0], this$0)},
	        reverse
	      );
	    };

	    OrderedMap.prototype.__iterator = function(type, reverse) {
	      return this._list.fromEntrySeq().__iterator(type, reverse);
	    };

	    OrderedMap.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      var newMap = this._map.__ensureOwner(ownerID);
	      var newList = this._list.__ensureOwner(ownerID);
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this._map = newMap;
	        this._list = newList;
	        return this;
	      }
	      return makeOrderedMap(newMap, newList, ownerID, this.__hash);
	    };


	  function isOrderedMap(maybeOrderedMap) {
	    return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
	  }

	  OrderedMap.isOrderedMap = isOrderedMap;

	  OrderedMap.prototype[IS_ORDERED_SENTINEL] = true;
	  OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;



	  function makeOrderedMap(map, list, ownerID, hash) {
	    var omap = Object.create(OrderedMap.prototype);
	    omap.size = map ? map.size : 0;
	    omap._map = map;
	    omap._list = list;
	    omap.__ownerID = ownerID;
	    omap.__hash = hash;
	    return omap;
	  }

	  var EMPTY_ORDERED_MAP;
	  function emptyOrderedMap() {
	    return EMPTY_ORDERED_MAP || (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()));
	  }

	  function updateOrderedMap(omap, k, v) {
	    var map = omap._map;
	    var list = omap._list;
	    var i = map.get(k);
	    var has = i !== undefined;
	    var newMap;
	    var newList;
	    if (v === NOT_SET) { // removed
	      if (!has) {
	        return omap;
	      }
	      if (list.size >= SIZE && list.size >= map.size * 2) {
	        newList = list.filter(function(entry, idx)  {return entry !== undefined && i !== idx});
	        newMap = newList.toKeyedSeq().map(function(entry ) {return entry[0]}).flip().toMap();
	        if (omap.__ownerID) {
	          newMap.__ownerID = newList.__ownerID = omap.__ownerID;
	        }
	      } else {
	        newMap = map.remove(k);
	        newList = i === list.size - 1 ? list.pop() : list.set(i, undefined);
	      }
	    } else {
	      if (has) {
	        if (v === list.get(i)[1]) {
	          return omap;
	        }
	        newMap = map;
	        newList = list.set(i, [k, v]);
	      } else {
	        newMap = map.set(k, list.size);
	        newList = list.set(list.size, [k, v]);
	      }
	    }
	    if (omap.__ownerID) {
	      omap.size = newMap.size;
	      omap._map = newMap;
	      omap._list = newList;
	      omap.__hash = undefined;
	      return omap;
	    }
	    return makeOrderedMap(newMap, newList);
	  }

	  createClass(Stack, IndexedCollection);

	    // @pragma Construction

	    function Stack(value) {
	      return value === null || value === undefined ? emptyStack() :
	        isStack(value) ? value :
	        emptyStack().unshiftAll(value);
	    }

	    Stack.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    Stack.prototype.toString = function() {
	      return this.__toString('Stack [', ']');
	    };

	    // @pragma Access

	    Stack.prototype.get = function(index, notSetValue) {
	      var head = this._head;
	      index = wrapIndex(this, index);
	      while (head && index--) {
	        head = head.next;
	      }
	      return head ? head.value : notSetValue;
	    };

	    Stack.prototype.peek = function() {
	      return this._head && this._head.value;
	    };

	    // @pragma Modification

	    Stack.prototype.push = function(/*...values*/) {
	      if (arguments.length === 0) {
	        return this;
	      }
	      var newSize = this.size + arguments.length;
	      var head = this._head;
	      for (var ii = arguments.length - 1; ii >= 0; ii--) {
	        head = {
	          value: arguments[ii],
	          next: head
	        };
	      }
	      if (this.__ownerID) {
	        this.size = newSize;
	        this._head = head;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return makeStack(newSize, head);
	    };

	    Stack.prototype.pushAll = function(iter) {
	      iter = IndexedIterable(iter);
	      if (iter.size === 0) {
	        return this;
	      }
	      assertNotInfinite(iter.size);
	      var newSize = this.size;
	      var head = this._head;
	      iter.reverse().forEach(function(value ) {
	        newSize++;
	        head = {
	          value: value,
	          next: head
	        };
	      });
	      if (this.__ownerID) {
	        this.size = newSize;
	        this._head = head;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return makeStack(newSize, head);
	    };

	    Stack.prototype.pop = function() {
	      return this.slice(1);
	    };

	    Stack.prototype.unshift = function(/*...values*/) {
	      return this.push.apply(this, arguments);
	    };

	    Stack.prototype.unshiftAll = function(iter) {
	      return this.pushAll(iter);
	    };

	    Stack.prototype.shift = function() {
	      return this.pop.apply(this, arguments);
	    };

	    Stack.prototype.clear = function() {
	      if (this.size === 0) {
	        return this;
	      }
	      if (this.__ownerID) {
	        this.size = 0;
	        this._head = undefined;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return emptyStack();
	    };

	    Stack.prototype.slice = function(begin, end) {
	      if (wholeSlice(begin, end, this.size)) {
	        return this;
	      }
	      var resolvedBegin = resolveBegin(begin, this.size);
	      var resolvedEnd = resolveEnd(end, this.size);
	      if (resolvedEnd !== this.size) {
	        // super.slice(begin, end);
	        return IndexedCollection.prototype.slice.call(this, begin, end);
	      }
	      var newSize = this.size - resolvedBegin;
	      var head = this._head;
	      while (resolvedBegin--) {
	        head = head.next;
	      }
	      if (this.__ownerID) {
	        this.size = newSize;
	        this._head = head;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return makeStack(newSize, head);
	    };

	    // @pragma Mutability

	    Stack.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this.__altered = false;
	        return this;
	      }
	      return makeStack(this.size, this._head, ownerID, this.__hash);
	    };

	    // @pragma Iteration

	    Stack.prototype.__iterate = function(fn, reverse) {
	      if (reverse) {
	        return this.reverse().__iterate(fn);
	      }
	      var iterations = 0;
	      var node = this._head;
	      while (node) {
	        if (fn(node.value, iterations++, this) === false) {
	          break;
	        }
	        node = node.next;
	      }
	      return iterations;
	    };

	    Stack.prototype.__iterator = function(type, reverse) {
	      if (reverse) {
	        return this.reverse().__iterator(type);
	      }
	      var iterations = 0;
	      var node = this._head;
	      return new src_Iterator__Iterator(function()  {
	        if (node) {
	          var value = node.value;
	          node = node.next;
	          return iteratorValue(type, iterations++, value);
	        }
	        return iteratorDone();
	      });
	    };


	  function isStack(maybeStack) {
	    return !!(maybeStack && maybeStack[IS_STACK_SENTINEL]);
	  }

	  Stack.isStack = isStack;

	  var IS_STACK_SENTINEL = '@@__IMMUTABLE_STACK__@@';

	  var StackPrototype = Stack.prototype;
	  StackPrototype[IS_STACK_SENTINEL] = true;
	  StackPrototype.withMutations = MapPrototype.withMutations;
	  StackPrototype.asMutable = MapPrototype.asMutable;
	  StackPrototype.asImmutable = MapPrototype.asImmutable;
	  StackPrototype.wasAltered = MapPrototype.wasAltered;


	  function makeStack(size, head, ownerID, hash) {
	    var map = Object.create(StackPrototype);
	    map.size = size;
	    map._head = head;
	    map.__ownerID = ownerID;
	    map.__hash = hash;
	    map.__altered = false;
	    return map;
	  }

	  var EMPTY_STACK;
	  function emptyStack() {
	    return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
	  }

	  createClass(src_Set__Set, SetCollection);

	    // @pragma Construction

	    function src_Set__Set(value) {
	      return value === null || value === undefined ? emptySet() :
	        isSet(value) && !isOrdered(value) ? value :
	        emptySet().withMutations(function(set ) {
	          var iter = SetIterable(value);
	          assertNotInfinite(iter.size);
	          iter.forEach(function(v ) {return set.add(v)});
	        });
	    }

	    src_Set__Set.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    src_Set__Set.fromKeys = function(value) {
	      return this(KeyedIterable(value).keySeq());
	    };

	    src_Set__Set.prototype.toString = function() {
	      return this.__toString('Set {', '}');
	    };

	    // @pragma Access

	    src_Set__Set.prototype.has = function(value) {
	      return this._map.has(value);
	    };

	    // @pragma Modification

	    src_Set__Set.prototype.add = function(value) {
	      return updateSet(this, this._map.set(value, true));
	    };

	    src_Set__Set.prototype.remove = function(value) {
	      return updateSet(this, this._map.remove(value));
	    };

	    src_Set__Set.prototype.clear = function() {
	      return updateSet(this, this._map.clear());
	    };

	    // @pragma Composition

	    src_Set__Set.prototype.union = function() {var iters = SLICE$0.call(arguments, 0);
	      iters = iters.filter(function(x ) {return x.size !== 0});
	      if (iters.length === 0) {
	        return this;
	      }
	      if (this.size === 0 && !this.__ownerID && iters.length === 1) {
	        return this.constructor(iters[0]);
	      }
	      return this.withMutations(function(set ) {
	        for (var ii = 0; ii < iters.length; ii++) {
	          SetIterable(iters[ii]).forEach(function(value ) {return set.add(value)});
	        }
	      });
	    };

	    src_Set__Set.prototype.intersect = function() {var iters = SLICE$0.call(arguments, 0);
	      if (iters.length === 0) {
	        return this;
	      }
	      iters = iters.map(function(iter ) {return SetIterable(iter)});
	      var originalSet = this;
	      return this.withMutations(function(set ) {
	        originalSet.forEach(function(value ) {
	          if (!iters.every(function(iter ) {return iter.includes(value)})) {
	            set.remove(value);
	          }
	        });
	      });
	    };

	    src_Set__Set.prototype.subtract = function() {var iters = SLICE$0.call(arguments, 0);
	      if (iters.length === 0) {
	        return this;
	      }
	      iters = iters.map(function(iter ) {return SetIterable(iter)});
	      var originalSet = this;
	      return this.withMutations(function(set ) {
	        originalSet.forEach(function(value ) {
	          if (iters.some(function(iter ) {return iter.includes(value)})) {
	            set.remove(value);
	          }
	        });
	      });
	    };

	    src_Set__Set.prototype.merge = function() {
	      return this.union.apply(this, arguments);
	    };

	    src_Set__Set.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return this.union.apply(this, iters);
	    };

	    src_Set__Set.prototype.sort = function(comparator) {
	      // Late binding
	      return OrderedSet(sortFactory(this, comparator));
	    };

	    src_Set__Set.prototype.sortBy = function(mapper, comparator) {
	      // Late binding
	      return OrderedSet(sortFactory(this, comparator, mapper));
	    };

	    src_Set__Set.prototype.wasAltered = function() {
	      return this._map.wasAltered();
	    };

	    src_Set__Set.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return this._map.__iterate(function(_, k)  {return fn(k, k, this$0)}, reverse);
	    };

	    src_Set__Set.prototype.__iterator = function(type, reverse) {
	      return this._map.map(function(_, k)  {return k}).__iterator(type, reverse);
	    };

	    src_Set__Set.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      var newMap = this._map.__ensureOwner(ownerID);
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this._map = newMap;
	        return this;
	      }
	      return this.__make(newMap, ownerID);
	    };


	  function isSet(maybeSet) {
	    return !!(maybeSet && maybeSet[IS_SET_SENTINEL]);
	  }

	  src_Set__Set.isSet = isSet;

	  var IS_SET_SENTINEL = '@@__IMMUTABLE_SET__@@';

	  var SetPrototype = src_Set__Set.prototype;
	  SetPrototype[IS_SET_SENTINEL] = true;
	  SetPrototype[DELETE] = SetPrototype.remove;
	  SetPrototype.mergeDeep = SetPrototype.merge;
	  SetPrototype.mergeDeepWith = SetPrototype.mergeWith;
	  SetPrototype.withMutations = MapPrototype.withMutations;
	  SetPrototype.asMutable = MapPrototype.asMutable;
	  SetPrototype.asImmutable = MapPrototype.asImmutable;

	  SetPrototype.__empty = emptySet;
	  SetPrototype.__make = makeSet;

	  function updateSet(set, newMap) {
	    if (set.__ownerID) {
	      set.size = newMap.size;
	      set._map = newMap;
	      return set;
	    }
	    return newMap === set._map ? set :
	      newMap.size === 0 ? set.__empty() :
	      set.__make(newMap);
	  }

	  function makeSet(map, ownerID) {
	    var set = Object.create(SetPrototype);
	    set.size = map ? map.size : 0;
	    set._map = map;
	    set.__ownerID = ownerID;
	    return set;
	  }

	  var EMPTY_SET;
	  function emptySet() {
	    return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
	  }

	  createClass(OrderedSet, src_Set__Set);

	    // @pragma Construction

	    function OrderedSet(value) {
	      return value === null || value === undefined ? emptyOrderedSet() :
	        isOrderedSet(value) ? value :
	        emptyOrderedSet().withMutations(function(set ) {
	          var iter = SetIterable(value);
	          assertNotInfinite(iter.size);
	          iter.forEach(function(v ) {return set.add(v)});
	        });
	    }

	    OrderedSet.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    OrderedSet.fromKeys = function(value) {
	      return this(KeyedIterable(value).keySeq());
	    };

	    OrderedSet.prototype.toString = function() {
	      return this.__toString('OrderedSet {', '}');
	    };


	  function isOrderedSet(maybeOrderedSet) {
	    return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
	  }

	  OrderedSet.isOrderedSet = isOrderedSet;

	  var OrderedSetPrototype = OrderedSet.prototype;
	  OrderedSetPrototype[IS_ORDERED_SENTINEL] = true;

	  OrderedSetPrototype.__empty = emptyOrderedSet;
	  OrderedSetPrototype.__make = makeOrderedSet;

	  function makeOrderedSet(map, ownerID) {
	    var set = Object.create(OrderedSetPrototype);
	    set.size = map ? map.size : 0;
	    set._map = map;
	    set.__ownerID = ownerID;
	    return set;
	  }

	  var EMPTY_ORDERED_SET;
	  function emptyOrderedSet() {
	    return EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()));
	  }

	  createClass(Record, KeyedCollection);

	    function Record(defaultValues, name) {
	      var hasInitialized;

	      var RecordType = function Record(values) {
	        if (values instanceof RecordType) {
	          return values;
	        }
	        if (!(this instanceof RecordType)) {
	          return new RecordType(values);
	        }
	        if (!hasInitialized) {
	          hasInitialized = true;
	          var keys = Object.keys(defaultValues);
	          setProps(RecordTypePrototype, keys);
	          RecordTypePrototype.size = keys.length;
	          RecordTypePrototype._name = name;
	          RecordTypePrototype._keys = keys;
	          RecordTypePrototype._defaultValues = defaultValues;
	        }
	        this._map = src_Map__Map(values);
	      };

	      var RecordTypePrototype = RecordType.prototype = Object.create(RecordPrototype);
	      RecordTypePrototype.constructor = RecordType;

	      return RecordType;
	    }

	    Record.prototype.toString = function() {
	      return this.__toString(recordName(this) + ' {', '}');
	    };

	    // @pragma Access

	    Record.prototype.has = function(k) {
	      return this._defaultValues.hasOwnProperty(k);
	    };

	    Record.prototype.get = function(k, notSetValue) {
	      if (!this.has(k)) {
	        return notSetValue;
	      }
	      var defaultVal = this._defaultValues[k];
	      return this._map ? this._map.get(k, defaultVal) : defaultVal;
	    };

	    // @pragma Modification

	    Record.prototype.clear = function() {
	      if (this.__ownerID) {
	        this._map && this._map.clear();
	        return this;
	      }
	      var RecordType = this.constructor;
	      return RecordType._empty || (RecordType._empty = makeRecord(this, emptyMap()));
	    };

	    Record.prototype.set = function(k, v) {
	      if (!this.has(k)) {
	        throw new Error('Cannot set unknown key "' + k + '" on ' + recordName(this));
	      }
	      var newMap = this._map && this._map.set(k, v);
	      if (this.__ownerID || newMap === this._map) {
	        return this;
	      }
	      return makeRecord(this, newMap);
	    };

	    Record.prototype.remove = function(k) {
	      if (!this.has(k)) {
	        return this;
	      }
	      var newMap = this._map && this._map.remove(k);
	      if (this.__ownerID || newMap === this._map) {
	        return this;
	      }
	      return makeRecord(this, newMap);
	    };

	    Record.prototype.wasAltered = function() {
	      return this._map.wasAltered();
	    };

	    Record.prototype.__iterator = function(type, reverse) {var this$0 = this;
	      return KeyedIterable(this._defaultValues).map(function(_, k)  {return this$0.get(k)}).__iterator(type, reverse);
	    };

	    Record.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return KeyedIterable(this._defaultValues).map(function(_, k)  {return this$0.get(k)}).__iterate(fn, reverse);
	    };

	    Record.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      var newMap = this._map && this._map.__ensureOwner(ownerID);
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this._map = newMap;
	        return this;
	      }
	      return makeRecord(this, newMap, ownerID);
	    };


	  var RecordPrototype = Record.prototype;
	  RecordPrototype[DELETE] = RecordPrototype.remove;
	  RecordPrototype.deleteIn =
	  RecordPrototype.removeIn = MapPrototype.removeIn;
	  RecordPrototype.merge = MapPrototype.merge;
	  RecordPrototype.mergeWith = MapPrototype.mergeWith;
	  RecordPrototype.mergeIn = MapPrototype.mergeIn;
	  RecordPrototype.mergeDeep = MapPrototype.mergeDeep;
	  RecordPrototype.mergeDeepWith = MapPrototype.mergeDeepWith;
	  RecordPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
	  RecordPrototype.setIn = MapPrototype.setIn;
	  RecordPrototype.update = MapPrototype.update;
	  RecordPrototype.updateIn = MapPrototype.updateIn;
	  RecordPrototype.withMutations = MapPrototype.withMutations;
	  RecordPrototype.asMutable = MapPrototype.asMutable;
	  RecordPrototype.asImmutable = MapPrototype.asImmutable;


	  function makeRecord(likeRecord, map, ownerID) {
	    var record = Object.create(Object.getPrototypeOf(likeRecord));
	    record._map = map;
	    record.__ownerID = ownerID;
	    return record;
	  }

	  function recordName(record) {
	    return record._name || record.constructor.name || 'Record';
	  }

	  function setProps(prototype, names) {
	    try {
	      names.forEach(setProp.bind(undefined, prototype));
	    } catch (error) {
	      // Object.defineProperty failed. Probably IE8.
	    }
	  }

	  function setProp(prototype, name) {
	    Object.defineProperty(prototype, name, {
	      get: function() {
	        return this.get(name);
	      },
	      set: function(value) {
	        invariant(this.__ownerID, 'Cannot set on an immutable record.');
	        this.set(name, value);
	      }
	    });
	  }

	  function deepEqual(a, b) {
	    if (a === b) {
	      return true;
	    }

	    if (
	      !isIterable(b) ||
	      a.size !== undefined && b.size !== undefined && a.size !== b.size ||
	      a.__hash !== undefined && b.__hash !== undefined && a.__hash !== b.__hash ||
	      isKeyed(a) !== isKeyed(b) ||
	      isIndexed(a) !== isIndexed(b) ||
	      isOrdered(a) !== isOrdered(b)
	    ) {
	      return false;
	    }

	    if (a.size === 0 && b.size === 0) {
	      return true;
	    }

	    var notAssociative = !isAssociative(a);

	    if (isOrdered(a)) {
	      var entries = a.entries();
	      return b.every(function(v, k)  {
	        var entry = entries.next().value;
	        return entry && is(entry[1], v) && (notAssociative || is(entry[0], k));
	      }) && entries.next().done;
	    }

	    var flipped = false;

	    if (a.size === undefined) {
	      if (b.size === undefined) {
	        if (typeof a.cacheResult === 'function') {
	          a.cacheResult();
	        }
	      } else {
	        flipped = true;
	        var _ = a;
	        a = b;
	        b = _;
	      }
	    }

	    var allEqual = true;
	    var bSize = b.__iterate(function(v, k)  {
	      if (notAssociative ? !a.has(v) :
	          flipped ? !is(v, a.get(k, NOT_SET)) : !is(a.get(k, NOT_SET), v)) {
	        allEqual = false;
	        return false;
	      }
	    });

	    return allEqual && a.size === bSize;
	  }

	  createClass(Range, IndexedSeq);

	    function Range(start, end, step) {
	      if (!(this instanceof Range)) {
	        return new Range(start, end, step);
	      }
	      invariant(step !== 0, 'Cannot step a Range by 0');
	      start = start || 0;
	      if (end === undefined) {
	        end = Infinity;
	      }
	      step = step === undefined ? 1 : Math.abs(step);
	      if (end < start) {
	        step = -step;
	      }
	      this._start = start;
	      this._end = end;
	      this._step = step;
	      this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
	      if (this.size === 0) {
	        if (EMPTY_RANGE) {
	          return EMPTY_RANGE;
	        }
	        EMPTY_RANGE = this;
	      }
	    }

	    Range.prototype.toString = function() {
	      if (this.size === 0) {
	        return 'Range []';
	      }
	      return 'Range [ ' +
	        this._start + '...' + this._end +
	        (this._step > 1 ? ' by ' + this._step : '') +
	      ' ]';
	    };

	    Range.prototype.get = function(index, notSetValue) {
	      return this.has(index) ?
	        this._start + wrapIndex(this, index) * this._step :
	        notSetValue;
	    };

	    Range.prototype.includes = function(searchValue) {
	      var possibleIndex = (searchValue - this._start) / this._step;
	      return possibleIndex >= 0 &&
	        possibleIndex < this.size &&
	        possibleIndex === Math.floor(possibleIndex);
	    };

	    Range.prototype.slice = function(begin, end) {
	      if (wholeSlice(begin, end, this.size)) {
	        return this;
	      }
	      begin = resolveBegin(begin, this.size);
	      end = resolveEnd(end, this.size);
	      if (end <= begin) {
	        return new Range(0, 0);
	      }
	      return new Range(this.get(begin, this._end), this.get(end, this._end), this._step);
	    };

	    Range.prototype.indexOf = function(searchValue) {
	      var offsetValue = searchValue - this._start;
	      if (offsetValue % this._step === 0) {
	        var index = offsetValue / this._step;
	        if (index >= 0 && index < this.size) {
	          return index
	        }
	      }
	      return -1;
	    };

	    Range.prototype.lastIndexOf = function(searchValue) {
	      return this.indexOf(searchValue);
	    };

	    Range.prototype.__iterate = function(fn, reverse) {
	      var maxIndex = this.size - 1;
	      var step = this._step;
	      var value = reverse ? this._start + maxIndex * step : this._start;
	      for (var ii = 0; ii <= maxIndex; ii++) {
	        if (fn(value, ii, this) === false) {
	          return ii + 1;
	        }
	        value += reverse ? -step : step;
	      }
	      return ii;
	    };

	    Range.prototype.__iterator = function(type, reverse) {
	      var maxIndex = this.size - 1;
	      var step = this._step;
	      var value = reverse ? this._start + maxIndex * step : this._start;
	      var ii = 0;
	      return new src_Iterator__Iterator(function()  {
	        var v = value;
	        value += reverse ? -step : step;
	        return ii > maxIndex ? iteratorDone() : iteratorValue(type, ii++, v);
	      });
	    };

	    Range.prototype.equals = function(other) {
	      return other instanceof Range ?
	        this._start === other._start &&
	        this._end === other._end &&
	        this._step === other._step :
	        deepEqual(this, other);
	    };


	  var EMPTY_RANGE;

	  createClass(Repeat, IndexedSeq);

	    function Repeat(value, times) {
	      if (!(this instanceof Repeat)) {
	        return new Repeat(value, times);
	      }
	      this._value = value;
	      this.size = times === undefined ? Infinity : Math.max(0, times);
	      if (this.size === 0) {
	        if (EMPTY_REPEAT) {
	          return EMPTY_REPEAT;
	        }
	        EMPTY_REPEAT = this;
	      }
	    }

	    Repeat.prototype.toString = function() {
	      if (this.size === 0) {
	        return 'Repeat []';
	      }
	      return 'Repeat [ ' + this._value + ' ' + this.size + ' times ]';
	    };

	    Repeat.prototype.get = function(index, notSetValue) {
	      return this.has(index) ? this._value : notSetValue;
	    };

	    Repeat.prototype.includes = function(searchValue) {
	      return is(this._value, searchValue);
	    };

	    Repeat.prototype.slice = function(begin, end) {
	      var size = this.size;
	      return wholeSlice(begin, end, size) ? this :
	        new Repeat(this._value, resolveEnd(end, size) - resolveBegin(begin, size));
	    };

	    Repeat.prototype.reverse = function() {
	      return this;
	    };

	    Repeat.prototype.indexOf = function(searchValue) {
	      if (is(this._value, searchValue)) {
	        return 0;
	      }
	      return -1;
	    };

	    Repeat.prototype.lastIndexOf = function(searchValue) {
	      if (is(this._value, searchValue)) {
	        return this.size;
	      }
	      return -1;
	    };

	    Repeat.prototype.__iterate = function(fn, reverse) {
	      for (var ii = 0; ii < this.size; ii++) {
	        if (fn(this._value, ii, this) === false) {
	          return ii + 1;
	        }
	      }
	      return ii;
	    };

	    Repeat.prototype.__iterator = function(type, reverse) {var this$0 = this;
	      var ii = 0;
	      return new src_Iterator__Iterator(function() 
	        {return ii < this$0.size ? iteratorValue(type, ii++, this$0._value) : iteratorDone()}
	      );
	    };

	    Repeat.prototype.equals = function(other) {
	      return other instanceof Repeat ?
	        is(this._value, other._value) :
	        deepEqual(other);
	    };


	  var EMPTY_REPEAT;

	  /**
	   * Contributes additional methods to a constructor
	   */
	  function mixin(ctor, methods) {
	    var keyCopier = function(key ) { ctor.prototype[key] = methods[key]; };
	    Object.keys(methods).forEach(keyCopier);
	    Object.getOwnPropertySymbols &&
	      Object.getOwnPropertySymbols(methods).forEach(keyCopier);
	    return ctor;
	  }

	  Iterable.Iterator = src_Iterator__Iterator;

	  mixin(Iterable, {

	    // ### Conversion to other types

	    toArray: function() {
	      assertNotInfinite(this.size);
	      var array = new Array(this.size || 0);
	      this.valueSeq().__iterate(function(v, i)  { array[i] = v; });
	      return array;
	    },

	    toIndexedSeq: function() {
	      return new ToIndexedSequence(this);
	    },

	    toJS: function() {
	      return this.toSeq().map(
	        function(value ) {return value && typeof value.toJS === 'function' ? value.toJS() : value}
	      ).__toJS();
	    },

	    toJSON: function() {
	      return this.toSeq().map(
	        function(value ) {return value && typeof value.toJSON === 'function' ? value.toJSON() : value}
	      ).__toJS();
	    },

	    toKeyedSeq: function() {
	      return new ToKeyedSequence(this, true);
	    },

	    toMap: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return src_Map__Map(this.toKeyedSeq());
	    },

	    toObject: function() {
	      assertNotInfinite(this.size);
	      var object = {};
	      this.__iterate(function(v, k)  { object[k] = v; });
	      return object;
	    },

	    toOrderedMap: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return OrderedMap(this.toKeyedSeq());
	    },

	    toOrderedSet: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
	    },

	    toSet: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return src_Set__Set(isKeyed(this) ? this.valueSeq() : this);
	    },

	    toSetSeq: function() {
	      return new ToSetSequence(this);
	    },

	    toSeq: function() {
	      return isIndexed(this) ? this.toIndexedSeq() :
	        isKeyed(this) ? this.toKeyedSeq() :
	        this.toSetSeq();
	    },

	    toStack: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return Stack(isKeyed(this) ? this.valueSeq() : this);
	    },

	    toList: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return List(isKeyed(this) ? this.valueSeq() : this);
	    },


	    // ### Common JavaScript methods and properties

	    toString: function() {
	      return '[Iterable]';
	    },

	    __toString: function(head, tail) {
	      if (this.size === 0) {
	        return head + tail;
	      }
	      return head + ' ' + this.toSeq().map(this.__toStringMapper).join(', ') + ' ' + tail;
	    },


	    // ### ES6 Collection methods (ES6 Array and Map)

	    concat: function() {var values = SLICE$0.call(arguments, 0);
	      return reify(this, concatFactory(this, values));
	    },

	    includes: function(searchValue) {
	      return this.some(function(value ) {return is(value, searchValue)});
	    },

	    entries: function() {
	      return this.__iterator(ITERATE_ENTRIES);
	    },

	    every: function(predicate, context) {
	      assertNotInfinite(this.size);
	      var returnValue = true;
	      this.__iterate(function(v, k, c)  {
	        if (!predicate.call(context, v, k, c)) {
	          returnValue = false;
	          return false;
	        }
	      });
	      return returnValue;
	    },

	    filter: function(predicate, context) {
	      return reify(this, filterFactory(this, predicate, context, true));
	    },

	    find: function(predicate, context, notSetValue) {
	      var entry = this.findEntry(predicate, context);
	      return entry ? entry[1] : notSetValue;
	    },

	    findEntry: function(predicate, context) {
	      var found;
	      this.__iterate(function(v, k, c)  {
	        if (predicate.call(context, v, k, c)) {
	          found = [k, v];
	          return false;
	        }
	      });
	      return found;
	    },

	    findLastEntry: function(predicate, context) {
	      return this.toSeq().reverse().findEntry(predicate, context);
	    },

	    forEach: function(sideEffect, context) {
	      assertNotInfinite(this.size);
	      return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
	    },

	    join: function(separator) {
	      assertNotInfinite(this.size);
	      separator = separator !== undefined ? '' + separator : ',';
	      var joined = '';
	      var isFirst = true;
	      this.__iterate(function(v ) {
	        isFirst ? (isFirst = false) : (joined += separator);
	        joined += v !== null && v !== undefined ? v.toString() : '';
	      });
	      return joined;
	    },

	    keys: function() {
	      return this.__iterator(ITERATE_KEYS);
	    },

	    map: function(mapper, context) {
	      return reify(this, mapFactory(this, mapper, context));
	    },

	    reduce: function(reducer, initialReduction, context) {
	      assertNotInfinite(this.size);
	      var reduction;
	      var useFirst;
	      if (arguments.length < 2) {
	        useFirst = true;
	      } else {
	        reduction = initialReduction;
	      }
	      this.__iterate(function(v, k, c)  {
	        if (useFirst) {
	          useFirst = false;
	          reduction = v;
	        } else {
	          reduction = reducer.call(context, reduction, v, k, c);
	        }
	      });
	      return reduction;
	    },

	    reduceRight: function(reducer, initialReduction, context) {
	      var reversed = this.toKeyedSeq().reverse();
	      return reversed.reduce.apply(reversed, arguments);
	    },

	    reverse: function() {
	      return reify(this, reverseFactory(this, true));
	    },

	    slice: function(begin, end) {
	      return reify(this, sliceFactory(this, begin, end, true));
	    },

	    some: function(predicate, context) {
	      return !this.every(not(predicate), context);
	    },

	    sort: function(comparator) {
	      return reify(this, sortFactory(this, comparator));
	    },

	    values: function() {
	      return this.__iterator(ITERATE_VALUES);
	    },


	    // ### More sequential methods

	    butLast: function() {
	      return this.slice(0, -1);
	    },

	    isEmpty: function() {
	      return this.size !== undefined ? this.size === 0 : !this.some(function()  {return true});
	    },

	    count: function(predicate, context) {
	      return ensureSize(
	        predicate ? this.toSeq().filter(predicate, context) : this
	      );
	    },

	    countBy: function(grouper, context) {
	      return countByFactory(this, grouper, context);
	    },

	    equals: function(other) {
	      return deepEqual(this, other);
	    },

	    entrySeq: function() {
	      var iterable = this;
	      if (iterable._cache) {
	        // We cache as an entries array, so we can just return the cache!
	        return new ArraySeq(iterable._cache);
	      }
	      var entriesSequence = iterable.toSeq().map(entryMapper).toIndexedSeq();
	      entriesSequence.fromEntrySeq = function()  {return iterable.toSeq()};
	      return entriesSequence;
	    },

	    filterNot: function(predicate, context) {
	      return this.filter(not(predicate), context);
	    },

	    findLast: function(predicate, context, notSetValue) {
	      return this.toKeyedSeq().reverse().find(predicate, context, notSetValue);
	    },

	    first: function() {
	      return this.find(returnTrue);
	    },

	    flatMap: function(mapper, context) {
	      return reify(this, flatMapFactory(this, mapper, context));
	    },

	    flatten: function(depth) {
	      return reify(this, flattenFactory(this, depth, true));
	    },

	    fromEntrySeq: function() {
	      return new FromEntriesSequence(this);
	    },

	    get: function(searchKey, notSetValue) {
	      return this.find(function(_, key)  {return is(key, searchKey)}, undefined, notSetValue);
	    },

	    getIn: function(searchKeyPath, notSetValue) {
	      var nested = this;
	      // Note: in an ES6 environment, we would prefer:
	      // for (var key of searchKeyPath) {
	      var iter = forceIterator(searchKeyPath);
	      var step;
	      while (!(step = iter.next()).done) {
	        var key = step.value;
	        nested = nested && nested.get ? nested.get(key, NOT_SET) : NOT_SET;
	        if (nested === NOT_SET) {
	          return notSetValue;
	        }
	      }
	      return nested;
	    },

	    groupBy: function(grouper, context) {
	      return groupByFactory(this, grouper, context);
	    },

	    has: function(searchKey) {
	      return this.get(searchKey, NOT_SET) !== NOT_SET;
	    },

	    hasIn: function(searchKeyPath) {
	      return this.getIn(searchKeyPath, NOT_SET) !== NOT_SET;
	    },

	    isSubset: function(iter) {
	      iter = typeof iter.includes === 'function' ? iter : Iterable(iter);
	      return this.every(function(value ) {return iter.includes(value)});
	    },

	    isSuperset: function(iter) {
	      iter = typeof iter.isSubset === 'function' ? iter : Iterable(iter);
	      return iter.isSubset(this);
	    },

	    keySeq: function() {
	      return this.toSeq().map(keyMapper).toIndexedSeq();
	    },

	    last: function() {
	      return this.toSeq().reverse().first();
	    },

	    max: function(comparator) {
	      return maxFactory(this, comparator);
	    },

	    maxBy: function(mapper, comparator) {
	      return maxFactory(this, comparator, mapper);
	    },

	    min: function(comparator) {
	      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator);
	    },

	    minBy: function(mapper, comparator) {
	      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator, mapper);
	    },

	    rest: function() {
	      return this.slice(1);
	    },

	    skip: function(amount) {
	      return this.slice(Math.max(0, amount));
	    },

	    skipLast: function(amount) {
	      return reify(this, this.toSeq().reverse().skip(amount).reverse());
	    },

	    skipWhile: function(predicate, context) {
	      return reify(this, skipWhileFactory(this, predicate, context, true));
	    },

	    skipUntil: function(predicate, context) {
	      return this.skipWhile(not(predicate), context);
	    },

	    sortBy: function(mapper, comparator) {
	      return reify(this, sortFactory(this, comparator, mapper));
	    },

	    take: function(amount) {
	      return this.slice(0, Math.max(0, amount));
	    },

	    takeLast: function(amount) {
	      return reify(this, this.toSeq().reverse().take(amount).reverse());
	    },

	    takeWhile: function(predicate, context) {
	      return reify(this, takeWhileFactory(this, predicate, context));
	    },

	    takeUntil: function(predicate, context) {
	      return this.takeWhile(not(predicate), context);
	    },

	    valueSeq: function() {
	      return this.toIndexedSeq();
	    },


	    // ### Hashable Object

	    hashCode: function() {
	      return this.__hash || (this.__hash = hashIterable(this));
	    }


	    // ### Internal

	    // abstract __iterate(fn, reverse)

	    // abstract __iterator(type, reverse)
	  });

	  // var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
	  // var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
	  // var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
	  // var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

	  var IterablePrototype = Iterable.prototype;
	  IterablePrototype[IS_ITERABLE_SENTINEL] = true;
	  IterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.values;
	  IterablePrototype.__toJS = IterablePrototype.toArray;
	  IterablePrototype.__toStringMapper = quoteString;
	  IterablePrototype.inspect =
	  IterablePrototype.toSource = function() { return this.toString(); };
	  IterablePrototype.chain = IterablePrototype.flatMap;
	  IterablePrototype.contains = IterablePrototype.includes;

	  // Temporary warning about using length
	  (function () {
	    try {
	      Object.defineProperty(IterablePrototype, 'length', {
	        get: function () {
	          if (!Iterable.noLengthWarning) {
	            var stack;
	            try {
	              throw new Error();
	            } catch (error) {
	              stack = error.stack;
	            }
	            if (stack.indexOf('_wrapObject') === -1) {
	              console && console.warn && console.warn(
	                'iterable.length has been deprecated, '+
	                'use iterable.size or iterable.count(). '+
	                'This warning will become a silent error in a future version. ' +
	                stack
	              );
	              return this.size;
	            }
	          }
	        }
	      });
	    } catch (e) {}
	  })();



	  mixin(KeyedIterable, {

	    // ### More sequential methods

	    flip: function() {
	      return reify(this, flipFactory(this));
	    },

	    findKey: function(predicate, context) {
	      var entry = this.findEntry(predicate, context);
	      return entry && entry[0];
	    },

	    findLastKey: function(predicate, context) {
	      return this.toSeq().reverse().findKey(predicate, context);
	    },

	    keyOf: function(searchValue) {
	      return this.findKey(function(value ) {return is(value, searchValue)});
	    },

	    lastKeyOf: function(searchValue) {
	      return this.findLastKey(function(value ) {return is(value, searchValue)});
	    },

	    mapEntries: function(mapper, context) {var this$0 = this;
	      var iterations = 0;
	      return reify(this,
	        this.toSeq().map(
	          function(v, k)  {return mapper.call(context, [k, v], iterations++, this$0)}
	        ).fromEntrySeq()
	      );
	    },

	    mapKeys: function(mapper, context) {var this$0 = this;
	      return reify(this,
	        this.toSeq().flip().map(
	          function(k, v)  {return mapper.call(context, k, v, this$0)}
	        ).flip()
	      );
	    }

	  });

	  var KeyedIterablePrototype = KeyedIterable.prototype;
	  KeyedIterablePrototype[IS_KEYED_SENTINEL] = true;
	  KeyedIterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.entries;
	  KeyedIterablePrototype.__toJS = IterablePrototype.toObject;
	  KeyedIterablePrototype.__toStringMapper = function(v, k)  {return JSON.stringify(k) + ': ' + quoteString(v)};



	  mixin(IndexedIterable, {

	    // ### Conversion to other types

	    toKeyedSeq: function() {
	      return new ToKeyedSequence(this, false);
	    },


	    // ### ES6 Collection methods (ES6 Array and Map)

	    filter: function(predicate, context) {
	      return reify(this, filterFactory(this, predicate, context, false));
	    },

	    findIndex: function(predicate, context) {
	      var entry = this.findEntry(predicate, context);
	      return entry ? entry[0] : -1;
	    },

	    indexOf: function(searchValue) {
	      var key = this.toKeyedSeq().keyOf(searchValue);
	      return key === undefined ? -1 : key;
	    },

	    lastIndexOf: function(searchValue) {
	      return this.toSeq().reverse().indexOf(searchValue);
	    },

	    reverse: function() {
	      return reify(this, reverseFactory(this, false));
	    },

	    slice: function(begin, end) {
	      return reify(this, sliceFactory(this, begin, end, false));
	    },

	    splice: function(index, removeNum /*, ...values*/) {
	      var numArgs = arguments.length;
	      removeNum = Math.max(removeNum | 0, 0);
	      if (numArgs === 0 || (numArgs === 2 && !removeNum)) {
	        return this;
	      }
	      // If index is negative, it should resolve relative to the size of the
	      // collection. However size may be expensive to compute if not cached, so
	      // only call count() if the number is in fact negative.
	      index = resolveBegin(index, index < 0 ? this.count() : this.size);
	      var spliced = this.slice(0, index);
	      return reify(
	        this,
	        numArgs === 1 ?
	          spliced :
	          spliced.concat(arrCopy(arguments, 2), this.slice(index + removeNum))
	      );
	    },


	    // ### More collection methods

	    findLastIndex: function(predicate, context) {
	      var key = this.toKeyedSeq().findLastKey(predicate, context);
	      return key === undefined ? -1 : key;
	    },

	    first: function() {
	      return this.get(0);
	    },

	    flatten: function(depth) {
	      return reify(this, flattenFactory(this, depth, false));
	    },

	    get: function(index, notSetValue) {
	      index = wrapIndex(this, index);
	      return (index < 0 || (this.size === Infinity ||
	          (this.size !== undefined && index > this.size))) ?
	        notSetValue :
	        this.find(function(_, key)  {return key === index}, undefined, notSetValue);
	    },

	    has: function(index) {
	      index = wrapIndex(this, index);
	      return index >= 0 && (this.size !== undefined ?
	        this.size === Infinity || index < this.size :
	        this.indexOf(index) !== -1
	      );
	    },

	    interpose: function(separator) {
	      return reify(this, interposeFactory(this, separator));
	    },

	    interleave: function(/*...iterables*/) {
	      var iterables = [this].concat(arrCopy(arguments));
	      var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, iterables);
	      var interleaved = zipped.flatten(true);
	      if (zipped.size) {
	        interleaved.size = zipped.size * iterables.length;
	      }
	      return reify(this, interleaved);
	    },

	    last: function() {
	      return this.get(-1);
	    },

	    skipWhile: function(predicate, context) {
	      return reify(this, skipWhileFactory(this, predicate, context, false));
	    },

	    zip: function(/*, ...iterables */) {
	      var iterables = [this].concat(arrCopy(arguments));
	      return reify(this, zipWithFactory(this, defaultZipper, iterables));
	    },

	    zipWith: function(zipper/*, ...iterables */) {
	      var iterables = arrCopy(arguments);
	      iterables[0] = this;
	      return reify(this, zipWithFactory(this, zipper, iterables));
	    }

	  });

	  IndexedIterable.prototype[IS_INDEXED_SENTINEL] = true;
	  IndexedIterable.prototype[IS_ORDERED_SENTINEL] = true;



	  mixin(SetIterable, {

	    // ### ES6 Collection methods (ES6 Array and Map)

	    get: function(value, notSetValue) {
	      return this.has(value) ? value : notSetValue;
	    },

	    includes: function(value) {
	      return this.has(value);
	    },


	    // ### More sequential methods

	    keySeq: function() {
	      return this.valueSeq();
	    }

	  });

	  SetIterable.prototype.has = IterablePrototype.includes;


	  // Mixin subclasses

	  mixin(KeyedSeq, KeyedIterable.prototype);
	  mixin(IndexedSeq, IndexedIterable.prototype);
	  mixin(SetSeq, SetIterable.prototype);

	  mixin(KeyedCollection, KeyedIterable.prototype);
	  mixin(IndexedCollection, IndexedIterable.prototype);
	  mixin(SetCollection, SetIterable.prototype);


	  // #pragma Helper functions

	  function keyMapper(v, k) {
	    return k;
	  }

	  function entryMapper(v, k) {
	    return [k, v];
	  }

	  function not(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    }
	  }

	  function neg(predicate) {
	    return function() {
	      return -predicate.apply(this, arguments);
	    }
	  }

	  function quoteString(value) {
	    return typeof value === 'string' ? JSON.stringify(value) : value;
	  }

	  function defaultZipper() {
	    return arrCopy(arguments);
	  }

	  function defaultNegComparator(a, b) {
	    return a < b ? 1 : a > b ? -1 : 0;
	  }

	  function hashIterable(iterable) {
	    if (iterable.size === Infinity) {
	      return 0;
	    }
	    var ordered = isOrdered(iterable);
	    var keyed = isKeyed(iterable);
	    var h = ordered ? 1 : 0;
	    var size = iterable.__iterate(
	      keyed ?
	        ordered ?
	          function(v, k)  { h = 31 * h + hashMerge(hash(v), hash(k)) | 0; } :
	          function(v, k)  { h = h + hashMerge(hash(v), hash(k)) | 0; } :
	        ordered ?
	          function(v ) { h = 31 * h + hash(v) | 0; } :
	          function(v ) { h = h + hash(v) | 0; }
	    );
	    return murmurHashOfSize(size, h);
	  }

	  function murmurHashOfSize(size, h) {
	    h = src_Math__imul(h, 0xCC9E2D51);
	    h = src_Math__imul(h << 15 | h >>> -15, 0x1B873593);
	    h = src_Math__imul(h << 13 | h >>> -13, 5);
	    h = (h + 0xE6546B64 | 0) ^ size;
	    h = src_Math__imul(h ^ h >>> 16, 0x85EBCA6B);
	    h = src_Math__imul(h ^ h >>> 13, 0xC2B2AE35);
	    h = smi(h ^ h >>> 16);
	    return h;
	  }

	  function hashMerge(a, b) {
	    return a ^ b + 0x9E3779B9 + (a << 6) + (a >> 2) | 0; // int
	  }

	  var Immutable = {

	    Iterable: Iterable,

	    Seq: Seq,
	    Collection: Collection,
	    Map: src_Map__Map,
	    OrderedMap: OrderedMap,
	    List: List,
	    Stack: Stack,
	    Set: src_Set__Set,
	    OrderedSet: OrderedSet,

	    Record: Record,
	    Range: Range,
	    Repeat: Repeat,

	    is: is,
	    fromJS: fromJS

	  };

	  return Immutable;

	}));

/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * Checks if the passed in value is a string
	 * @param {*} val
	 * @return {boolean}
	 */
	'use strict';

	var _bind = Function.prototype.bind;
	exports.isString = function (val) {
	  return typeof val === 'string' || objectToString(val) === '[object String]';
	};

	/**
	 * Checks if the passed in value is an array
	 * @param {*} val
	 * @return {boolean}
	 */
	exports.isArray = Array.isArray /* istanbul ignore next */ || function (val) {
	  return objectToString(val) === '[object Array]';
	};

	// taken from underscore source to account for browser discrepancy
	/* istanbul ignore if  */
	if (typeof /./ !== 'function' && typeof Int8Array !== 'object') {
	  /**
	   * Checks if the passed in value is a function
	   * @param {*} val
	   * @return {boolean}
	   */
	  exports.isFunction = function (obj) {
	    return typeof obj === 'function' || false;
	  };
	} else {
	  /**
	   * Checks if the passed in value is a function
	   * @param {*} val
	   * @return {boolean}
	   */
	  exports.isFunction = function (val) {
	    return toString.call(val) === '[object Function]';
	  };
	}

	/**
	 * Checks if the passed in value is of type Object
	 * @param {*} val
	 * @return {boolean}
	 */
	exports.isObject = function (obj) {
	  var type = typeof obj;
	  return type === 'function' || type === 'object' && !!obj;
	};

	/**
	 * Extends an object with the properties of additional objects
	 * @param {object} obj
	 * @param {object} objects
	 * @return {object}
	 */
	exports.extend = function (obj) {
	  var length = arguments.length;

	  if (!obj || length < 2) {
	    return obj || {};
	  }

	  for (var index = 1; index < length; index++) {
	    var source = arguments[index];
	    var keys = Object.keys(source);
	    var l = keys.length;

	    for (var i = 0; i < l; i++) {
	      var key = keys[i];
	      obj[key] = source[key];
	    }
	  }

	  return obj;
	};

	/**
	 * Creates a shallow clone of an object
	 * @param {object} obj
	 * @return {object}
	 */
	exports.clone = function (obj) {
	  if (!exports.isObject(obj)) {
	    return obj;
	  }
	  return exports.isArray(obj) ? obj.slice() : exports.extend({}, obj);
	};

	/**
	 * Iterates over a collection of elements yielding each iteration to an
	 * iteratee. The iteratee may be bound to the context argument and is invoked
	 * each time with three arguments (value, index|key, collection). Iteration may
	 * be exited early by explicitly returning false.
	 * @param {array|object|string} collection
	 * @param {function} iteratee
	 * @param {*} context
	 * @return {array|object|string}
	 */
	exports.each = function (collection, iteratee, context) {
	  var length = collection ? collection.length : 0;
	  var i = -1;
	  var keys;
	  var origIteratee;

	  if (context) {
	    origIteratee = iteratee;
	    iteratee = function (value, index, innerCollection) {
	      return origIteratee.call(context, value, index, innerCollection);
	    };
	  }

	  if (isLength(length)) {
	    while (++i < length) {
	      if (iteratee(collection[i], i, collection) === false) {
	        break;
	      }
	    }
	  } else {
	    keys = Object.keys(collection);
	    length = keys.length;
	    while (++i < length) {
	      if (iteratee(collection[keys[i]], keys[i], collection) === false) {
	        break;
	      }
	    }
	  }

	  return collection;
	};

	/**
	 * Returns a new function the invokes `func` with `partialArgs` prepended to
	 * any passed into the new function. Acts like `Array.prototype.bind`, except
	 * it does not alter `this` context.
	 * @param {function} func
	 * @param {*} partialArgs
	 * @return {function}
	 */
	exports.partial = function (func) {
	  var slice = Array.prototype.slice;
	  var partialArgs = slice.call(arguments, 1);

	  return function () {
	    return func.apply(this, partialArgs.concat(slice.call(arguments)));
	  };
	};

	/**
	 * Returns a factory method that allows construction with or without `new`
	 */
	exports.toFactory = function (Klass) {
	  var Factory = function Factory() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return new (_bind.apply(Klass, [null].concat(args)))();
	  };

	  Factory.__proto__ = Klass; // eslint-disable-line no-proto
	  Factory.prototype = Klass.prototype;
	  return Factory;
	};

	/**
	 * Returns the text value representation of an object
	 * @private
	 * @param {*} obj
	 * @return {string}
	 */
	function objectToString(obj) {
	  return obj && typeof obj === 'object' && toString.call(obj);
	}

	/**
	 * Checks if the value is a valid array-like length.
	 * @private
	 * @param {*} val
	 * @return {bool}
	 */
	function isLength(val) {
	  return typeof val === 'number' && val > -1 && val % 1 === 0 && val <= Number.MAX_VALUE;
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.isImmutable = isImmutable;
	exports.isImmutableValue = isImmutableValue;
	exports.toJS = toJS;
	exports.toImmutable = toImmutable;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _immutable = __webpack_require__(3);

	var _immutable2 = _interopRequireDefault(_immutable);

	var _utils = __webpack_require__(4);

	/**
	 * A collection of helpers for the ImmutableJS library
	 */

	/**
	 * @param {*} obj
	 * @return {boolean}
	 */

	function isImmutable(obj) {
	  return _immutable2['default'].Iterable.isIterable(obj);
	}

	/**
	 * Returns true if the value is an ImmutableJS data structure
	 * or a JavaScript primitive that is immutable (string, number, etc)
	 * @param {*} obj
	 * @return {boolean}
	 */

	function isImmutableValue(obj) {
	  return isImmutable(obj) || !(0, _utils.isObject)(obj);
	}

	/**
	 * Converts an Immutable Sequence to JS object
	 * Can be called on any type
	 */

	function toJS(arg) {
	  // arg instanceof Immutable.Sequence is unreliable
	  return isImmutable(arg) ? arg.toJS() : arg;
	}

	/**
	 * Converts a JS object to an Immutable object, if it's
	 * already Immutable its a no-op
	 */

	function toImmutable(arg) {
	  return isImmutable(arg) ? arg : _immutable2['default'].fromJS(arg);
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _immutable = __webpack_require__(3);

	var _immutable2 = _interopRequireDefault(_immutable);

	var _createReactMixin = __webpack_require__(7);

	var _createReactMixin2 = _interopRequireDefault(_createReactMixin);

	var _reactorFns = __webpack_require__(8);

	var fns = _interopRequireWildcard(_reactorFns);

	var _keyPath = __webpack_require__(11);

	var _getter = __webpack_require__(10);

	var _immutableHelpers = __webpack_require__(5);

	var _utils = __webpack_require__(4);

	var _reactorRecords = __webpack_require__(12);

	/**
	 * State is stored in NuclearJS Reactors.  Reactors
	 * contain a 'state' object which is an Immutable.Map
	 *
	 * The only way Reactors can change state is by reacting to
	 * messages.  To update state, Reactor's dispatch messages to
	 * all registered cores, and the core returns it's new
	 * state based on the message
	 */

	var Reactor = (function () {
	  function Reactor() {
	    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    _classCallCheck(this, Reactor);

	    var debug = !!config.debug;
	    var baseOptions = debug ? _reactorRecords.DEBUG_OPTIONS : _reactorRecords.PROD_OPTIONS;
	    var initialReactorState = new _reactorRecords.ReactorState({
	      debug: debug,
	      // merge config options with the defaults
	      options: baseOptions.merge(config.options || {})
	    });

	    this.prevReactorState = initialReactorState;
	    this.reactorState = initialReactorState;
	    this.observerState = new _reactorRecords.ObserverState();

	    this.ReactMixin = (0, _createReactMixin2['default'])(this);

	    // keep track of the depth of batch nesting
	    this.__batchDepth = 0;

	    // keep track if we are currently dispatching
	    this.__isDispatching = false;
	  }

	  /**
	   * Evaluates a KeyPath or Getter in context of the reactor state
	   * @param {KeyPath|Getter} keyPathOrGetter
	   * @return {*}
	   */

	  _createClass(Reactor, [{
	    key: 'evaluate',
	    value: function evaluate(keyPathOrGetter) {
	      var _fns$evaluate = fns.evaluate(this.reactorState, keyPathOrGetter);

	      var result = _fns$evaluate.result;
	      var reactorState = _fns$evaluate.reactorState;

	      this.reactorState = reactorState;
	      return result;
	    }

	    /**
	     * Gets the coerced state (to JS object) of the reactor.evaluate
	     * @param {KeyPath|Getter} keyPathOrGetter
	     * @return {*}
	     */
	  }, {
	    key: 'evaluateToJS',
	    value: function evaluateToJS(keyPathOrGetter) {
	      return (0, _immutableHelpers.toJS)(this.evaluate(keyPathOrGetter));
	    }

	    /**
	     * Adds a change observer whenever a certain part of the reactor state changes
	     *
	     * 1. observe(handlerFn) - 1 argument, called anytime reactor.state changes
	     * 2. observe(keyPath, handlerFn) same as above
	     * 3. observe(getter, handlerFn) called whenever any getter dependencies change with
	     *    the value of the getter
	     *
	     * Adds a change handler whenever certain deps change
	     * If only one argument is passed invoked the handler whenever
	     * the reactor state changes
	     *
	     * @param {KeyPath|Getter} getter
	     * @param {function} handler
	     * @return {function} unwatch function
	     */
	  }, {
	    key: 'observe',
	    value: function observe(getter, handler) {
	      var _this = this;

	      if (arguments.length === 1) {
	        handler = getter;
	        getter = [];
	      }

	      var _fns$addObserver = fns.addObserver(this.observerState, getter, handler);

	      var observerState = _fns$addObserver.observerState;
	      var entry = _fns$addObserver.entry;

	      this.observerState = observerState;
	      return function () {
	        _this.observerState = fns.removeObserverByEntry(_this.observerState, entry);
	      };
	    }
	  }, {
	    key: 'unobserve',
	    value: function unobserve(getter, handler) {
	      if (arguments.length === 0) {
	        throw new Error('Must call unobserve with a Getter');
	      }
	      if (!(0, _getter.isGetter)(getter) && !(0, _keyPath.isKeyPath)(getter)) {
	        throw new Error('Must call unobserve with a Getter');
	      }

	      this.observerState = fns.removeObserver(this.observerState, getter, handler);
	    }

	    /**
	     * Dispatches a single message
	     * @param {string} actionType
	     * @param {object|undefined} payload
	     */
	  }, {
	    key: 'dispatch',
	    value: function dispatch(actionType, payload) {
	      if (this.__batchDepth === 0) {
	        if (fns.getOption(this.reactorState, 'throwOnDispatchInDispatch')) {
	          if (this.__isDispatching) {
	            this.__isDispatching = false;
	            throw new Error('Dispatch may not be called while a dispatch is in progress');
	          }
	        }
	        this.__isDispatching = true;
	      }

	      try {
	        this.reactorState = fns.dispatch(this.reactorState, actionType, payload);
	      } catch (e) {
	        this.__isDispatching = false;
	        throw e;
	      }

	      try {
	        this.__notify();
	      } finally {
	        this.__isDispatching = false;
	      }
	    }

	    /**
	     * Allows batching of dispatches before notifying change observers
	     * @param {Function} fn
	     */
	  }, {
	    key: 'batch',
	    value: function batch(fn) {
	      this.batchStart();
	      fn();
	      this.batchEnd();
	    }

	    /**
	     * @deprecated
	     * @param {String} id
	     * @param {Store} store
	     */
	  }, {
	    key: 'registerStore',
	    value: function registerStore(id, store) {
	      /* eslint-disable no-console */
	      console.warn('Deprecation warning: `registerStore` will no longer be supported in 1.1, use `registerStores` instead');
	      /* eslint-enable no-console */
	      this.registerStores(_defineProperty({}, id, store));
	    }

	    /**
	     * @param {Object} stores
	     */
	  }, {
	    key: 'registerStores',
	    value: function registerStores(stores) {
	      this.reactorState = fns.registerStores(this.reactorState, stores);
	      this.__notify();
	    }

	    /**
	     * Replace store implementation (handlers) without modifying the app state or calling getInitialState
	     * Useful for hot reloading
	     * @param {Object} stores
	     */
	  }, {
	    key: 'replaceStores',
	    value: function replaceStores(stores) {
	      this.reactorState = fns.replaceStores(this.reactorState, stores);
	    }

	    /**
	     * Returns a plain object representing the application state
	     * @return {Object}
	     */
	  }, {
	    key: 'serialize',
	    value: function serialize() {
	      return fns.serialize(this.reactorState);
	    }

	    /**
	     * @param {Object} state
	     */
	  }, {
	    key: 'loadState',
	    value: function loadState(state) {
	      this.reactorState = fns.loadState(this.reactorState, state);
	      this.__notify();
	    }

	    /**
	     * Resets the state of a reactor and returns back to initial state
	     */
	  }, {
	    key: 'reset',
	    value: function reset() {
	      var newState = fns.reset(this.reactorState);
	      this.reactorState = newState;
	      this.prevReactorState = newState;
	      this.observerState = new _reactorRecords.ObserverState();
	    }

	    /**
	     * Notifies all change observers with the current state
	     * @private
	     */
	  }, {
	    key: '__notify',
	    value: function __notify() {
	      var _this2 = this;

	      if (this.__batchDepth > 0) {
	        // in the middle of batch, dont notify
	        return;
	      }

	      var dirtyStores = this.reactorState.get('dirtyStores');
	      if (dirtyStores.size === 0) {
	        return;
	      }

	      var observerIdsToNotify = _immutable2['default'].Set().withMutations(function (set) {
	        // notify all observers
	        set.union(_this2.observerState.get('any'));

	        dirtyStores.forEach(function (id) {
	          var entries = _this2.observerState.getIn(['stores', id]);
	          if (!entries) {
	            return;
	          }
	          set.union(entries);
	        });
	      });

	      observerIdsToNotify.forEach(function (observerId) {
	        var entry = _this2.observerState.getIn(['observersMap', observerId]);
	        if (!entry) {
	          // don't notify here in the case a handler called unobserve on another observer
	          return;
	        }

	        var getter = entry.get('getter');
	        var handler = entry.get('handler');

	        var prevEvaluateResult = fns.evaluate(_this2.prevReactorState, getter);
	        var currEvaluateResult = fns.evaluate(_this2.reactorState, getter);

	        _this2.prevReactorState = prevEvaluateResult.reactorState;
	        _this2.reactorState = currEvaluateResult.reactorState;

	        var prevValue = prevEvaluateResult.result;
	        var currValue = currEvaluateResult.result;

	        if (!_immutable2['default'].is(prevValue, currValue)) {
	          handler.call(null, currValue);
	        }
	      });

	      var nextReactorState = fns.resetDirtyStores(this.reactorState);

	      this.prevReactorState = nextReactorState;
	      this.reactorState = nextReactorState;
	    }

	    /**
	     * Starts batching, ie pausing notifies and batching up changes
	     * to be notified when batchEnd() is called
	     */
	  }, {
	    key: 'batchStart',
	    value: function batchStart() {
	      this.__batchDepth++;
	    }

	    /**
	     * Ends a batch cycle and will notify obsevers of all changes if
	     * the batch depth is back to 0 (outer most batch completed)
	     */
	  }, {
	    key: 'batchEnd',
	    value: function batchEnd() {
	      this.__batchDepth--;

	      if (this.__batchDepth <= 0) {
	        // set to true to catch if dispatch called from observer
	        this.__isDispatching = true;
	        try {
	          this.__notify();
	        } catch (e) {
	          this.__isDispatching = false;
	          throw e;
	        }
	        this.__isDispatching = false;
	      }
	    }
	  }]);

	  return Reactor;
	})();

	exports['default'] = (0, _utils.toFactory)(Reactor);
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var _utils = __webpack_require__(4);

	/**
	 * Returns a mapping of the getDataBinding keys to
	 * the reactor values
	 */
	function getState(reactor, data) {
	  var state = {};
	  (0, _utils.each)(data, function (value, key) {
	    state[key] = reactor.evaluate(value);
	  });
	  return state;
	}

	/**
	 * @param {Reactor} reactor
	 */

	exports['default'] = function (reactor) {
	  return {
	    getInitialState: function getInitialState() {
	      return getState(reactor, this.getDataBindings());
	    },

	    componentDidMount: function componentDidMount() {
	      var _this = this;

	      this.__unwatchFns = [];
	      (0, _utils.each)(this.getDataBindings(), function (getter, key) {
	        var unwatchFn = reactor.observe(getter, function (val) {
	          _this.setState(_defineProperty({}, key, val));
	        });

	        _this.__unwatchFns.push(unwatchFn);
	      });
	    },

	    componentWillUnmount: function componentWillUnmount() {
	      while (this.__unwatchFns.length) {
	        this.__unwatchFns.shift()();
	      }
	    }
	  };
	};

	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.registerStores = registerStores;
	exports.replaceStores = replaceStores;
	exports.dispatch = dispatch;
	exports.loadState = loadState;
	exports.addObserver = addObserver;
	exports.getOption = getOption;
	exports.removeObserver = removeObserver;
	exports.removeObserverByEntry = removeObserverByEntry;
	exports.reset = reset;
	exports.evaluate = evaluate;
	exports.serialize = serialize;
	exports.resetDirtyStores = resetDirtyStores;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _immutable = __webpack_require__(3);

	var _immutable2 = _interopRequireDefault(_immutable);

	var _logging = __webpack_require__(9);

	var _logging2 = _interopRequireDefault(_logging);

	var _immutableHelpers = __webpack_require__(5);

	var _getter = __webpack_require__(10);

	var _keyPath = __webpack_require__(11);

	var _utils = __webpack_require__(4);

	/**
	 * Immutable Types
	 */
	var EvaluateResult = _immutable2['default'].Record({ result: null, reactorState: null });

	function evaluateResult(result, reactorState) {
	  return new EvaluateResult({
	    result: result,
	    reactorState: reactorState
	  });
	}

	/**
	 * @param {ReactorState} reactorState
	 * @param {Object<String, Store>} stores
	 * @return {ReactorState}
	 */

	function registerStores(reactorState, stores) {
	  return reactorState.withMutations(function (reactorState) {
	    (0, _utils.each)(stores, function (store, id) {
	      if (reactorState.getIn(['stores', id])) {
	        /* eslint-disable no-console */
	        console.warn('Store already defined for id = ' + id);
	        /* eslint-enable no-console */
	      }

	      var initialState = store.getInitialState();

	      if (initialState === undefined && getOption(reactorState, 'throwOnUndefinedStoreReturnValue')) {
	        throw new Error('Store getInitialState() must return a value, did you forget a return statement');
	      }
	      if (getOption(reactorState, 'throwOnNonImmutableStore') && !(0, _immutableHelpers.isImmutableValue)(initialState)) {
	        throw new Error('Store getInitialState() must return an immutable value, did you forget to call toImmutable');
	      }

	      reactorState.update('stores', function (stores) {
	        return stores.set(id, store);
	      }).update('state', function (state) {
	        return state.set(id, initialState);
	      }).update('dirtyStores', function (state) {
	        return state.add(id);
	      }).update('storeStates', function (storeStates) {
	        return incrementStoreStates(storeStates, [id]);
	      });
	    });
	    incrementId(reactorState);
	  });
	}

	/**
	 * Overrides the store implementation without resetting the value of that particular part of the app state
	 * this is useful when doing hot reloading of stores.
	 * @param {ReactorState} reactorState
	 * @param {Object<String, Store>} stores
	 * @return {ReactorState}
	 */

	function replaceStores(reactorState, stores) {
	  return reactorState.withMutations(function (reactorState) {
	    (0, _utils.each)(stores, function (store, id) {
	      reactorState.update('stores', function (stores) {
	        return stores.set(id, store);
	      });
	    });
	  });
	}

	/**
	 * @param {ReactorState} reactorState
	 * @param {String} actionType
	 * @param {*} payload
	 * @return {ReactorState}
	 */

	function dispatch(reactorState, actionType, payload) {
	  if (actionType === undefined && getOption(reactorState, 'throwOnUndefinedActionType')) {
	    throw new Error('`dispatch` cannot be called with an `undefined` action type.');
	  }

	  var currState = reactorState.get('state');
	  var dirtyStores = reactorState.get('dirtyStores');

	  var nextState = currState.withMutations(function (state) {
	    _logging2['default'].dispatchStart(reactorState, actionType, payload);

	    // let each store handle the message
	    reactorState.get('stores').forEach(function (store, id) {
	      var currState = state.get(id);
	      var newState = undefined;

	      try {
	        newState = store.handle(currState, actionType, payload);
	      } catch (e) {
	        // ensure console.group is properly closed
	        _logging2['default'].dispatchError(reactorState, e.message);
	        throw e;
	      }

	      if (newState === undefined && getOption(reactorState, 'throwOnUndefinedStoreReturnValue')) {
	        var errorMsg = 'Store handler must return a value, did you forget a return statement';
	        _logging2['default'].dispatchError(reactorState, errorMsg);
	        throw new Error(errorMsg);
	      }

	      state.set(id, newState);

	      if (currState !== newState) {
	        // if the store state changed add store to list of dirty stores
	        dirtyStores = dirtyStores.add(id);
	      }
	    });

	    _logging2['default'].dispatchEnd(reactorState, state, dirtyStores);
	  });

	  var nextReactorState = reactorState.set('state', nextState).set('dirtyStores', dirtyStores).update('storeStates', function (storeStates) {
	    return incrementStoreStates(storeStates, dirtyStores);
	  });

	  return incrementId(nextReactorState);
	}

	/**
	 * @param {ReactorState} reactorState
	 * @param {Immutable.Map} state
	 * @return {ReactorState}
	 */

	function loadState(reactorState, state) {
	  var dirtyStores = [];
	  var stateToLoad = (0, _immutableHelpers.toImmutable)({}).withMutations(function (stateToLoad) {
	    (0, _utils.each)(state, function (serializedStoreState, storeId) {
	      var store = reactorState.getIn(['stores', storeId]);
	      if (store) {
	        var storeState = store.deserialize(serializedStoreState);
	        if (storeState !== undefined) {
	          stateToLoad.set(storeId, storeState);
	          dirtyStores.push(storeId);
	        }
	      }
	    });
	  });

	  var dirtyStoresSet = _immutable2['default'].Set(dirtyStores);
	  return reactorState.update('state', function (state) {
	    return state.merge(stateToLoad);
	  }).update('dirtyStores', function (stores) {
	    return stores.union(dirtyStoresSet);
	  }).update('storeStates', function (storeStates) {
	    return incrementStoreStates(storeStates, dirtyStores);
	  });
	}

	/**
	 * Adds a change observer whenever a certain part of the reactor state changes
	 *
	 * 1. observe(handlerFn) - 1 argument, called anytime reactor.state changes
	 * 2. observe(keyPath, handlerFn) same as above
	 * 3. observe(getter, handlerFn) called whenever any getter dependencies change with
	 *    the value of the getter
	 *
	 * Adds a change handler whenever certain deps change
	 * If only one argument is passed invoked the handler whenever
	 * the reactor state changes
	 *
	 * @param {ObserverState} observerState
	 * @param {KeyPath|Getter} getter
	 * @param {function} handler
	 * @return {ObserveResult}
	 */

	function addObserver(observerState, getter, handler) {
	  // use the passed in getter as the key so we can rely on a byreference call for unobserve
	  var getterKey = getter;
	  if ((0, _keyPath.isKeyPath)(getter)) {
	    getter = (0, _getter.fromKeyPath)(getter);
	  }

	  var currId = observerState.get('nextId');
	  var storeDeps = (0, _getter.getStoreDeps)(getter);
	  var entry = _immutable2['default'].Map({
	    id: currId,
	    storeDeps: storeDeps,
	    getterKey: getterKey,
	    getter: getter,
	    handler: handler
	  });

	  var updatedObserverState = undefined;
	  if (storeDeps.size === 0) {
	    // no storeDeps means the observer is dependent on any of the state changing
	    updatedObserverState = observerState.update('any', function (observerIds) {
	      return observerIds.add(currId);
	    });
	  } else {
	    updatedObserverState = observerState.withMutations(function (map) {
	      storeDeps.forEach(function (storeId) {
	        var path = ['stores', storeId];
	        if (!map.hasIn(path)) {
	          map.setIn(path, _immutable2['default'].Set());
	        }
	        map.updateIn(['stores', storeId], function (observerIds) {
	          return observerIds.add(currId);
	        });
	      });
	    });
	  }

	  updatedObserverState = updatedObserverState.set('nextId', currId + 1).setIn(['observersMap', currId], entry);

	  return {
	    observerState: updatedObserverState,
	    entry: entry
	  };
	}

	/**
	 * @param {ReactorState} reactorState
	 * @param {String} option
	 * @return {Boolean}
	 */

	function getOption(reactorState, option) {
	  var value = reactorState.getIn(['options', option]);
	  if (value === undefined) {
	    throw new Error('Invalid option: ' + option);
	  }
	  return value;
	}

	/**
	 * Use cases
	 * removeObserver(observerState, [])
	 * removeObserver(observerState, [], handler)
	 * removeObserver(observerState, ['keyPath'])
	 * removeObserver(observerState, ['keyPath'], handler)
	 * removeObserver(observerState, getter)
	 * removeObserver(observerState, getter, handler)
	 * @param {ObserverState} observerState
	 * @param {KeyPath|Getter} getter
	 * @param {Function} handler
	 * @return {ObserverState}
	 */

	function removeObserver(observerState, getter, handler) {
	  var entriesToRemove = observerState.get('observersMap').filter(function (entry) {
	    // use the getterKey in the case of a keyPath is transformed to a getter in addObserver
	    var entryGetter = entry.get('getterKey');
	    var handlersMatch = !handler || entry.get('handler') === handler;
	    if (!handlersMatch) {
	      return false;
	    }
	    // check for a by-value equality of keypaths
	    if ((0, _keyPath.isKeyPath)(getter) && (0, _keyPath.isKeyPath)(entryGetter)) {
	      return (0, _keyPath.isEqual)(getter, entryGetter);
	    }
	    // we are comparing two getters do it by reference
	    return getter === entryGetter;
	  });

	  return observerState.withMutations(function (map) {
	    entriesToRemove.forEach(function (entry) {
	      return removeObserverByEntry(map, entry);
	    });
	  });
	}

	/**
	 * Removes an observer entry by id from the observerState
	 * @param {ObserverState} observerState
	 * @param {Immutable.Map} entry
	 * @return {ObserverState}
	 */

	function removeObserverByEntry(observerState, entry) {
	  return observerState.withMutations(function (map) {
	    var id = entry.get('id');
	    var storeDeps = entry.get('storeDeps');

	    if (storeDeps.size === 0) {
	      map.update('any', function (anyObsevers) {
	        return anyObsevers.remove(id);
	      });
	    } else {
	      storeDeps.forEach(function (storeId) {
	        map.updateIn(['stores', storeId], function (observers) {
	          if (observers) {
	            // check for observers being present because reactor.reset() can be called before an unwatch fn
	            return observers.remove(id);
	          }
	          return observers;
	        });
	      });
	    }

	    map.removeIn(['observersMap', id]);
	  });
	}

	/**
	 * @param {ReactorState} reactorState
	 * @return {ReactorState}
	 */

	function reset(reactorState) {
	  var prevState = reactorState.get('state');

	  return reactorState.withMutations(function (reactorState) {
	    var storeMap = reactorState.get('stores');
	    var storeIds = storeMap.keySeq().toJS();
	    storeMap.forEach(function (store, id) {
	      var storeState = prevState.get(id);
	      var resetStoreState = store.handleReset(storeState);
	      if (resetStoreState === undefined && getOption(reactorState, 'throwOnUndefinedStoreReturnValue')) {
	        throw new Error('Store handleReset() must return a value, did you forget a return statement');
	      }
	      if (getOption(reactorState, 'throwOnNonImmutableStore') && !(0, _immutableHelpers.isImmutableValue)(resetStoreState)) {
	        throw new Error('Store reset state must be an immutable value, did you forget to call toImmutable');
	      }
	      reactorState.setIn(['state', id], resetStoreState);
	    });

	    reactorState.update('storeStates', function (storeStates) {
	      return incrementStoreStates(storeStates, storeIds);
	    });
	    resetDirtyStores(reactorState);
	  });
	}

	/**
	 * @param {ReactorState} reactorState
	 * @param {KeyPath|Gettter} keyPathOrGetter
	 * @return {EvaluateResult}
	 */

	function evaluate(reactorState, keyPathOrGetter) {
	  var state = reactorState.get('state');

	  if ((0, _keyPath.isKeyPath)(keyPathOrGetter)) {
	    // if its a keyPath simply return
	    return evaluateResult(state.getIn(keyPathOrGetter), reactorState);
	  } else if (!(0, _getter.isGetter)(keyPathOrGetter)) {
	    throw new Error('evaluate must be passed a keyPath or Getter');
	  }

	  // Must be a Getter
	  // if the value is cached for this dispatch cycle, return the cached value
	  if (isCached(reactorState, keyPathOrGetter)) {
	    // Cache hit
	    return evaluateResult(getCachedValue(reactorState, keyPathOrGetter), reactorState);
	  }

	  // evaluate dependencies
	  var args = (0, _getter.getDeps)(keyPathOrGetter).map(function (dep) {
	    return evaluate(reactorState, dep).result;
	  });
	  var evaluatedValue = (0, _getter.getComputeFn)(keyPathOrGetter).apply(null, args);

	  return evaluateResult(evaluatedValue, cacheValue(reactorState, keyPathOrGetter, evaluatedValue));
	}

	/**
	 * Returns serialized state for all stores
	 * @param {ReactorState} reactorState
	 * @return {Object}
	 */

	function serialize(reactorState) {
	  var serialized = {};
	  reactorState.get('stores').forEach(function (store, id) {
	    var storeState = reactorState.getIn(['state', id]);
	    var serializedState = store.serialize(storeState);
	    if (serializedState !== undefined) {
	      serialized[id] = serializedState;
	    }
	  });
	  return serialized;
	}

	/**
	 * Returns serialized state for all stores
	 * @param {ReactorState} reactorState
	 * @return {ReactorState}
	 */

	function resetDirtyStores(reactorState) {
	  return reactorState.set('dirtyStores', _immutable2['default'].Set());
	}

	/**
	 * Currently cache keys are always getters by reference
	 * @param {Getter} getter
	 * @return {Getter}
	 */
	function getCacheKey(getter) {
	  return getter;
	}

	/**
	 * @param {ReactorState} reactorState
	 * @param {Getter|KeyPath} keyPathOrGetter
	 * @return {Immutable.Map}
	 */
	function getCacheEntry(reactorState, keyPathOrGetter) {
	  var key = getCacheKey(keyPathOrGetter);
	  return reactorState.getIn(['cache', key]);
	}

	/**
	 * @param {ReactorState} reactorState
	 * @param {Getter} getter
	 * @return {Boolean}
	 */
	function isCached(reactorState, keyPathOrGetter) {
	  var entry = getCacheEntry(reactorState, keyPathOrGetter);
	  if (!entry) {
	    return false;
	  }

	  var storeStates = entry.get('storeStates');
	  if (storeStates.size === 0) {
	    // if there are no store states for this entry then it was never cached before
	    return false;
	  }

	  return storeStates.every(function (stateId, storeId) {
	    return reactorState.getIn(['storeStates', storeId]) === stateId;
	  });
	}

	/**
	 * Caches the value of a getter given state, getter, args, value
	 * @param {ReactorState} reactorState
	 * @param {Getter} getter
	 * @param {*} value
	 * @return {ReactorState}
	 */
	function cacheValue(reactorState, getter, value) {
	  var cacheKey = getCacheKey(getter);
	  var dispatchId = reactorState.get('dispatchId');
	  var storeDeps = (0, _getter.getStoreDeps)(getter);
	  var storeStates = (0, _immutableHelpers.toImmutable)({}).withMutations(function (map) {
	    storeDeps.forEach(function (storeId) {
	      var stateId = reactorState.getIn(['storeStates', storeId]);
	      map.set(storeId, stateId);
	    });
	  });

	  return reactorState.setIn(['cache', cacheKey], _immutable2['default'].Map({
	    value: value,
	    storeStates: storeStates,
	    dispatchId: dispatchId
	  }));
	}

	/**
	 * Pulls out the cached value for a getter
	 */
	function getCachedValue(reactorState, getter) {
	  var key = getCacheKey(getter);
	  return reactorState.getIn(['cache', key, 'value']);
	}

	/**
	 * @param {ReactorState} reactorState
	 * @return {ReactorState}
	 */
	function incrementId(reactorState) {
	  return reactorState.update('dispatchId', function (id) {
	    return id + 1;
	  });
	}

	/**
	 * @param {Immutable.Map} storeStates
	 * @param {Array} storeIds
	 * @return {Immutable.Map}
	 */
	function incrementStoreStates(storeStates, storeIds) {
	  return storeStates.withMutations(function (map) {
	    storeIds.forEach(function (id) {
	      var nextId = map.has(id) ? map.get(id) + 1 : 1;
	      map.set(id, nextId);
	    });
	  });
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _reactorFns = __webpack_require__(8);

	/* eslint-disable no-console */
	/**
	 * Wraps a Reactor.react invocation in a console.group
	 * @param {ReactorState} reactorState
	 * @param {String} type
	 * @param {*} payload
	*/
	exports.dispatchStart = function (reactorState, type, payload) {
	  if (!(0, _reactorFns.getOption)(reactorState, 'logDispatches')) {
	    return;
	  }

	  if (console.group) {
	    console.groupCollapsed('Dispatch: %s', type);
	    console.group('payload');
	    console.debug(payload);
	    console.groupEnd();
	  }
	};

	exports.dispatchError = function (reactorState, error) {
	  if (!(0, _reactorFns.getOption)(reactorState, 'logDispatches')) {
	    return;
	  }

	  if (console.group) {
	    console.debug('Dispatch error: ' + error);
	    console.groupEnd();
	  }
	};

	exports.dispatchEnd = function (reactorState, state, dirtyStores) {
	  if (!(0, _reactorFns.getOption)(reactorState, 'logDispatches')) {
	    return;
	  }

	  if (console.group) {
	    if ((0, _reactorFns.getOption)(reactorState, 'logDirtyStores')) {
	      console.log('Stores updated:', dirtyStores.toList().toJS());
	    }

	    if ((0, _reactorFns.getOption)(reactorState, 'logAppState')) {
	      console.debug('Dispatch done, new state: ', state.toJS());
	    }
	    console.groupEnd();
	  }
	};
	/* eslint-enable no-console */

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _immutable = __webpack_require__(3);

	var _immutable2 = _interopRequireDefault(_immutable);

	var _utils = __webpack_require__(4);

	var _keyPath = __webpack_require__(11);

	/**
	 * Getter helper functions
	 * A getter is an array with the form:
	 * [<KeyPath>, ...<KeyPath>, <function>]
	 */
	var identity = function identity(x) {
	  return x;
	};

	/**
	 * Checks if something is a getter literal, ex: ['dep1', 'dep2', function(dep1, dep2) {...}]
	 * @param {*} toTest
	 * @return {boolean}
	 */
	function isGetter(toTest) {
	  return (0, _utils.isArray)(toTest) && (0, _utils.isFunction)(toTest[toTest.length - 1]);
	}

	/**
	 * Returns the compute function from a getter
	 * @param {Getter} getter
	 * @return {function}
	 */
	function getComputeFn(getter) {
	  return getter[getter.length - 1];
	}

	/**
	 * Returns an array of deps from a getter
	 * @param {Getter} getter
	 * @return {function}
	 */
	function getDeps(getter) {
	  return getter.slice(0, getter.length - 1);
	}

	/**
	 * Returns an array of deps from a getter and all its deps
	 * @param {Getter} getter
	 * @param {Immutable.Set} existing
	 * @return {Immutable.Set}
	 */
	function getFlattenedDeps(getter, existing) {
	  if (!existing) {
	    existing = _immutable2['default'].Set();
	  }

	  var toAdd = _immutable2['default'].Set().withMutations(function (set) {
	    if (!isGetter(getter)) {
	      throw new Error('getFlattenedDeps must be passed a Getter');
	    }

	    getDeps(getter).forEach(function (dep) {
	      if ((0, _keyPath.isKeyPath)(dep)) {
	        set.add((0, _immutable.List)(dep));
	      } else if (isGetter(dep)) {
	        set.union(getFlattenedDeps(dep));
	      } else {
	        throw new Error('Invalid getter, each dependency must be a KeyPath or Getter');
	      }
	    });
	  });

	  return existing.union(toAdd);
	}

	/**
	 * @param {KeyPath}
	 * @return {Getter}
	 */
	function fromKeyPath(keyPath) {
	  if (!(0, _keyPath.isKeyPath)(keyPath)) {
	    throw new Error('Cannot create Getter from KeyPath: ' + keyPath);
	  }

	  return [keyPath, identity];
	}

	/**
	 * Adds non enumerated __storeDeps property
	 * @param {Getter}
	 */
	function getStoreDeps(getter) {
	  if (getter.hasOwnProperty('__storeDeps')) {
	    return getter.__storeDeps;
	  }

	  var storeDeps = getFlattenedDeps(getter).map(function (keyPath) {
	    return keyPath.first();
	  }).filter(function (x) {
	    return !!x;
	  });

	  Object.defineProperty(getter, '__storeDeps', {
	    enumerable: false,
	    configurable: false,
	    writable: false,
	    value: storeDeps
	  });

	  return storeDeps;
	}

	exports['default'] = {
	  isGetter: isGetter,
	  getComputeFn: getComputeFn,
	  getFlattenedDeps: getFlattenedDeps,
	  getStoreDeps: getStoreDeps,
	  getDeps: getDeps,
	  fromKeyPath: fromKeyPath
	};
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.isKeyPath = isKeyPath;
	exports.isEqual = isEqual;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _immutable = __webpack_require__(3);

	var _immutable2 = _interopRequireDefault(_immutable);

	var _utils = __webpack_require__(4);

	/**
	 * Checks if something is simply a keyPath and not a getter
	 * @param {*} toTest
	 * @return {boolean}
	 */

	function isKeyPath(toTest) {
	  return (0, _utils.isArray)(toTest) && !(0, _utils.isFunction)(toTest[toTest.length - 1]);
	}

	/**
	 * Checks if two keypaths are equal by value
	 * @param {KeyPath} a
	 * @param {KeyPath} a
	 * @return {Boolean}
	 */

	function isEqual(a, b) {
	  var iA = _immutable2['default'].List(a);
	  var iB = _immutable2['default'].List(b);

	  return _immutable2['default'].is(iA, iB);
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _immutable = __webpack_require__(3);

	var PROD_OPTIONS = (0, _immutable.Map)({
	  // logs information for each dispatch
	  logDispatches: false,
	  // log the entire app state after each dispatch
	  logAppState: false,
	  // logs what stores changed after a dispatch
	  logDirtyStores: false,
	  // if true, throws an error when dispatching an `undefined` actionType
	  throwOnUndefinedActionType: false,
	  // if true, throws an error if a store returns undefined
	  throwOnUndefinedStoreReturnValue: false,
	  // if true, throws an error if a store.getInitialState() returns a non immutable value
	  throwOnNonImmutableStore: false,
	  // if true, throws when dispatching in dispatch
	  throwOnDispatchInDispatch: false
	});

	exports.PROD_OPTIONS = PROD_OPTIONS;
	var DEBUG_OPTIONS = (0, _immutable.Map)({
	  // logs information for each dispatch
	  logDispatches: true,
	  // log the entire app state after each dispatch
	  logAppState: true,
	  // logs what stores changed after a dispatch
	  logDirtyStores: true,
	  // if true, throws an error when dispatching an `undefined` actionType
	  throwOnUndefinedActionType: true,
	  // if true, throws an error if a store returns undefined
	  throwOnUndefinedStoreReturnValue: true,
	  // if true, throws an error if a store.getInitialState() returns a non immutable value
	  throwOnNonImmutableStore: true,
	  // if true, throws when dispatching in dispatch
	  throwOnDispatchInDispatch: true
	});

	exports.DEBUG_OPTIONS = DEBUG_OPTIONS;
	var ReactorState = (0, _immutable.Record)({
	  dispatchId: 0,
	  state: (0, _immutable.Map)(),
	  stores: (0, _immutable.Map)(),
	  cache: (0, _immutable.Map)(),
	  // maintains a mapping of storeId => state id (monotomically increasing integer whenever store state changes)
	  storeStates: (0, _immutable.Map)(),
	  dirtyStores: (0, _immutable.Set)(),
	  debug: false,
	  // production defaults
	  options: PROD_OPTIONS
	});

	exports.ReactorState = ReactorState;
	var ObserverState = (0, _immutable.Record)({
	  // observers registered to any store change
	  any: (0, _immutable.Set)(),
	  // observers registered to specific store changes
	  stores: (0, _immutable.Map)({}),

	  observersMap: (0, _immutable.Map)({}),

	  nextId: 1
	});
	exports.ObserverState = ObserverState;

/***/ }
/******/ ])
});
;
});

var nuclearJS = (nuclear && typeof nuclear === 'object' && 'default' in nuclear ? nuclear['default'] : nuclear);

var index = createCommonjsModule(function (module) {
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

"use strict";

/**
 * Constructs an enumeration with keys equal to their value.
 *
 * For example:
 *
 *   var COLORS = keyMirror({blue: null, red: null});
 *   var myColor = COLORS.blue;
 *   var isColorValid = !!COLORS[myColor];
 *
 * The last line could not be performed if the values of the generated enum were
 * not equal to their keys.
 *
 *   Input:  {key1: val1, key2: val2}
 *   Output: {key1: key1, key2: key2}
 *
 * @param {object} obj
 * @return {object}
 */
var keyMirror = function(obj) {
  var ret = {};
  var key;
  if (!(obj instanceof Object && !Array.isArray(obj))) {
    throw new Error('keyMirror(...): Argument must be an object.');
  }
  for (key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }
    ret[key] = key;
  }
  return ret;
};

module.exports = keyMirror;
});

var keyMirror = (index && typeof index === 'object' && 'default' in index ? index['default'] : index);

var actionTypes = keyMirror({
  VALIDATING_AUTH_TOKEN: null,
  VALID_AUTH_TOKEN: null,
  INVALID_AUTH_TOKEN: null,
  LOG_OUT: null,
});

const { Store, toImmutable } = nuclearJS;

const INSTANCE = new Store({
  getInitialState() {
    return toImmutable({
      isValidating: false,
      authToken: false,
      host: null,
      isInvalid: false,
      errorMessage: '',
    });
  },

  initialize() {
    /* eslint-disable no-use-before-define */
    this.on(actionTypes.VALIDATING_AUTH_TOKEN, startValidate);
    this.on(actionTypes.VALID_AUTH_TOKEN, validateSuccess);
    this.on(actionTypes.INVALID_AUTH_TOKEN, validateFail);
    /* eslint-enable no-use-before-define */
  },
});

// using True as string to workaround a bug.

function startValidate(state, { authToken, host }) {
  return toImmutable({
    authToken,
    host,
    isValidating: true,
    isInvalid: false,
    errorMessage: '',
  });
}

function validateSuccess() {
  return INSTANCE.getInitialState();
}

function validateFail(state, { errorMessage }) {
  return state.withMutations(mState =>
    mState
      .set('isValidating', false)
      .set('isInvalid', true)
      .set('errorMessage', errorMessage)
  );
}

const { Store: Store$1, toImmutable: toImmutable$1 } = nuclearJS;

const INSTANCE$1 = new Store$1({
  getInitialState() {
    return toImmutable$1({
      authToken: null,
      host: '',
    });
  },

  initialize() {
    /* eslint-disable no-use-before-define */
    this.on(actionTypes.VALID_AUTH_TOKEN, validateSuccess$1);
    this.on(actionTypes.LOG_OUT, logOut);
    /* eslint-enable no-use-before-define */
  },
});

function validateSuccess$1(state, { authToken, host }) {
  return toImmutable$1({ authToken, host });
}

function logOut() {
  return INSTANCE$1.getInitialState();
}

const { Store: Store$2 } = nuclearJS;

const INSTANCE$2 = new Store$2({
  getInitialState() {
    return true;
  },

  initialize() {
    /* eslint-disable no-use-before-define */
    this.on(actionTypes.VALID_AUTH_TOKEN, storeRememberAuth);
    /* eslint-enable no-use-before-define */
  },
});

function storeRememberAuth(state, { rememberAuth }) {
  return rememberAuth;
}

var actionTypes$1 = keyMirror({
  STREAM_START: null,
  STREAM_STOP: null,
  STREAM_ERROR: null,
});

var isSupported = typeof window === 'object' && 'EventSource' in window;

const { Store: Store$3, toImmutable: toImmutable$2 } = nuclearJS;

const INSTANCE$3 = new Store$3({
  getInitialState() {
    return toImmutable$2({
      // is streaming supported
      isSupported,
      // if we are streaming
      isStreaming: false,
      // if the user wants us to use streaming
      useStreaming: true,
      // if we have a streaming error
      hasError: false,
    });
  },

  initialize() {
    /* eslint-disable no-use-before-define */
    this.on(actionTypes$1.STREAM_START, startStream);
    this.on(actionTypes$1.STREAM_STOP, stopStream);
    this.on(actionTypes$1.STREAM_ERROR, errorStream);
    this.on(actionTypes$1.LOG_OUT, logOut$2);
    /* eslint-enable no-use-before-define */
  },
});

function startStream(state) {
  return state.withMutations(map => {
    map.set('isStreaming', true)
       .set('useStreaming', true)
       .set('hasError', false);
  });
}

function stopStream(state) {
  return state.withMutations(map => {
    map.set('isStreaming', false)
       .set('useStreaming', false)
       .set('hasError', false);
  });
}

function errorStream(state) {
  return state.withMutations(map => {
    map.set('isStreaming', false)
       .set('hasError', true);
  });
}

function logOut$2() {
  return INSTANCE$3.getInitialState();
}

var actionTypes$2 = keyMirror({
  API_FETCH_ALL_START: null,
  API_FETCH_ALL_SUCCESS: null,
  API_FETCH_ALL_FAIL: null,

  SYNC_SCHEDULED: null,
  SYNC_SCHEDULE_CANCELLED: null,
});

const { Store: Store$4 } = nuclearJS;

const INSTANCE$4 = new Store$4({
  getInitialState() {
    return true;
  },

  initialize() {
    this.on(actionTypes$2.API_FETCH_ALL_START, () => true);
    this.on(actionTypes$2.API_FETCH_ALL_SUCCESS, () => false);
    this.on(actionTypes$2.API_FETCH_ALL_FAIL, () => false);
    this.on(actionTypes$2.LOG_OUT, () => false);
  },
});

const { Store: Store$5 } = nuclearJS;

const INSTANCE$5 = new Store$5({
  getInitialState() {
    return false;
  },

  initialize() {
    this.on(actionTypes$2.SYNC_SCHEDULED, () => true);
    this.on(actionTypes$2.SYNC_SCHEDULE_CANCELLED, () => false);
    this.on(actionTypes$2.LOG_OUT, () => false);
  },
});

var restApiActionTypes = keyMirror({
  API_FETCH_SUCCESS: null,
  API_FETCH_START: null,
  API_FETCH_FAIL: null,

  API_SAVE_SUCCESS: null,
  API_SAVE_START: null,
  API_SAVE_FAIL: null,

  API_DELETE_SUCCESS: null,
  API_DELETE_START: null,
  API_DELETE_FAIL: null,

  LOG_OUT: null,
});

const { Store: Store$6, toImmutable: toImmutable$4 } = nuclearJS;

const INSTANCE$6 = new Store$6({
  getInitialState() {
    return toImmutable$4({});
  },

  initialize() {
    /* eslint-disable no-use-before-define */
    this.on(restApiActionTypes.API_FETCH_SUCCESS, loadData);
    this.on(restApiActionTypes.API_SAVE_SUCCESS, loadData);
    this.on(restApiActionTypes.API_DELETE_SUCCESS, removeData);
    this.on(restApiActionTypes.LOG_OUT, () => this.getInitialState());
    /* eslint-enable no-use-before-define */
  },
});

/**
 * @param {Immutable.Map} state
 * @param {Object} payload
 * @param {Model} payload.model
 * @param {any} payload.params
 * @param {Object|Array} payload.result
 */
function loadData(state, { model, result, params }) {
  const entity = model.entity;

  if (!result) {
    // no-op if no real data was returned
    return state;
  }

  const newState = params.replace ? state.set(entity, toImmutable$4({})) : state;
  const data = Array.isArray(result) ? result : [result];
  const fromJSON = model.fromJSON || toImmutable$4;

  return newState.withMutations(mState =>
    data.forEach(jsonObj => {
      const entry = fromJSON(jsonObj);
      mState.setIn([entity, entry.id], entry);
    })
  );
}

/**
 * @param {Immutable.Map} state
 * @param {Object} payload
 * @param {Model} payload.model
 * @param {any} payload.params
 * @param {Object|Array} payload.result
 */
function removeData(state, { model, params }) {
  return state.removeIn([model.entity, params.id]);
}

var index$1 = createCommonjsModule(function (module) {
'use strict';
/* eslint-disable no-unused-vars */
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (e) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (Object.getOwnPropertySymbols) {
			symbols = Object.getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};
});

var objectAssign = (index$1 && typeof index$1 === 'object' && 'default' in index$1 ? index$1['default'] : index$1);

/**
 * @param {Object} model
 * @param {String} model.entity
 * @param {Function} model.save
 * @param {Function} model.fetch
 * @param {Function} model.fetchAll
 * @param {Function} model.delete
 * @return {Object}
 */
function createApiActions$1(model) {
  const apiActions = {};
  /* eslint-disable no-use-before-define */
  apiActions.incrementData = function incrementData(reactor, data, params = {}) {
    onFetchSuccess(reactor, model, params, data);
  };

  apiActions.replaceData = function replaceData(reactor, data, params = {}) {
    onFetchSuccess(reactor, model, objectAssign({}, params, { replace: true }), data);
  };

  apiActions.removeData = function removeData(reactor, id) {
    onDeleteSuccess(reactor, model, { id });
  };

  if (model.fetch) {
    apiActions.fetch = function fetchAction(reactor, params = {}) {
      reactor.dispatch(restApiActionTypes.API_FETCH_START, {
        model,
        params,
        method: 'fetch',
      });
      return model.fetch(reactor, params).then(
        onFetchSuccess.bind(null, reactor, model, params),
        onFetchFail.bind(null, reactor, model, params)
      );
    };
  }

  apiActions.fetchAll = function fetchAllAction(reactor, params = {}) {
    reactor.dispatch(restApiActionTypes.API_FETCH_START, {
      model,
      params,
      method: 'fetchAll',
    });
    return model.fetchAll(reactor, params).then(
      onFetchSuccess.bind(null, reactor, model, objectAssign({}, params, { replace: true })),
      onFetchFail.bind(null, reactor, model, params)
    );
  };

  if (model.save) {
    apiActions.save = function saveAction(reactor, params = {}) {
      reactor.dispatch(restApiActionTypes.API_SAVE_START, {
        params,
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
      reactor.dispatch(restApiActionTypes.API_DELETE_START, {
        params,
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
  reactor.dispatch(restApiActionTypes.API_FETCH_SUCCESS, {
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
  reactor.dispatch(restApiActionTypes.API_FETCH_FAIL, {
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
  reactor.dispatch(restApiActionTypes.API_SAVE_SUCCESS, {
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
  reactor.dispatch(restApiActionTypes.API_SAVE_FAIL, {
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
  reactor.dispatch(restApiActionTypes.API_DELETE_SUCCESS, {
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
  reactor.dispatch(restApiActionTypes.API_DELETE_FAIL, {
    model,
    params,
    reason,
  });
  return Promise.reject(reason);
}

const { toImmutable: toImmutable$3 } = nuclearJS;

const createApiActions = createApiActions$1;

function register$3(reactor) {
  reactor.registerStores({
    restApiCache: INSTANCE$6,
  });
}

/**
 * Creates a getter if a particular entity has data.
 */
function createHasDataGetter(model) {
  return [
    ['restApiCache', model.entity],
    entityMap => !!entityMap,
  ];
}

/**
 * Creates a getter to the restApiCache store for a particular entity
 * This decouples the implementation details of the RestApi module's caching
 * to consumers of the cached data
 * @param {Model} model
 */
function createEntityMapGetter(model) {
  return [
    ['restApiCache', model.entity],
    entityMap => entityMap || toImmutable$3({}),
  ];
}

/**
 * Creates a function that creates a getter that looks up the entity in the restApiCache by ID
 * @param {Model} model
 */
function createByIdGetter(model) {
  return function idGetter(id) {
    return ['restApiCache', model.entity, id];
  };
}


var restApi = Object.freeze({
  createApiActions: createApiActions,
  register: register$3,
  createHasDataGetter: createHasDataGetter,
  createEntityMapGetter: createEntityMapGetter,
  createByIdGetter: createByIdGetter
});

const hasMediaStates = ['playing', 'paused', 'unknown'];

class MediaPlayer {
  constructor(hass, stateObj) {
    this.serviceActions = hass.serviceActions;
    this.stateObj = stateObj;
  }

  get isOff() {
    return this.stateObj.state === 'off';
  }

  get isIdle() {
    return this.stateObj.state === 'idle';
  }

  get isMuted() {
    return this.stateObj.attributes.is_volume_muted;
  }

  get isPaused() {
    return this.stateObj.state === 'paused';
  }

  get isPlaying() {
    return this.stateObj.state === 'playing';
  }

  get isMusic() {
    return this.stateObj.attributes.media_content_type === 'music';
  }

  get isTVShow() {
    return this.stateObj.attributes.media_content_type === 'tvshow';
  }

  get hasMediaControl() {
    return hasMediaStates.indexOf(this.stateObj.state) !== -1;
  }

  get volumeSliderValue() {
    return this.stateObj.attributes.volume_level * 100;
  }

  get supportsPause() {
    return (this.stateObj.attributes.supported_media_commands & 1) !== 0;
  }

  get supportsVolumeSet() {
    return (this.stateObj.attributes.supported_media_commands & 4) !== 0;
  }

  get supportsVolumeMute() {
    return (this.stateObj.attributes.supported_media_commands & 8) !== 0;
  }

  get supportsPreviousTrack() {
    return (this.stateObj.attributes.supported_media_commands & 16) !== 0;
  }

  get supportsNextTrack() {
    return (this.stateObj.attributes.supported_media_commands & 32) !== 0;
  }

  get supportsTurnOn() {
    return (this.stateObj.attributes.supported_media_commands & 128) !== 0;
  }

  get supportsTurnOff() {
    return (this.stateObj.attributes.supported_media_commands & 256) !== 0;
  }

  get supportsVolumeButtons() {
    return (this.stateObj.attributes.supported_media_commands & 1024) !== 0;
  }

  get primaryText() {
    return this.stateObj.attributes.media_title ||
           this.stateObj.stateDisplay;
  }

  get secondaryText() {
    if (this.isMusic) {
      return this.stateObj.attributes.media_artist;
    } else if (this.isTVShow) {
      let text = this.stateObj.attributes.media_series_title;

      if (this.stateObj.attributes.media_season) {
        text += ` S${this.stateObj.attributes.media_season}`;

        if (this.stateObj.attributes.media_episode) {
          text += `E${this.stateObj.attributes.media_episode}`;
        }
      }

      return text;
    } else if (this.stateObj.attributes.app_name) {
      return this.stateObj.attributes.app_name;
    }
    return '';
  }

  mediaPlayPause() {
    this.callService('media_play_pause');
  }

  nextTrack() {
    this.callService('media_next_track');
  }

  playbackControl() {
    this.callService('media_play_pause');
  }

  previousTrack() {
    this.callService('media_previous_track');
  }

  setVolume(volume) {
    this.callService('volume_set', { volume_level: volume });
  }

  togglePower() {
    if (this.isOff) {
      this.turnOn();
    } else {
      this.turnOff();
    }
  }

  turnOff() {
    this.callService('turn_off');
  }

  turnOn() {
    this.callService('turn_on');
  }

  volumeDown() {
    this.callService('volume_down');
  }

  volumeMute(mute) {
    if (!this.supportsVolumeMute) {
      throw new Error('Muting volume not supported');
    }
    this.callService('volume_mute', { is_volume_muted: mute });
  }

  volumeUp() {
    this.callService('volume_down');
  }

  // helper method

  callService(service, data) {
    const serviceData = data || {};
    serviceData.entity_id = this.stateObj.entityId;
    this.serviceActions.callService('media_player', service, serviceData);
  }
}

function parseDateTime(datetime) {
  return new Date(datetime);
}

function callApi$1(reactor, method, path, parameters = null) {
  const authInfo = reactor.evaluate(authGetters.authInfo);
  const url = `${authInfo.host}/api/${path}`;

  if (false) {}

  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open(method, url, true);
    req.setRequestHeader('X-HA-access', authInfo.authToken);

    req.onload = () => {
      let content;

      try {
        if (req.getResponseHeader('content-type') === 'application/json') {
          content = JSON.parse(req.responseText);
        } else {
          content = req.responseText;
        }
      } catch (err) {
        content = req.responseText;
      }

      if (req.status > 199 && req.status < 300) {
        resolve(content);
      } else {
        reject(content);
      }
    };

    req.onerror = () => reject({});

    if (parameters) {
      req.send(JSON.stringify(parameters));
    } else {
      req.send();
    }
  });
}

const callApi = callApi$1;

const { Immutable, toJS } = nuclearJS;
const ENTITY = 'entity';

const ImmutableEntity = new Immutable.Record({
  entityId: null,
  domain: null,
  objectId: null,
  state: null,
  entityDisplay: null,
  stateDisplay: null,
  lastChanged: null,
  lastChangedAsDate: null,
  lastUpdated: null,
  lastUpdatedAsDate: null,
  attributes: {},
  isCustomGroup: null,
}, 'Entity');

class State extends ImmutableEntity {
  constructor(entityId, state, lastChanged, lastUpdated, attributes = {}) {
    const [domain, objectId] = entityId.split('.');
    let stateDisplay = state.replace(/_/g, ' ');

    if (attributes.unit_of_measurement) {
      stateDisplay += ` ${attributes.unit_of_measurement}`;
    }

    super({
      entityId,
      domain,
      objectId,
      state,
      stateDisplay,
      lastChanged,
      lastUpdated,
      attributes,
      entityDisplay: attributes.friendly_name || objectId.replace(/_/g, ' '),
      lastChangedAsDate: parseDateTime(lastChanged),
      lastUpdatedAsDate: parseDateTime(lastUpdated),
      isCustomGroup: domain === 'group' && !attributes.auto,
    });
  }

  get id() {
    return this.entityId;
  }

  domainModel(hass) {
    if (this.domain !== 'media_player') {
      throw new Error('Domain does not have a model');
    }
    return new MediaPlayer(hass, this);
  }

  static delete(reactor, instance) {
    return callApi(reactor, 'DELETE', `states/${instance.entityId}`);
  }

  static save(reactor, instance) {
    const { entityId, state, attributes = {} } = toJS(instance);
    const payload = { state, attributes };

    return callApi(reactor, 'POST', `states/${entityId}`, payload);
  }

  static fetch(reactor, id) {
    return callApi(reactor, 'GET', `states/${id}`);
  }

  static fetchAll(reactor) {
    return callApi(reactor, 'GET', 'states');
  }

  static fromJSON({ entity_id, state, last_changed, last_updated, attributes }) {
    /* eslint-disable camelcase */
    return new State(entity_id, state, last_changed, last_updated, attributes);
    /* eslint-enable camelcase */
  }

}

State.entity = ENTITY;

const entityApiActions = createApiActions(State);

const hasData = createHasDataGetter(State);

const entityMap = createEntityMapGetter(State);

const byId = createByIdGetter(State);

const visibleEntityMap = [
  entityMap,
  entities => entities.filter(entity => !entity.attributes.hidden),
];


var _getters$1 = Object.freeze({
  hasData: hasData,
  entityMap: entityMap,
  byId: byId,
  visibleEntityMap: visibleEntityMap
});

const entityActions = entityApiActions;
const entityGetters = _getters$1;


var entity = Object.freeze({
	actions: entityActions,
	getters: entityGetters
});

var actionTypes$3 = keyMirror({
  NOTIFICATION_CREATED: null,
});

const { Store: Store$7, Immutable: Immutable$1 } = nuclearJS;

const INSTANCE$7 = new Store$7({
  getInitialState() {
    return new Immutable$1.OrderedMap();
  },

  initialize() {
    /* eslint-disable no-use-before-define */
    this.on(actionTypes$3.NOTIFICATION_CREATED, notificationCreated);
    this.on(actionTypes$3.LOG_OUT, logOut$3);
    /* eslint-enable no-use-before-define */
  },
});

function notificationCreated(state, { message }) {
  return state.set(state.size, message);
}

function logOut$3() {
  return INSTANCE$7.getInitialState();
}

function createNotification(reactor, message) {
  reactor.dispatch(actionTypes$3.NOTIFICATION_CREATED, { message });
}


var _actions$3 = Object.freeze({
  createNotification: createNotification
});

const notificationMap = [
  'notifications',
];

const lastNotificationMessage = [
  notificationMap,
  map => map.last(),
];


var _getters$2 = Object.freeze({
  notificationMap: notificationMap,
  lastNotificationMessage: lastNotificationMessage
});

function register$4(reactor) {
  reactor.registerStores({ notifications: INSTANCE$7 });
}

const notificationActions = _actions$3;
const getters$3 = _getters$2;


var notification = Object.freeze({
  register: register$4,
  actions: notificationActions,
  getters: getters$3
});

const { Immutable: Immutable$2 } = nuclearJS;
const ENTITY$1 = 'event';

const ImmutableEvent = new Immutable$2.Record({
  event: null,
  listenerCount: 0,
}, 'Event');

class Event extends ImmutableEvent {
  constructor(event, listenerCount = 0) {
    super({ event, listenerCount });
  }

  get id() {
    return this.event;
  }

  static fetchAll(reactor) {
    return callApi(reactor, 'GET', 'events');
  }

  static fromJSON({ event, listener_count }) {
    /* eslint-disable camelcase */
    return new Event(event, listener_count);
    /* eslint-enable camelcase */
  }

}

Event.entity = ENTITY$1;

const eventApiActions = createApiActions(Event);

eventApiActions.fireEvent = function fireEvent(reactor, eventType, eventData = {}) {
  return callApi(reactor, 'POST', `events/${eventType}`, eventData).then(
    () => {
      notificationActions.createNotification(
        reactor,
        `Event ${eventType} successful fired!`);
    }
  );
};

const hasData$1 = createHasDataGetter(Event);

const entityMap$1 = createEntityMapGetter(Event);

const byId$1 = createByIdGetter(Event);


var _getters$3 = Object.freeze({
	hasData: hasData$1,
	entityMap: entityMap$1,
	byId: byId$1
});

const actions$3 = eventApiActions;
const getters$2 = _getters$3;


var event = Object.freeze({
	actions: actions$3,
	getters: getters$2
});

const { Immutable: Immutable$3, toImmutable: toImmutable$5 } = nuclearJS;
const ENTITY$2 = 'service';

const ImmutableService = new Immutable$3.Record({
  domain: null,
  services: [],
}, 'ServiceDomain');

class ServiceDomain extends ImmutableService {
  constructor(domain, services) {
    super({ domain, services });
  }

  get id() {
    return this.domain;
  }

  static fetchAll() {
    return callApi('GET', 'services');
  }

  static fromJSON({ domain, services }) {
    return new ServiceDomain(domain, toImmutable$5(services));
  }

}

ServiceDomain.entity = ENTITY$2;

function canToggleDomain(domain, servicesMap) {
  if (domain === 'lock') return true;
  if (domain === 'garage_door') return true;
  const serviceDomain = servicesMap.get(domain);
  return !!serviceDomain && serviceDomain.services.has('turn_on');
}

function canToggleEntity$1(entity, servicesMap) {
  if (!entity) {
    return false;
  }
  if (entity.domain === 'group') {
    return entity.state === 'on' || entity.state === 'off';
  }
  return canToggleDomain(entity.domain, servicesMap);
}

const hasData$2 = createHasDataGetter(ServiceDomain);

const entityMap$2 = createEntityMapGetter(ServiceDomain);

const byDomain = createByIdGetter(ServiceDomain);

function hasService(domain, service) {
  return [
    byDomain(domain),
    serviceDomain => !!serviceDomain && serviceDomain.services.has(service),
  ];
}

function canToggleEntity(entityId) {
  return [
    entityGetters.byId(entityId),
    entityMap$2,
    canToggleEntity$1,
  ];
}


var _getters$4 = Object.freeze({
  hasData: hasData$2,
  entityMap: entityMap$2,
  byDomain: byDomain,
  hasService: hasService,
  canToggleEntity: canToggleEntity
});

const serviceApiActions = createApiActions(ServiceDomain);

serviceApiActions.serviceRegistered = function serviceRegistered(reactor, domain, service) {
  let serviceDomain = reactor.evaluateToJS(byDomain(domain));

  if (serviceDomain) {
    serviceDomain.services.push(service);
  } else {
    serviceDomain = {
      domain,
      services: [service],
    };
  }

  serviceApiActions.incrementData(reactor, serviceDomain);
};

serviceApiActions.callTurnOn = function callTurnOn(reactor, entityId, params = {}) {
  return serviceApiActions.callService(
    reactor, 'homeassistant', 'turn_on', objectAssign({}, params, { entity_id: entityId }));
};

serviceApiActions.callTurnOff = function callTurnOff(reactor, entityId, params = {}) {
  return serviceApiActions.callService(
    reactor, 'homeassistant', 'turn_off', objectAssign({}, params, { entity_id: entityId }));
};

serviceApiActions.callService = function callService(reactor, domain, service, params = {}) {
  return callApi(reactor, 'POST', `services/${domain}/${service}`, params).then(
    (states) => {
      if (service === 'turn_on' && params.entity_id) {
        notificationActions.createNotification(
          reactor, `Turned on ${params.entity_id}.`);
      } else if (service === 'turn_off' && params.entity_id) {
        notificationActions.createNotification(
          reactor, `Turned off ${params.entity_id}.`);
      } else {
        notificationActions.createNotification(
          reactor, `Service ${domain}/${service} called.`);
      }

      entityActions.incrementData(reactor, states);
    }
  );
};

const serviceActions = serviceApiActions;
const getters$4 = _getters$4;


var service = Object.freeze({
	actions: serviceActions,
	getters: getters$4
});

const isDataLoaded = [
  entityGetters.hasData,
  getters$2.hasData,
  getters$4.hasData,
  (hasEntityData, hasEventData, hasServiceData) =>
    hasEntityData && hasEventData && hasServiceData,
];

const isFetching = [
  'isFetchingData',
];

const isSyncScheduled = [
  'isSyncScheduled',
];


var _getters = Object.freeze({
  isDataLoaded: isDataLoaded,
  isFetching: isFetching,
  isSyncScheduled: isSyncScheduled
});

/* eslint-disable */
// Forked while waiting for this PR to land:
// https://github.com/component/debounce/pull/10
// MIT License
/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing. The function also has a property 'clear' 
 * that is a function which will clear the timer to prevent previously scheduled executions. 
 *
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */

function debounce(func, wait, immediate){
  var timeout, args, context, timestamp, result;
  if (null == wait) wait = 100;

  function later() {
    var last = new Date().getTime() - timestamp;

    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  var debounced = function(){
    context = this;
    args = arguments;
    timestamp = new Date().getTime();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };

  debounced.clear = function() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
};

var actionTypes$4 = keyMirror({
  SERVER_CONFIG_LOADED: null,
  COMPONENT_LOADED: null,
  LOG_OUT: null,
});

const { Store: Store$8, toImmutable: toImmutable$6 } = nuclearJS;

const INSTANCE$8 = new Store$8({
  getInitialState() {
    return toImmutable$6([]);
  },

  initialize() {
    /* eslint-disable no-use-before-define */
    this.on(actionTypes$4.COMPONENT_LOADED, componentLoaded);
    this.on(actionTypes$4.SERVER_CONFIG_LOADED, serverConfigLoaded);
    this.on(actionTypes$4.LOG_OUT, logOut$4);
    /* eslint-enable no-use-before-define */
  },
});

function componentLoaded(state, { component }) {
  return state.push(component);
}

function serverConfigLoaded(state, { components }) {
  return toImmutable$6(components);
}

function logOut$4() {
  return INSTANCE$8.getInitialState();
}

const { Store: Store$9, toImmutable: toImmutable$7 } = nuclearJS;

const INSTANCE$9 = new Store$9({
  getInitialState() {
    return toImmutable$7({
      latitude: null,
      longitude: null,
      location_name: 'Home',
      temperature_unit: '°C',
      time_zone: 'UTC',
      serverVersion: 'unknown',
    });
  },

  initialize() {
    /* eslint-disable no-use-before-define */
    this.on(actionTypes$4.SERVER_CONFIG_LOADED, serverConfigLoaded$1);
    this.on(actionTypes$4.LOG_OUT, logOut$5);
    /* eslint-enable no-use-before-define */
  },
});

function serverConfigLoaded$1(state, {
  latitude, longitude, location_name, temperature_unit, time_zone, version,
}) {
  return toImmutable$7({
    latitude,
    longitude,
    location_name,
    temperature_unit,
    time_zone,
    serverVersion: version,
  });
}

function logOut$5() {
  return INSTANCE$9.getInitialState();
}

function configLoaded(reactor, config) {
  reactor.dispatch(actionTypes$4.SERVER_CONFIG_LOADED, config);
}

function fetchAll$1(reactor) {
  callApi(reactor, 'GET', 'config').then(
    config => configLoaded(reactor, config));
}

function componentLoaded$1(reactor, component) {
  reactor.dispatch(actionTypes$4.COMPONENT_LOADED, { component });
}


var _actions$4 = Object.freeze({
  configLoaded: configLoaded,
  fetchAll: fetchAll$1,
  componentLoaded: componentLoaded$1
});

const locationGPS = [
  ['serverConfig', 'latitude'],
  ['serverConfig', 'longitude'],
  (latitude, longitude) => ({ latitude, longitude }),
];

const locationName = [
  'serverConfig',
  'location_name',
];

const serverVersion = [
  'serverConfig',
  'serverVersion',
];

function isComponentLoaded(component) {
  return [
    ['serverComponent'],
    components => components.contains(component),
  ];
}


var _getters$5 = Object.freeze({
  locationGPS: locationGPS,
  locationName: locationName,
  serverVersion: serverVersion,
  isComponentLoaded: isComponentLoaded
});

function register$5(reactor) {
  reactor.registerStores({ serverComponent: INSTANCE$8, serverConfig: INSTANCE$9 });
}

const configActions = _actions$4;
const getters$5 = _getters$5;


var config = Object.freeze({
  register: register$5,
  actions: configActions,
  getters: getters$5
});

const SYNC_INTERVAL = 30000;
const SCHEDULED_SYNCS = {};

function isSyncing(reactor) {
  return reactor.evaluate(isSyncScheduled);
}

function scheduleSync(reactor) {
  if (!isSyncing(reactor)) {
    return;
  }
  if (!(reactor.hassId in SCHEDULED_SYNCS)) {
    /* eslint-disable no-use-before-define */
    SCHEDULED_SYNCS[reactor.hassId] = debounce(fetchAll.bind(null, reactor), SYNC_INTERVAL);
    /* eslint-enable no-use-before-define */
  }

  SCHEDULED_SYNCS[reactor.hassId]();
}

function unscheduleSync(reactor) {
  const sync = SCHEDULED_SYNCS[reactor.hassId];

  if (sync) {
    sync.clear();
  }
}

function fetchAll(reactor) {
  reactor.dispatch(actionTypes$2.API_FETCH_ALL_START, {});

  return callApi(reactor, 'GET', 'bootstrap').then(data => {
    reactor.batch(() => {
      entityActions.replaceData(reactor, data.states);
      serviceActions.replaceData(reactor, data.services);
      actions$3.replaceData(reactor, data.events);
      configActions.configLoaded(reactor, data.config);

      reactor.dispatch(actionTypes$2.API_FETCH_ALL_SUCCESS, {});
    });

    scheduleSync(reactor);
  }, message => {
    reactor.dispatch(actionTypes$2.API_FETCH_ALL_FAIL, { message });

    scheduleSync(reactor);

    return Promise.reject(message);
  });
}

function start$1(reactor, { skipInitialSync = false } = {}) {
  reactor.dispatch(actionTypes$2.SYNC_SCHEDULED);

  if (skipInitialSync) {
    scheduleSync(reactor);
  } else {
    fetchAll(reactor);
  }
}

function stop$1(reactor) {
  reactor.dispatch(actionTypes$2.SYNC_SCHEDULE_CANCELLED);
  unscheduleSync(reactor);
}


var _actions$2 = Object.freeze({
  fetchAll: fetchAll,
  start: start$1,
  stop: stop$1
});

function register$2(reactor) {
  reactor.registerStores({ isFetchingData: INSTANCE$4, isSyncScheduled: INSTANCE$5 });
}

const actions$2 = _actions$2;
const getters$1 = _getters;


var sync = Object.freeze({
  register: register$2,
  actions: actions$2,
  getters: getters$1
});

function handleRemoteEvent (reactor, event) {
  if (false) {}

  switch (event.event_type) {
    case 'state_changed':
      if (event.data.new_state) {
        entityActions.incrementData(reactor, event.data.new_state);
      } else {
        entityActions.removeData(reactor, event.data.entity_id);
      }

      break;

    case 'component_loaded':
      configActions.componentLoaded(reactor, event.data.component);
      break;

    case 'service_registered':
      serviceActions.serviceRegistered(reactor, event.data.domain, event.data.service);
      break;

    default:
  }
}

// maximum time we can go without receiving anything from the server
const MAX_INACTIVITY_TIME = 60000;
const RETRY_TIME = 3000;
const STREAMS = {};
const EVENTS = ['state_changed', 'component_loaded', 'service_registered'].join(',');

function stopStream$1(reactor) {
  const stream = STREAMS[reactor.hassId];

  if (!stream) {
    return;
  }

  stream.scheduleHealthCheck.clear();
  stream.source.close();
  STREAMS[reactor.hassId] = false;
}

function start(reactor, { syncOnInitialConnect = true } = {}) {
  stopStream$1(reactor);

  // Called on each interaction with EventSource
  // When debounce is done we exceeded MAX_INACTIVITY_TIME.
  // Why? Because the error event listener on EventSource cannot be trusted.
  const reconnect = debounce(start.bind(null, reactor), RETRY_TIME);
  const scheduleHealthCheck = debounce(start.bind(null, reactor), MAX_INACTIVITY_TIME);
  const authToken = reactor.evaluate(authGetters.authToken);
  const source = new EventSource(`/api/stream?api_password=${authToken}&restrict=${EVENTS}`);
  let syncOnConnect = syncOnInitialConnect;

  STREAMS[reactor.hassId] = {
    source,
    scheduleHealthCheck,
  };

  source.addEventListener('open', () => {
    scheduleHealthCheck();

    reactor.batch(() => {
      reactor.dispatch(actionTypes$1.STREAM_START);

      // We are streaming, fetch latest info but stop syncing
      actions$2.stop(reactor);

      if (syncOnConnect) {
        actions$2.fetchAll(reactor);
      } else {
        syncOnConnect = true;
      }
    });
  }, false);

  source.addEventListener('message', (ev) => {
    scheduleHealthCheck();

    if (ev.data !== 'ping') {
      handleRemoteEvent(reactor, JSON.parse(ev.data));
    }
  }, false);

  source.addEventListener('error', () => {
    reconnect();

    if (source.readyState !== EventSource.CLOSED) {
      reactor.dispatch(actionTypes$1.STREAM_ERROR);
    }
  }, false);
}

function stop(reactor) {
  stopStream$1(reactor);

  reactor.batch(() => {
    reactor.dispatch(actionTypes$1.STREAM_STOP);

    actions$2.start(reactor);
  });
}


var _actions$1 = Object.freeze({
  start: start,
  stop: stop
});

const isStreamingEvents = [
  'streamStatus',
  'isStreaming',
];

const isSupported$1 = [
  'streamStatus',
  'isSupported',
];

const useStreaming = [
  'streamStatus',
  'useStreaming',
];

const hasStreamingEventsError = [
  'streamStatus',
  'hasError',
];


var _getters$6 = Object.freeze({
  isStreamingEvents: isStreamingEvents,
  isSupported: isSupported$1,
  useStreaming: useStreaming,
  hasStreamingEventsError: hasStreamingEventsError
});

function register$1(reactor) {
  reactor.registerStores({ streamStatus: INSTANCE$3 });
}

const actions$1 = _actions$1;
const getters = _getters$6;


var stream = Object.freeze({
  register: register$1,
  actions: actions$1,
  getters: getters
});

const DEFAULT_ERROR_MSG = 'Unexpected result from API';

/**
 * Fetch the loaded components as a way to validate the API.
 * Second argument is optional options object:
 *   - useStreaming: to enable streaming (default: true if supported)
 *   - rememberLogin: to store login in local storage (default: false)
 *   - host: host to target for API calls
 */
function validate(reactor, authToken, {
    useStreaming = reactor.evaluate(getters.isSupported),
    rememberAuth = false,
    host = '',
  } = {}) {
  if (false) {}

  reactor.dispatch(actionTypes.VALIDATING_AUTH_TOKEN, { authToken, host });

  actions$2.fetchAll(reactor).then(
    () => {
      reactor.dispatch(actionTypes.VALID_AUTH_TOKEN, { authToken, host, rememberAuth });

      if (false) {}

      if (useStreaming) {
        actions$1.start(reactor, { syncOnInitialConnect: false });
      } else {
        actions$2.start(reactor, { skipInitialSync: true });
      }
    },

    ({ message = DEFAULT_ERROR_MSG } = {}) => {
      reactor.dispatch(actionTypes.INVALID_AUTH_TOKEN, { errorMessage: message });
    }
  );
}

function logOut$1(reactor) {
  reactor.dispatch(actionTypes.LOG_OUT, {});
}


var _actions = Object.freeze({
  validate: validate,
  logOut: logOut$1
});

const isValidating = [
  'authAttempt',
  'isValidating',
];

const isInvalidAttempt = [
  'authAttempt',
  'isInvalid',
];

const attemptErrorMessage = [
  'authAttempt',
  'errorMessage',
];

const rememberAuth = [
  'rememberAuth',
];

const attemptAuthInfo = [
  ['authAttempt', 'authToken'],
  ['authAttempt', 'host'],
  (authToken, host) => ({ authToken, host }),
];

const currentAuthToken = [
  'authCurrent',
  'authToken',
];

const currentAuthInfo = [
  currentAuthToken,
  ['authCurrent', 'host'],
  (authToken, host) => ({ authToken, host }),
];

const authToken = [
  isValidating,
  ['authAttempt', 'authToken'],
  ['authCurrent', 'authToken'],
  (isValidating_, attemptToken_, currentToken_) =>
    (isValidating_ ? attemptToken_ : currentToken_),
];

const authInfo = [
  isValidating,
  attemptAuthInfo,
  currentAuthInfo,
  (isValidating_, attemptAuthInfo_, currentAuthInfo_) =>
    (isValidating_ ? attemptAuthInfo_ : currentAuthInfo_),
];


var _getters$7 = Object.freeze({
  isValidating: isValidating,
  isInvalidAttempt: isInvalidAttempt,
  attemptErrorMessage: attemptErrorMessage,
  rememberAuth: rememberAuth,
  attemptAuthInfo: attemptAuthInfo,
  currentAuthToken: currentAuthToken,
  currentAuthInfo: currentAuthInfo,
  authToken: authToken,
  authInfo: authInfo
});

function register(reactor) {
  reactor.registerStores({
    authAttempt: INSTANCE,
    authCurrent: INSTANCE$1,
    rememberAuth: INSTANCE$2,
  });
}

const actions = _actions;
const authGetters = _getters$7;


var auth = Object.freeze({
  register: register,
  actions: actions,
  getters: authGetters
});

var actionTypes$5 = keyMirror({
  NAVIGATE: null,
  SHOW_SIDEBAR: null,

  LOG_OUT: null,
});

const { Store: Store$10 } = nuclearJS;

const INSTANCE$10 = new Store$10({
  getInitialState() {
    return 'states';
  },

  initialize() {
    /* eslint-disable no-use-before-define */
    this.on(actionTypes$5.NAVIGATE, navigate);
    this.on(actionTypes$5.LOG_OUT, logOut$6);
    /* eslint-enable no-use-before-define */
  },
});

function navigate(state, { pane }) {
  return pane;
}

function logOut$6() {
  return INSTANCE$10.getInitialState();
}

const { Store: Store$11 } = nuclearJS;

const INSTANCE$11 = new Store$11({
  getInitialState() {
    return false;
  },

  initialize() {
    /* eslint-disable no-use-before-define */
    this.on(actionTypes$5.SHOW_SIDEBAR, showSidebar);
    this.on(actionTypes$5.LOG_OUT, logOut$7);
    /* eslint-enable no-use-before-define */
  },
});

function showSidebar(state, { show }) {
  return !!show;
}

function logOut$7() {
  return INSTANCE$11.getInitialState();
}

function showSidebar$1(reactor, show) {
  reactor.dispatch(actionTypes$5.SHOW_SIDEBAR, { show });
}

function navigate$1(reactor, pane) {
  reactor.dispatch(actionTypes$5.NAVIGATE, { pane });
}


var _actions$5 = Object.freeze({
  showSidebar: showSidebar$1,
  navigate: navigate$1
});

// the pane that is displayed (states, history, logbook)
const activePane = [
  'selectedNavigationPanel',
];

function isActivePane(pane) {
  return [
    activePane,
    activePane_ => activePane_ === pane,
  ];
}

const showSidebar$2 = [
  'showSidebar',
];


var _getters$8 = Object.freeze({
  activePane: activePane,
  isActivePane: isActivePane,
  showSidebar: showSidebar$2
});

var actionTypes$6 = keyMirror({
  SELECT_ENTITY: null,
  LOG_OUT: null,
});

const { Store: Store$12 } = nuclearJS;

const INSTANCE$12 = new Store$12({
  getInitialState() {
    return null;
  },

  initialize() {
    /* eslint-disable no-use-before-define */
    this.on(actionTypes$6.SELECT_ENTITY, selectEntity);
    this.on(actionTypes$6.LOG_OUT, logOut$8);
    /* eslint-enable no-use-before-define */
  },
});

function selectEntity(state, { entityId }) {
  return entityId;
}

function logOut$8() {
  return INSTANCE$12.getInitialState();
}

function selectEntity$1(reactor, entityId) {
  reactor.dispatch(actionTypes$6.SELECT_ENTITY, { entityId });
}

function deselectEntity(reactor) {
  reactor.dispatch(actionTypes$6.SELECT_ENTITY, { entityId: null });
}


var _actions$6 = Object.freeze({
  selectEntity: selectEntity$1,
  deselectEntity: deselectEntity
});

// boolean if passed in time is older than 60 seconds.
function isStaleTime(time) {
  return !time || (new Date()).getTime() - time > 60000;
}

function dateToStr(date, local) {
  return local ?
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` :
    `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
}

var actionTypes$7 = keyMirror({
  ENTITY_HISTORY_DATE_SELECTED: null,

  ENTITY_HISTORY_FETCH_START: null,
  ENTITY_HISTORY_FETCH_ERROR: null,
  ENTITY_HISTORY_FETCH_SUCCESS: null,

  RECENT_ENTITY_HISTORY_FETCH_START: null,
  RECENT_ENTITY_HISTORY_FETCH_ERROR: null,
  RECENT_ENTITY_HISTORY_FETCH_SUCCESS: null,

  LOG_OUT: null,
});

const { Store: Store$13 } = nuclearJS;

const INSTANCE$13 = new Store$13({
  getInitialState() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return dateToStr(yesterday, true);
  },

  initialize() {
    /* eslint-disable no-use-before-define */
    this.on(actionTypes$7.ENTITY_HISTORY_DATE_SELECTED, dateSelected);
    this.on(actionTypes$7.LOG_OUT, logOut$9);
    /* eslint-enable no-use-before-define */
  },
});

function dateSelected(state, { date }) {
  return dateToStr(date, true);
}

function logOut$9() {
  return INSTANCE$13.getInitialState();
}

const { Store: Store$14, toImmutable: toImmutable$8 } = nuclearJS;

const INSTANCE$14 = new Store$14({
  getInitialState() {
    return toImmutable$8({});
  },

  initialize() {
    /* eslint-disable no-use-before-define */
    this.on(actionTypes$7.ENTITY_HISTORY_FETCH_SUCCESS, entriesLoaded);
    this.on(actionTypes$7.LOG_OUT, logOut$10);
    /* eslint-enable no-use-before-define */
  },
});

function entriesLoaded(state, { date, stateHistory }) {
  // set an empty map to indicate that data was loaded
  if (stateHistory.length === 0) {
    return state.set(date, toImmutable$8({}));
  }

  return state.withMutations(mState => {
    stateHistory.forEach(
      history => mState.setIn(
        [date, history[0].entity_id],
        toImmutable$8(history.map(State.fromJSON))
      )
    );
  });
}

function logOut$10() {
  return INSTANCE$14.getInitialState();
}

const { Store: Store$15 } = nuclearJS;

const INSTANCE$15 = new Store$15({
  getInitialState() {
    return false;
  },

  initialize() {
    this.on(actionTypes$7.ENTITY_HISTORY_FETCH_START,
            () => true);
    this.on(actionTypes$7.ENTITY_HISTORY_FETCH_SUCCESS,
            () => false);
    this.on(actionTypes$7.ENTITY_HISTORY_FETCH_ERROR,
            () => false);

    this.on(actionTypes$7.RECENT_ENTITY_HISTORY_FETCH_START,
            () => true);
    this.on(actionTypes$7.RECENT_ENTITY_HISTORY_FETCH_SUCCESS,
            () => false);
    this.on(actionTypes$7.RECENT_ENTITY_HISTORY_FETCH_ERROR,
            () => false);

    this.on(actionTypes$7.LOG_OUT, () => false);
  },
});

const { Store: Store$16, toImmutable: toImmutable$9 } = nuclearJS;

const INSTANCE$16 = new Store$16({
  getInitialState() {
    return toImmutable$9({});
  },

  initialize() {
    /* eslint-disable no-use-before-define */
    this.on(actionTypes$7.RECENT_ENTITY_HISTORY_FETCH_SUCCESS, entriesLoaded$1);
    this.on(actionTypes$7.LOG_OUT, logOut$11);
    /* eslint-enable no-use-before-define */
  },
});

function entriesLoaded$1(state, { stateHistory }) {
  return state.withMutations(mState => {
    stateHistory.forEach(
      history => mState.set(
        history[0].entity_id,
        toImmutable$9(history.map(State.fromJSON))
      )
    );
  });
}

function logOut$11() {
  return INSTANCE$16.getInitialState();
}

const { Store: Store$17, toImmutable: toImmutable$10 } = nuclearJS;
const ALL_ENTRY_FETCH = 'ALL_ENTRY_FETCH';

const INSTANCE$17 = new Store$17({
  getInitialState() {
    return toImmutable$10({});
  },

  initialize() {
    /* eslint-disable no-use-before-define */
    this.on(actionTypes$7.RECENT_ENTITY_HISTORY_FETCH_SUCCESS,
            entriesLoaded$2);
    this.on(actionTypes$7.LOG_OUT, logOut$12);
    /* eslint-enable no-use-before-define */
  },
});

function entriesLoaded$2(state, { stateHistory }) {
  const now = (new Date()).getTime();

  return state.withMutations(mState => {
    stateHistory.forEach(history => mState.set(history[0].entity_id, now));

    if (history.length > 1) {
      mState.set(ALL_ENTRY_FETCH, now);
    }
  });
}

function logOut$12() {
  return INSTANCE$17.getInitialState();
}

const { toImmutable: toImmutable$11 } = nuclearJS;

const isLoadingEntityHistory = [
  'isLoadingEntityHistory',
];

const currentDate = [
  'currentEntityHistoryDate',
];

const entityHistoryMap = [
  'entityHistory',
];

const entityHistoryForCurrentDate = [
  currentDate,
  entityHistoryMap,
  (date, map) => map.get(date) || toImmutable$11({}),
];

const hasDataForCurrentDate = [
  currentDate,
  entityHistoryMap,
  (date, map) => !!map.get(date),
];

const recentEntityHistoryMap = [
  'recentEntityHistory',
];

const recentEntityHistoryUpdatedMap = [
  'recentEntityHistory',
];


var _getters$10 = Object.freeze({
  isLoadingEntityHistory: isLoadingEntityHistory,
  currentDate: currentDate,
  entityHistoryMap: entityHistoryMap,
  entityHistoryForCurrentDate: entityHistoryForCurrentDate,
  hasDataForCurrentDate: hasDataForCurrentDate,
  recentEntityHistoryMap: recentEntityHistoryMap,
  recentEntityHistoryUpdatedMap: recentEntityHistoryUpdatedMap
});

function changeCurrentDate(reactor, date) {
  reactor.dispatch(actionTypes$7.ENTITY_HISTORY_DATE_SELECTED, { date });
}

function fetchRecent(reactor, entityId = null) {
  reactor.dispatch(actionTypes$7.RECENT_ENTITY_HISTORY_FETCH_START, {});

  let url = 'history/period';

  if (entityId !== null) {
    url += `?filter_entity_id=${entityId}`;
  }

  return callApi(reactor, 'GET', url).then(
    stateHistory => reactor.dispatch(
      actionTypes$7.RECENT_ENTITY_HISTORY_FETCH_SUCCESS, { stateHistory }),

    () => reactor.dispatch(actionTypes$7.RECENT_ENTITY_HISTORY_FETCH_ERROR, {})
  );
}

function fetchDate(reactor, date) {
  reactor.dispatch(actionTypes$7.ENTITY_HISTORY_FETCH_START, { date });

  return callApi(reactor, 'GET', `history/period/${date}`).then(
    stateHistory => reactor.dispatch(
      actionTypes$7.ENTITY_HISTORY_FETCH_SUCCESS, { date, stateHistory }),

    () => reactor.dispatch(actionTypes$7.ENTITY_HISTORY_FETCH_ERROR, {})
  );
}

function fetchSelectedDate(reactor) {
  const date = reactor.evaluate(currentDate);

  return fetchDate(reactor, date);
}


var _actions$7 = Object.freeze({
  changeCurrentDate: changeCurrentDate,
  fetchRecent: fetchRecent,
  fetchDate: fetchDate,
  fetchSelectedDate: fetchSelectedDate
});

function register$8(reactor) {
  reactor.registerStores({
    currentEntityHistoryDate: INSTANCE$13,
    entityHistory: INSTANCE$14,
    isLoadingEntityHistory: INSTANCE$15,
    recentEntityHistory: INSTANCE$16,
    recentEntityHistoryUpdated: INSTANCE$17,
  });
}

const actions$6 = _actions$7;
const getters$8 = _getters$10;


var entityHistory = Object.freeze({
  register: register$8,
  actions: actions$6,
  getters: getters$8
});

const currentEntityId = [
  'moreInfoEntityId',
];

const hasCurrentEntityId = [
  currentEntityId,
  (entityId) => entityId !== null,
];

const currentEntity = [
  currentEntityId,
  entityGetters.entityMap,
  (entityId, entityMap) => entityMap.get(entityId) || null,
];

const currentEntityHistory = [
  currentEntityId,
  getters$8.recentEntityHistoryMap,
  (entityId, map) => map.get(entityId),
];

const isCurrentEntityHistoryStale = [
  currentEntityId,
  getters$8.recentEntityHistoryUpdatedMap,
  (entityId, map) => isStaleTime(map.get(entityId)),
];


var _getters$9 = Object.freeze({
  currentEntityId: currentEntityId,
  hasCurrentEntityId: hasCurrentEntityId,
  currentEntity: currentEntity,
  currentEntityHistory: currentEntityHistory,
  isCurrentEntityHistoryStale: isCurrentEntityHistoryStale
});

function register$7(reactor) {
  reactor.registerStores({ moreInfoEntityId: INSTANCE$12 });
}

const actions$5 = _actions$6;
const getters$7 = _getters$9;


var moreInfo = Object.freeze({
  register: register$7,
  actions: actions$5,
  getters: getters$7
});

var actionTypes$8 = keyMirror({
  SELECT_VIEW: null,
});

const { Store: Store$18 } = nuclearJS;

const INSTANCE$18 = new Store$18({
  getInitialState() {
    return null;
  },

  initialize() {
    /* eslint-disable no-use-before-define */
    this.on(actionTypes$8.SELECT_VIEW, (state, { view }) => view);
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

function selectView(reactor, view) {
  reactor.dispatch(actionTypes$8.SELECT_VIEW, { view });
}


var _actions$8 = Object.freeze({
  selectView: selectView
});

const { Immutable: Immutable$4 } = nuclearJS;
const DEFAULT_VIEW_ENTITY_ID = 'group.default_view';

const currentView = [
  'currentView',
];

const views = [
  entityGetters.entityMap,
  entities => entities.filter(entity => entity.domain === 'group' &&
                                        entity.attributes.view &&
                                        entity.entityId !== DEFAULT_VIEW_ENTITY_ID),
];

function addToMap(map, entities, groupEntity, recurse = true) {
  groupEntity.attributes.entity_id.forEach(entityId => {
    if (map.has(entityId)) return;

    const entity = entities.get(entityId);

    if (!entity || entity.attributes.hidden) return;

    map.set(entityId, entity);

    if (entity.domain === 'group' && recurse) {
      addToMap(map, entities, entity, false);
    }
  });
}

const currentViewEntities = [
  entityGetters.entityMap,
  currentView,
  (entities, view) => {
    let viewEntity;

    if (view) {
      viewEntity = entities.get(view);
    } else {
      // will be undefined if entity does not exist
      viewEntity = entities.get(DEFAULT_VIEW_ENTITY_ID);
    }

    if (!viewEntity) {
      return entities.filter(entity => !entity.attributes.hidden);
    }

    return (new Immutable$4.Map()).withMutations(map => {
      addToMap(map, entities, viewEntity);
    });
  },
];


var _getters$11 = Object.freeze({
  currentView: currentView,
  views: views,
  currentViewEntities: currentViewEntities
});

function register$9(reactor) {
  reactor.registerStores({ currentView: INSTANCE$18 });
}

const actions$7 = _actions$8;
const getters$9 = _getters$11;


var view = Object.freeze({
  register: register$9,
  actions: actions$7,
  getters: getters$9
});

const IS_SUPPORTED = history.pushState && !false;
const PAGE_TITLE = 'Home Assistant';
const SYNCS = {};

function getSync(reactor) {
  return SYNCS[reactor.hassId];
}

function pageState(pane, view) {
  const state = { pane };
  if (pane === 'states') {
    state.view = view || null;
  }
  return state;
}

function pageUrl(pane, view) {
  return pane === 'states' && view ?
    `/${pane}/${view}` : `/${pane}`;
}


function initialSync(reactor) {
  let pane;
  let view;
  // store current state in url or set state based on url
  if (window.location.pathname === '/') {
    pane = reactor.evaluate(activePane);
    view = reactor.evaluate(getters$9.currentView);
  } else {
    [pane, view] = window.location.pathname.substr(1).split('/');
    reactor.batch(() => {
      navigate$1(reactor, pane);
      if (view) {
        actions$7.selectView(reactor, view);
      }
    });
  }
  history.replaceState(pageState(pane, view), PAGE_TITLE, pageUrl(pane, view));
}

function popstateChangeListener(reactor, ev) {
  const { pane, view } = ev.state;

  if (reactor.evaluate(getters$7.hasCurrentEntityId)) {
    getSync(reactor).ignoreNextDeselectEntity = true;
    actions$5.deselectEntity(reactor);
  } else if (pane !== reactor.evaluate(activePane) ||
             view !== reactor.evaluate(getters$9.currentView)) {
    reactor.batch(() => {
      navigate$1(reactor, pane);
      if (view !== undefined) {
        actions$7.selectView(reactor, view);
      }
    });
  }
}

function startSync(reactor) {
  if (!IS_SUPPORTED) {
    return;
  }

  initialSync(reactor);

  const sync = {
    ignoreNextDeselectEntity: false,
    popstateChangeListener: popstateChangeListener.bind(null, reactor),
    unwatchNavigationObserver: reactor.observe(activePane, pane => {
      if (pane !== history.state.pane) {
        history.pushState(pageState(pane, history.state.view), PAGE_TITLE,
                          pageUrl(pane, history.state.view));
      }
    }),
    unwatchViewObserver: reactor.observe(getters$9.currentView, view => {
      if (view !== history.state.view) {
        history.pushState(pageState(history.state.pane, view), PAGE_TITLE,
                          pageUrl(history.state.pane, view));
      }
    }),
    unwatchMoreInfoObserver: reactor.observe(
      getters$7.hasCurrentEntityId,
      (moreInfoEntitySelected) => {
        if (moreInfoEntitySelected) {
          history.pushState(history.state, PAGE_TITLE, window.location.pathname);
        } else if (sync.ignoreNextDeselectEntity) {
          sync.ignoreNextDeselectEntity = false;
        } else {
          // Otherwise SELECT_ENTITY: null will happen 2+ times on Firefox
          setTimeout(() => history.back(), 0);
        }
      }
    ),
  };

  SYNCS[reactor.hassId] = sync;

  // keep state in sync when url changes via forward/back buttons
  window.addEventListener('popstate', sync.popstateChangeListener);
}

function stopSync(reactor) {
  if (!IS_SUPPORTED) {
    return;
  }

  const sync = getSync(reactor);
  if (!sync) {
    return;
  }

  sync.unwatchNavigationObserver();
  sync.unwatchViewObserver();
  sync.unwatchMoreInfoObserver();
  window.removeEventListener('popstate', sync.popstateChangeListener);
  SYNCS[reactor.hassId] = false;
}


var _urlSync = Object.freeze({
  startSync: startSync,
  stopSync: stopSync
});

function register$6(reactor) {
  reactor.registerStores({
    selectedNavigationPanel: INSTANCE$10,
    showSidebar: INSTANCE$11,
  });
}

const actions$4 = _actions$5;
const getters$6 = _getters$8;
const urlSync = _urlSync;


var navigation = Object.freeze({
  register: register$6,
  actions: actions$4,
  getters: getters$6,
  urlSync: urlSync
});

function getLocalStorage() {
  if (!('localStorage' in window)) {
    return {};
  }

  const storage = window.localStorage;
  const testKey = '___test';

  try {
    // Safari throws exception in private mode
    storage.setItem(testKey, testKey);
    storage.removeItem(testKey);
    return storage;
  } catch (err) {
    return {};
  }
}

const storage = getLocalStorage();

const observe = {
  authToken: {
    getter: [
      authGetters.currentAuthToken,
      authGetters.rememberAuth,
      (authToken, rememberAuth) => (rememberAuth ? authToken : null),
    ],
    defaultValue: null,
  },
  useStreaming: {
    getter: getters.useStreaming,
    defaultValue: true,
  },
  showSidebar: {
    getter: getters$6.showSidebar,
    defaultValue: false,
  },
};

const preferences = {};

Object.keys(observe).forEach(prop => {
  if (!(prop in storage)) {
    storage[prop] = observe[prop].defaultValue;
  }

  Object.defineProperty(preferences, prop, {
    get: () => {
      try {
        return JSON.parse(storage[prop]);
      } catch (err) {
        return observe[prop].defaultValue;
      }
    },
  });
});

preferences.startSync = function startSync(reactor) {
  Object.keys(observe).forEach(prop => {
    const { getter } = observe[prop];
    const valueChanged = function valueChanged(value) {
      storage[prop] = JSON.stringify(value);
    };
    reactor.observe(getter, valueChanged);
    valueChanged(reactor.evaluate(getter));
  });
};

const localStoragePreferences = preferences;

const { Reactor } = nuclearJS;
let reactorCount = 0;

function createReactor() {
  const reactor = new Reactor({
    debug: false || false,
  });

  reactor.hassId = reactorCount++;

  return reactor;
}

function exposeModules(target, reactor, modules) {
  Object.keys(modules).forEach(name => {
    const module = modules[name];

    if ('register' in module) {
      module.register(reactor);
    }

    if ('getters' in module) {
      Object.defineProperty(target, `${name}Getters`, {
        value: module.getters,
        enumerable: true,
      });
    }

    if ('actions' in module) {
      const actions = {};

      Object.getOwnPropertyNames(module.actions).forEach(actionKey => {
        if (typeof module.actions[actionKey] === 'function') {
          Object.defineProperty(actions, actionKey, {
            value: module.actions[actionKey].bind(null, reactor),
            enumerable: true,
          });
        }
      });

      Object.defineProperty(target, `${name}Actions`, {
        value: actions,
        enumerable: true,
      });
    }
  });
}

const { toImmutable: toImmutable$12 } = nuclearJS;

function expandGroup(groupState, entityMap) {
  return toImmutable$12(groupState.attributes.entity_id.map(
    entityId => entityMap.get(entityId)).filter(ent => !!ent));
}

var temperatureUnits = {
  UNIT_TEMP_C: '°C',
  UNIT_TEMP_F: '°F',
};

var util = {
  dateToStr,
  expandGroup,
  isStaleTime,
  parseDateTime,
  temperatureUnits,
};

function fetchErrorLog(reactor) {
  return callApi(reactor, 'GET', 'error_log');
}


var _actions$9 = Object.freeze({
  fetchErrorLog: fetchErrorLog
});

const actions$8 = _actions$9;


var errorLog = Object.freeze({
	actions: actions$8
});

var actionTypes$9 = keyMirror({
  LOGBOOK_DATE_SELECTED: null,

  LOGBOOK_ENTRIES_FETCH_START: null,
  LOGBOOK_ENTRIES_FETCH_ERROR: null,
  LOGBOOK_ENTRIES_FETCH_SUCCESS: null,
});

const { Store: Store$19 } = nuclearJS;

const INSTANCE$19 = new Store$19({
  getInitialState() {
    return dateToStr(new Date(), true);
  },

  initialize() {
    /* eslint-disable no-use-before-define */
    this.on(actionTypes$9.LOGBOOK_DATE_SELECTED, dateSelected$1);
    this.on(actionTypes$9.LOG_OUT, logOut$13);
    /* eslint-enable no-use-before-define */
  },
});

function dateSelected$1(state, { date }) {
  return dateToStr(date, true);
}

function logOut$13() {
  return INSTANCE$19.getInitialState();
}

const { Store: Store$20 } = nuclearJS;

const INSTANCE$20 = new Store$20({
  getInitialState() {
    return false;
  },

  initialize() {
    this.on(actionTypes$9.LOGBOOK_ENTRIES_FETCH_START, () => true);
    this.on(actionTypes$9.LOGBOOK_ENTRIES_FETCH_SUCCESS, () => false);
    this.on(actionTypes$9.LOGBOOK_ENTRIES_FETCH_ERROR, () => false);
    this.on(actionTypes$9.LOG_OUT, () => false);
  },
});

const { Immutable: Immutable$5 } = nuclearJS;

const ImmutableLogbookEntry = new Immutable$5.Record({
  when: null,
  name: null,
  message: null,
  domain: null,
  entityId: null,
}, 'LogbookEntry');

class LogbookEntry extends ImmutableLogbookEntry {
  constructor(when, name, message, domain, entityId) {
    super({
      when,
      name,
      message,
      domain,
      entityId,
    });
  }

  static fromJSON({ when, name, message, domain, entity_id }) {
    /* eslint-disable camelcase */
    return new LogbookEntry(parseDateTime(when), name, message, domain, entity_id);
    /* eslint-enable camelcase */
  }
}

const { Store: Store$21, toImmutable: toImmutable$13 } = nuclearJS;

const INSTANCE$21 = new Store$21({
  getInitialState() {
    return toImmutable$13({});
  },

  initialize() {
    /* eslint-disable no-use-before-define */
    this.on(actionTypes$9.LOGBOOK_ENTRIES_FETCH_SUCCESS, entriesLoaded$3);
    this.on(actionTypes$9.LOG_OUT, logOut$14);
    /* eslint-enable no-use-before-define */
  },
});

function entriesLoaded$3(state, { date, entries }) {
  return state.set(date, toImmutable$13(entries.map(LogbookEntry.fromJSON)));
}

function logOut$14() {
  return INSTANCE$21.getInitialState();
}

const { Store: Store$22, toImmutable: toImmutable$14 } = nuclearJS;

const INSTANCE$22 = new Store$22({
  getInitialState() {
    return toImmutable$14({});
  },

  initialize() {
    /* eslint-disable no-use-before-define */
    this.on(actionTypes$9.LOGBOOK_ENTRIES_FETCH_SUCCESS, entriesLoaded$4);
    this.on(actionTypes$9.LOG_OUT, logOut$15);
    /* eslint-enable no-use-before-define */
  },
});

function entriesLoaded$4(state, { date }) {
  return state.set(date, new Date().getTime());
}

function logOut$15() {
  return INSTANCE$22.getInitialState();
}

function changeCurrentDate$1(reactor, date) {
  reactor.dispatch(actionTypes$9.LOGBOOK_DATE_SELECTED, { date });
}

function fetchDate$1(reactor, date) {
  reactor.dispatch(actionTypes$9.LOGBOOK_ENTRIES_FETCH_START, { date });

  callApi(reactor, 'GET', `logbook/${date}`).then(
    entries => reactor.dispatch(
      actionTypes$9.LOGBOOK_ENTRIES_FETCH_SUCCESS, { date, entries }),

    () => reactor.dispatch(actionTypes$9.LOGBOOK_ENTRIES_FETCH_ERROR, {})
  );
}


var _actions$10 = Object.freeze({
  changeCurrentDate: changeCurrentDate$1,
  fetchDate: fetchDate$1
});

const { toImmutable: toImmutable$15 } = nuclearJS;
const STALE_TIME = 60000;

function isStaleTime$1(time) {
  return !time || (new Date()).getTime() - time > STALE_TIME;
}

const currentDate$1 = [
  'currentLogbookDate',
];

const isCurrentStale = [
  currentDate$1,
  ['logbookEntriesUpdated'],
  (currentDate_, map) => isStaleTime$1(map.get(currentDate_)),
];

const currentEntries = [
  currentDate$1,
  ['logbookEntries'],
  (date, map) => map.get(date) || toImmutable$15([]),
];

const isLoadingEntries = [
  'isLoadingLogbookEntries',
];


var _getters$12 = Object.freeze({
  currentDate: currentDate$1,
  isCurrentStale: isCurrentStale,
  currentEntries: currentEntries,
  isLoadingEntries: isLoadingEntries
});

function register$10(reactor) {
  reactor.registerStores({
    currentLogbookDate: INSTANCE$19,
    isLoadingLogbookEntries: INSTANCE$20,
    logbookEntries: INSTANCE$21,
    logbookEntriesUpdated: INSTANCE$22,
  });
}

const actions$9 = _actions$10;
const getters$10 = _getters$12;


var logbook = Object.freeze({
  register: register$10,
  actions: actions$9,
  getters: getters$10
});

function render(reactor, template) {
  return callApi(reactor, 'POST', 'template', { template });
}


var _actions$11 = Object.freeze({
  render: render
});

const actions$10 = _actions$11;


var template = Object.freeze({
	actions: actions$10
});

const { Store: Store$23 } = nuclearJS;

const INSTANCE$23 = new Store$23({
  getInitialState() {
    return 'webkitSpeechRecognition' in window;
  },
});

var actionTypes$10 = keyMirror({
  VOICE_START: null,
  VOICE_RESULT: null,
  VOICE_TRANSMITTING: null,
  VOICE_DONE: null,
  VOICE_ERROR: null,
});

const { Store: Store$24, toImmutable: toImmutable$16 } = nuclearJS;

const INSTANCE$24 = new Store$24({
  getInitialState() {
    return toImmutable$16({
      isListening: false,
      isTransmitting: false,
      interimTranscript: '',
      finalTranscript: '',
    });
  },

  initialize() {
    /* eslint-disable no-use-before-define */
    this.on(actionTypes$10.VOICE_START, voiceStart);
    this.on(actionTypes$10.VOICE_RESULT, voiceResult);
    this.on(actionTypes$10.VOICE_TRANSMITTING, voiceTransmitting);
    this.on(actionTypes$10.VOICE_DONE, voiceDone);
    this.on(actionTypes$10.VOICE_ERROR, voiceError);
    this.on(actionTypes$10.LOG_OUT, logOut$16);
    /* eslint-enable no-use-before-define */
  },
});

function voiceStart(state) {
  return state.set('isListening', true);
}

function voiceResult(state, { interimTranscript, finalTranscript }) {
  return state.withMutations(map =>
    map.set('isListening', true)
       .set('isTransmitting', false)
       .set('interimTranscript', interimTranscript)
       .set('finalTranscript', finalTranscript)
  );
}

function voiceTransmitting(state, { finalTranscript }) {
  return state.withMutations(map =>
    map.set('isListening', false)
       .set('isTransmitting', true)
       .set('interimTranscript', '')
       .set('finalTranscript', finalTranscript)
  );
}

function voiceDone() {
  return INSTANCE$24.getInitialState();
}

function voiceError() {
  return INSTANCE$24.getInitialState();
}

function logOut$16() {
  return INSTANCE$24.getInitialState();
}

const RESULTS = {};

function getResult(reactor) {
  return RESULTS[reactor.hassId];
}

function process(reactor) {
  const recognition = getResult(reactor);

  if (!recognition) return;

  const text = recognition.finalTranscript || recognition.interimTranscript;

  reactor.dispatch(actionTypes$10.VOICE_TRANSMITTING, { finalTranscript: text });

  serviceActions.callService(reactor, 'conversation', 'process', { text }).then(
    () => { reactor.dispatch(actionTypes$10.VOICE_DONE); },
    () => { reactor.dispatch(actionTypes$10.VOICE_ERROR); }
  );
}

function stop$2(reactor) {
  const result = getResult(reactor);

  if (result) {
    result.recognition.stop();
    RESULTS[reactor.hassId] = false;
  }
}

function finish(reactor) {
  process(reactor);
  stop$2(reactor);
}

function listen(reactor) {
  const finishForReactor = finish.bind(null, reactor);
  finishForReactor();

  /* eslint-disable new-cap */
  const recognition = new webkitSpeechRecognition();
  /* eslint-enable new-cap */

  RESULTS[reactor.hassId] = {
    recognition,
    interimTranscript: '',
    finalTranscript: '',
  };

  recognition.interimResults = true;

  recognition.onstart = () => reactor.dispatch(actionTypes$10.VOICE_START);
  recognition.onerror = () => reactor.dispatch(actionTypes$10.VOICE_ERROR);
  recognition.onend = finishForReactor;

  recognition.onresult = (event) => {
    const result = getResult(reactor);

    if (!result) {
      return;
    }

    let finalTranscript = '';
    let interimTranscript = '';

    for (let ind = event.resultIndex; ind < event.results.length; ind++) {
      if (event.results[ind].isFinal) {
        finalTranscript += event.results[ind][0].transcript;
      } else {
        interimTranscript += event.results[ind][0].transcript;
      }
    }

    result.interimTranscript = interimTranscript;
    result.finalTranscript += finalTranscript;

    reactor.dispatch(actionTypes$10.VOICE_RESULT, {
      interimTranscript,
      finalTranscript: result.finalTranscript,
    });
  };

  recognition.start();
}


var _actions$12 = Object.freeze({
  stop: stop$2,
  finish: finish,
  listen: listen
});

const isVoiceSupported = ['isVoiceSupported'];

const isListening = [
  'currentVoiceCommand',
  'isListening',
];

const isTransmitting = [
  'currentVoiceCommand',
  'isTransmitting',
];

const interimTranscript = [
  'currentVoiceCommand',
  'interimTranscript',
];

const finalTranscript = [
  'currentVoiceCommand',
  'finalTranscript',
];

// interimTranscript contains all text from finalTranscript too
// this getter cuts that off
const extraInterimTranscript = [
  interimTranscript,
  finalTranscript,
  (interimTranscript_, finalTranscript_) =>
    interimTranscript_.slice(finalTranscript_.length),
];


var _getters$13 = Object.freeze({
  isVoiceSupported: isVoiceSupported,
  isListening: isListening,
  isTransmitting: isTransmitting,
  interimTranscript: interimTranscript,
  finalTranscript: finalTranscript,
  extraInterimTranscript: extraInterimTranscript
});

function register$11(reactor) {
  reactor.registerStores({ currentVoiceCommand: INSTANCE$24, isVoiceSupported: INSTANCE$23 });
}

const actions$11 = _actions$12;
const getters$11 = _getters$13;


var voice = Object.freeze({
  register: register$11,
  actions: actions$11,
  getters: getters$11
});

class HomeAssistant {
  constructor() {
    const reactor = createReactor();

    Object.defineProperties(this, {
      // attributes
      demo: {
        value: false,
        enumerable: true,
      },

      localStoragePreferences: {
        value: localStoragePreferences,
        enumerable: true,
      },

      reactor: {
        value: reactor,
        enumerable: true,
      },

      util: {
        value: util,
        enumerable: true,
      },

      // methods
      startLocalStoragePreferencesSync: {
        value: localStoragePreferences.startSync.bind(localStoragePreferences, reactor),
      },

      startUrlSync: {
        value: urlSync.startSync.bind(null, reactor),
      },

      stopUrlSync: {
        value: urlSync.stopSync.bind(null, reactor),
      },
    });

    exposeModules(this, reactor, {
      auth,
      config,
      entity,
      entityHistory,
      errorLog,
      event,
      logbook,
      moreInfo,
      navigation,
      notification,
      view,
      service,
      stream,
      sync,
      template,
      voice,
      restApi,
    });
  }
}

export default HomeAssistant;