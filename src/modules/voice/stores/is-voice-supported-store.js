import { Store } from 'nuclear-js';

const INSTANCE = new Store({
  getInitialState() {
    return 'webkitSpeechRecognition' in window;
  },
});

export default INSTANCE;
