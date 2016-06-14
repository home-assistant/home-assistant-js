import nuclearJS from 'nuclear-js';

const { Store } = nuclearJS;

const INSTANCE = new Store({
  getInitialState() {
    return 'webkitSpeechRecognition' in window;
  },
});

export default INSTANCE;
