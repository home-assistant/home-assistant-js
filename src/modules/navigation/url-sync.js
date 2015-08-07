/* Keeps the URL in sync with the navigator store */
import {
  getters as moreInfoGetters,
  actions as moreInfoActions
} from '../more-info';
import { activePane, activeFilter, activePage } from './getters';
import { navigate } from './actions';
import paneFilterToPage from './pane-filter-to-page';
import pageToPaneFilter from './page-to-pane-filter';

const isSupported = history.pushState && !__DEMO__;
const title = 'Home Assistant';

let ignoreNextDeselectEntity = false;
let unwatchNavigationObserver;
let unwatchMoreInfoObserver;

function initialSync(reactor) {
  let pane, filter, url;
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
  history.replaceState({pane, filter}, title, url);
}

function popstateChangeListener(reactor, ev) {
  const {pane, filter} = ev.state;

  if (reactor.evaluate(moreInfoGetters.hasCurrentEntityId)) {
    ignoreNextDeselectEntity = true;
    moreInfoActions.deselectEntity();
  } else {
    navigate(reactor, pane, filter);
  }
};

export function startSync(reactor) {
  if (!isSupported) {
    return;
  }

  initialSync(reactor);

  // keep url in sync with state
  unwatchNavigationObserver = reactor.observe(activePage, (page) => {
    const state = pageToPaneFilter(page);
    if (!(state.pane === history.state.pane &&
          state.filter == history.state.filter)) {
      history.pushState(state, page, `/${page}`);
    }
  });

  unwatchMoreInfoObserver = reactor.observe(
    moreInfoGetters.hasCurrentEntityId,
    (moreInfoEntitySelected) => {
      if (moreInfoEntitySelected) {
        history.pushState(history.state, title, location.pathname);
      } else if (ignoreNextDeselectEntity) {
        ignoreNextDeselectEntity = false;
      } else {
        history.back();
      }
    }
  );

  // keep state in sync when url changes via forward/back buttons
  window.addEventListener('popstate', popstateChangeListener.bind(null, reactor));
};

export function stopSync(reactor) {
  if (!isSupported) {
    return;
  }

  if (unwatchNavigationObserver) {
    unwatchNavigationObserver();
    unwatchMoreInfoObserver();
  }

  window.removeEventListener('popstate', popstateChangeListener);
}
