import nuclearJS from 'nuclear-js';
import actionTypes from '../action-types';

const { Store, toImmutable } = nuclearJS;

const INSTANCE = new Store({
  getInitialState() {
    return toImmutable({
      latitude: null,
      longitude: null,
      location_name: 'Home',
      temperature_unit: '°C',
      time_zone: 'UTC',
      config_dir: null,
      serverVersion: 'unknown',
    });
  },

  initialize() {
    /* eslint-disable no-use-before-define */
    this.on(actionTypes.SERVER_CONFIG_LOADED, serverConfigLoaded);
    this.on(actionTypes.LOG_OUT, logOut);
    /* eslint-enable no-use-before-define */
  },
});

export default INSTANCE;

function serverConfigLoaded(state, {
  latitude, longitude, location_name, temperature_unit, time_zone, config_dir, version,
}) {
  return toImmutable({
    latitude,
    longitude,
    location_name,
    temperature_unit,
    time_zone,
    config_dir,
    serverVersion: version,
  });
}

function logOut() {
  return INSTANCE.getInitialState();
}
