'use strict';

var serviceStore = require('../stores/service');

var util = require('../util');

var State = function(entityId, state, lastChanged, attributes) {
  this.entityId = entityId;
  this.state = state;
  this.lastChanged = lastChanged;
  this.attributes = attributes || {};
  this._domain = null;
  this._objectId = null;
  this._entityDisplay = null;
};

State.fromJSON = function(jsonObj) {
  return new State(jsonObj.entity_id, jsonObj.state, jsonObj.last_changed, jsonObj.attributes);
};

Object.defineProperties(State.prototype, {
  domain: {
    get: function() {
      if (this._domain === null) {
        this._domain = this.entityId.split(".")[0];
      }

      return this._domain;
    }
  },

  objectId: {
    get: function() {
      if (this._objectId === null) {
        this._objectId = this.entityId.split(".")[1];
      }

      return this._objectId;
    }
  },

  entityDisplay: {
    get: function() {
      if (this._entityDisplay === null) {
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
