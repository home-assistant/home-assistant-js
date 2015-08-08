import { localStoragePreferences } from './modules/preferences';
import createReactor from './util/create-reactor';
import exposeModules from './util/expose-modules';
import util from './util/ui-util';

import * as auth from './modules/auth';
import * as config from './modules/config';
import * as entity from './modules/entity';
import * as entityHistory from './modules/entity-history';
import * as event from './modules/event';
import * as logbook from './modules/logbook';
import * as moreInfo from './modules/more-info';
import * as navigation from './modules/navigation';
import * as notification from './modules/notification';
import * as service from './modules/service';
import * as stream from './modules/stream';
import * as sync from './modules/sync';
import * as voice from './modules/voice';
import * as restApi from './modules/rest-api';

const reactor = createReactor();

const hass = {
  reactor,
  localStoragePreferences,
  util,
  demo: __DEMO__,
  startUrlSync: navigation.urlSync.startSync.bind(null, reactor),
  stopUrlSync: navigation.urlSync.stopSync.bind(null, reactor),
  startLocalStoragePreferencesSync: localStoragePreferences.startSync.bind(
    localStoragePreferences, reactor)
}

exposeModules(hass, reactor, {
  auth,
  config,
  entity,
  entityHistory,
  event,
  logbook,
  moreInfo,
  navigation,
  notification,
  service,
  stream,
  sync,
  voice,
  restApi,
})

export default hass;
