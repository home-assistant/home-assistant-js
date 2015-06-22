import { Store } from 'nuclear-js';

class IsFetchingStore extends Store {
  getInitialState() {
    return 'webkitSpeechRecognition' in window;
  }
}

const INSTANCE = new IsFetchingStore();

export default INSTANCE;
