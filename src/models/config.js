import { Record, List } from 'immutable';

let ImmutableConfig = new Record({
  latitude: null,
  longitude: null,
  temperature_unit: null,
  location_name: null,
  time_zone: null,
  components: null,
}, 'Config');

export default class Config extends ImmutableConfig {
  constructor(latitude, longitude, temperature_unit, location_name, time_zone, components) {
    super({
      latitude: latitude,
      longitude: longitude,
      temperature_unit: temperature_unit,
      location_name: location_name || '',
      time_zone: time_zone,
      components: new List(components),
    });
  }

  static fromJSON({latitude, longitude, temperature_unit, location_name, time_zone, components}) {
    return new Config(latitude, longitude, temperature_unit, location_name, time_zone, components);
  }
}
