import { actions as authActions, getters as authGetters } from './modules/auth';
import { actions as configActions, getters as configGetters } from './modules/config';
import { actions as entityActions, getters as entityGetters } from './modules/entity';
import { actions as entityHistoryActions, getters as entityHistoryGetters } from './modules/entity-history';
import { actions as eventActions, getters as eventGetters } from './modules/event';
import { actions as logbookActions, getters as logbookGetters } from './modules/logbook';
import { actions as moreInfoActions, getters as moreInfoGetters } from './modules/more-info';
import { actions as navigationActions, getters as navigationGetters } from './modules/navigation';
import { actions as notificationActions, getters as notificationGetters } from './modules/notification';
import reactor from './flux';
import { actions as serviceActions, getters as serviceGetters } from './modules/service';
import { actions as streamActions, getters as streamGetters } from './modules/stream';
import { actions as syncActions, getters as syncGetters } from './modules/sync';
import * as util from './util';
import { actions as voiceActions, getters as voiceGetters } from './modules/voice';

export default {
  authActions, authGetters,
  configActions, configGetters,
  entityActions, entityGetters,
  entityHistoryActions, entityHistoryGetters,
  eventActions, eventGetters,
  logbookActions, logbookGetters,
  moreInfoActions, moreInfoGetters,
  navigationActions, navigationGetters,
  notificationActions, notificationGetters,
  reactor,
  serviceActions, serviceGetters,
  streamActions, streamGetters,
  syncActions, syncGetters,
  util,
  voiceActions, voiceGetters,
};
