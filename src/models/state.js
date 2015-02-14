'use strict';

var _ = require('lodash');

var serviceStore = require('../stores/service');

var util = require('../util');

var State = function(entityId, state, lastChanged, attributes) {
  this.entityId = entityId;
  this.state = state;
  this.lastChanged = lastChanged;
  this.attributes = attributes || {};
};

State.fromJSON = function(jsonObj) {
  return new State(jsonObj.entity_id, jsonObj.state, jsonObj.last_changed, jsonObj.attributes);
};

State.prototype.updateFromJSON = function(jsonObj) {
  this.attributes = jsonObj.attributes;
  this.last_changed = jsonObj.last_changed;
  this.state = jsonObj.state;
};

Object.defineProperties(State.prototype, {
  domain: {
    get: function() {
      if (_.isUndefined(this._domain)) {
        this._domain = this.entityId.split(".")[0];
      }

      return this._domain;
    }
  },

  objectId: {
    get: function() {
      if (_.isUndefined(this._objectId)) {
        this._objectId = this.entityId.split(".")[1];
      }

      return this._objectId;
    }
  },

  entityDisplay: {
    get: function() {
      if (_.isUndefined(this._entityDisplay)) {
        if(this.attributes.friendly_name) {
          this._entityDisplay = this.attributes.friendly_name;
        } else {
          this._entityDisplay = this.objectId.replace(/_/g, " ");
        }
      }

      return this._entityDisplay;
    }
  },

  stateDisplay: {
    get: function() {
      var state = this.state.replace(/_/g, " ");

      if(this.attributes.unit_of_measurement) {
        return state + " " + this.attributes.unit_of_measurement;
      } else {
        return state;
      }
    }
  },

  isCustomGroup: {
    get: function() {
      return this.domain == "group" && !this.attributes.auto;
    }
  },

  canToggle: {
    get: function() {
      // groups that have the on/off state or if there is a turn_on service
      return ((this.domain == 'group' &&
               (this.state == 'on' || this.state == 'off')) ||
              serviceStore.has(this.domain, 'turn_on'));
    }
  },

  lastChangedAsDate: {
    get: function() {
      return util.parseDateTime(this.lastChanged);
    }
  }
});

module.exports = State;
