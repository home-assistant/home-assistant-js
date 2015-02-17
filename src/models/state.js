'use strict';

var serviceStore = require('../stores/service');

var { parseDateTime } = require('../util');

export default class State {
  constructor(entityId, state, lastChanged, attributes) {
    this.entityId = entityId;
    this.state = state;
    this.lastChanged = lastChanged;
    this.attributes = attributes || {};
    this._domain = null;
    this._objectId = null;
    this._entityDisplay = null;
  }

  get domain() {
    if (this._domain === null) {
      this._domain = this.entityId.split(".")[0];
    }

    return this._domain;
  }

  get objectId() {
    if (this._objectId === null) {
      this._objectId = this.entityId.split(".")[1];
    }

    return this._objectId;
  }

  get entityDisplay() {
    if (this._entityDisplay === null) {
      if(this.attributes.friendly_name) {
        this._entityDisplay = this.attributes.friendly_name;
      } else {
        this._entityDisplay = this.objectId.replace(/_/g, " ");
      }
    }

    return this._entityDisplay;
  }

  get stateDisplay() {
    var state = this.state.replace(/_/g, " ");

    if(this.attributes.unit_of_measurement) {
      return state + " " + this.attributes.unit_of_measurement;
    } else {
      return state;
    }
  }

  get isCustomGroup() {
    return this.domain == "group" && !this.attributes.auto;
  }

  get canToggle() {
    // groups that have the on/off state or if there is a turn_on service
    return ((this.domain == 'group' &&
             (this.state == 'on' || this.state == 'off')) ||
            serviceStore.has(this.domain, 'turn_on'));
  }

  get lastChangedAsDate() {
    return parseDateTime(this.lastChanged);
  }

  static fromJSON(jsonObj) {
    return new State(jsonObj.entity_id, jsonObj.state, jsonObj.last_changed, jsonObj.attributes);
  }

}
