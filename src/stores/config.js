import Config from '../models/config';
import dispatcher from '../app_dispatcher';
import constants from '../constants';
import Store from './store';

let config = new Config();

class ConfigStore extends Store {
  get latitude() {
    return config.latitude;
  }

  get longitude() {
    return config.longitude;
  }

  get temperature_unit() {
    return config.temperature_unit;
  }

  get location_name() {
    return config.location_name;
  }

  get time_zone() {
    return config.time_zone;
  }

  get components() {
    return config.components;
  }
}

const INSTANCE = new ConfigStore();

INSTANCE.dispatchToken = dispatcher.register(payload => {
  switch(payload.actionType) {
    case constants.ACTION_NEW_CONFIG:
      config = Config.fromJSON(payload.config);
      INSTANCE.emitChange();
      break;

    case constants.ACTION_LOG_OUT:
      config = Config();
      INSTANCE.emitChange();
      break;
  }
});

export default INSTANCE;
