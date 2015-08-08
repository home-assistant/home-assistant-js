/* Keeps the URL in sync with the navigator store */
import {
  getters as moreInfoGetters,
  actions as moreInfoActions
} from '../more-info';
import { activePane, activeFilter, activePage } from './getters';
import { navigate } from './actions';
import paneFilterToPage from './pane-filter-to-page';
import pageToPaneFilter from './page-to-pane-filter';

const IS_SUPPORTED = history.pushState && !__DEMO__;
const PAGE_TITLE = 'Home Assistant';
const SYNCS = {};

function getSync(reactor) {
  return SYNCS[reactor.hassId];
}

function initialSync(reactor) {
  let pane;
  let filter;
  let url;
  // store current state in url or set state based on url
  if (location.pathname === '/') {
    pane = reactor.evaluate(activePane);
    filter = reactor.evaluate(activeFilter);
    url = paneFilterToPage(pane, filter);
  } else {
    const paneFilter = pageToPaneFilter(location.pathname.substr(1));
    pane = paneFilter.pane;
    filter = paneFilter.filter;
    url = location.pathname;
    navigate(reactor, pane, filter);
  }
  history.replaceState({pane, filter}, PAGE_TITLE, url);
}

function popstateChangeListener(reactor, ev) {
  const {pane, filter} = ev.state;

  if (reactor.evaluate(moreInfoGetters.hasCurrentEntityId)) {
    getSync(reactor).ignoreNextDeselectEntity = true;
    moreInfoActions.deselectEntity(reactor);
  } else {
    navigate(reactor, pane, filter);
  }
}

export function startSync(reactor) {
  if (!IS_SUPPORTED) {
    return;
  }

  initialSync(reactor);

  // keep url in sync with state
  const unwatchNavigationObserver = reactor.observe(activePage, (page) => {
    const state = pageToPaneFilter(page);
    if (!(state.pane === history.state.pane &&
          state.filter === history.state.filter)) {
      history.pushState(state, page, `/${page}`);
    }
  });
  const unwatchMoreInfoObserver = reactor.observe(
    moreInfoGetters.hasCurrentEntityId,
    (moreInfoEntitySelected) => {
      if (moreInfoEntitySelected) {
        history.pushState(history.state, PAGE_TITLE, location.pathname);
      /* eslint-disable no-use-before-define */
      } else if (sync.ignoreNextDeselectEntity) {
        sync.ignoreNextDeselectEntity = false;
      /* eslint-enable no-use-before-define */
      } else {
        history.back();
      }
    }
  );
  const boundPopstateChangeListener = popstateChangeListener.bind(null, reactor);
  const sync = {
    unwatchNavigationObserver,
    unwatchMoreInfoObserver,
    popstateChangeListener: boundPopstateChangeListener,
    ignoreNextDeselectEntity: false,
  };

  SYNCS[reactor.hassId] = sync;

  // keep state in sync when url changes via forward/back buttons
  window.addEventListener('popstate', boundPopstateChangeListener);
}

export function stopSync(reactor) {
  if (!IS_SUPPORTED) {
    return;
  }

  const sync = getSync(reactor);
  if (!sync) {
    return;
  }

  sync.unwatchNavigationObserver();
  sync.unwatchMoreInfoObserver();
  window.removeEventListener('popstate', sync.popstateChangeListener);
  SYNCS[reactor.hassId] = false;
}
