import nuclearJS from 'nuclear-js';

const { Reactor } = nuclearJS;
let reactorCount = 0;

export default function createReactor() {
  const reactor = new Reactor({
    debug: __DEV__ || __DEMO__,
  });

  reactor.hassId = reactorCount++;

  return reactor;
}
