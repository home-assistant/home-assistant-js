'use strict';

var serviceStore = require('../stores/service');

var State = function(json) {
    this.attributes = json.attributes;

    this.entityId = json.entity_id;
    var parts = json.entity_id.split(".");
    this.domain = parts[0];
    this.objectId = parts[1];

    if(this.attributes.friendly_name) {
      this.entityDisplay = this.attributes.friendly_name;
    } else {
      this.entityDisplay = this.objectId.replace(/_/g, " ");
    }

    this.state = json.state;
    this.lastChanged = json.last_changed;
};

Object.defineProperties(State.prototype, {
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
      var parts = this.lastChanged.split(" ");
      var time = parts[0].split(":");
      var date = parts[1].split("-");

      return new Date(date[2], parseInt(date[1])-1, date[0], time[0], time[1], time[2]);
    }
  }
});

module.exports = State;
