import { Reactor } from 'nuclear-js';

export default function createReactor() {
  return Reactor({
    debug: __DEV__ || __DEMO__,
  });
}
