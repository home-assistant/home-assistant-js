'use strict';

var util = require('../util');
var serviceStore = require('../stores/service');

var DOMAINS_WITH_CARD = ['thermostat', 'configurator'];
var DOMAINS_WITH_MORE_INFO = ['light', 'group', 'sun', 'configurator'];

var State = function(json) {
    this.attributes = json.attributes;

    this.entity_id = json.entity_id;
    var parts = json.entity_id.split(".");
    this.domain = parts[0];
    this.object_id = parts[1];

    if(this.attributes.friendly_name) {
      this.entityDisplay = this.attributes.friendly_name;
    } else {
      this.entityDisplay = this.object_id.replace(/_/g, " ");
    }

    this.state = json.state;
    this.last_changed = json.last_changed;
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

  // how to render the card for this state
  cardType: {
    get: function() {
      if(DOMAINS_WITH_CARD.indexOf(this.domain) !== -1) {
        return this.domain;
      } else if(this.canToggle) {
        return "toggle";
      } else {
        return "display";
      }
    }
  },

  // how to render the more info of this state
  moreInfoType: {
    get: function() {
      if(DOMAINS_WITH_MORE_INFO.indexOf(this.domain) !== -1) {
        return this.domain;
      } else {
        return 'default';
      }
    }
  },

  relativeLastChanged: {
    get: function() {
      return util.relativeTime(this.last_changed);
    }
  },

});

module.exports = State;
