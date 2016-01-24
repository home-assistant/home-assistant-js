import { localStoragePreferences } from './modules/preferences';
import createReactor from './util/create-reactor';
import exposeModules from './util/expose-modules';
import util from './util/ui-util';

import * as auth from './modules/auth';
import * as config from './modules/config';
import * as entity from './modules/entity';
import * as entityHistory from './modules/entity-history';
import * as errorLog from './modules/error-log';
import * as event from './modules/event';
import * as logbook from './modules/logbook';
import * as moreInfo from './modules/more-info';
import * as navigation from './modules/navigation';
import * as notification from './modules/notification';
import * as section from './modules/section';
import * as service from './modules/service';
import * as stream from './modules/stream';
import * as sync from './modules/sync';
import * as template from './modules/template';
import * as voice from './modules/voice';
import * as restApi from './modules/rest-api';

export default class HomeAssistant {
  constructor() {
    const reactor = createReactor();

    Object.defineProperties(this, {
      // attributes
      demo: {
        value: __DEMO__,
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
        value: navigation.urlSync.startSync.bind(null, reactor),
      },

      stopUrlSync: {
        value: navigation.urlSync.stopSync.bind(null, reactor),
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
      section,
      service,
      stream,
      sync,
      template,
      voice,
      restApi,
    });
  }
}
