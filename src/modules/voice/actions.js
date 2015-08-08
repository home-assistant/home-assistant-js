import debounce from 'lodash/function/debounce';
import {actions as serviceActions} from '../service';
import actionTypes from './action-types';

// Time to wait after last result to start processing.
const NO_RESULT_TIMEOUT = 3000;
const RESULTS = {};

function getResult(reactor) {
  return RESULTS[reactor.hassId];
}

function process(reactor) {
  const recognition = getResult(reactor);
  const text = recognition.finalTranscript || recognition.interimTranscript;

  reactor.dispatch(actionTypes.VOICE_TRANSMITTING, {finalTranscript: text});

  serviceActions.callService(reactor, 'conversation', 'process', {text}).then(
    () => { reactor.dispatch(actionTypes.VOICE_DONE); },
    () => { reactor.dispatch(actionTypes.VOICE_ERROR); }
  );
}

export function stop(reactor) {
  const result = getResult(reactor);

  if (result) {
    result.recognition.stop();
    process(reactor);
    RESULTS[reactor.hassId] = false;
  }
}

export function listen(reactor) {
  const stopForReactor = stop.bind(null, reactor);
  stopForReactor();

  const autostop = debounce(stopForReactor, NO_RESULT_TIMEOUT);

  /* eslint-disable new-cap */
  const recognition = new webkitSpeechRecognition();
  /* eslint-enable new-cap */

  RESULTS[reactor.hassId] = {
    recognition,
    interimTranscript: '',
    finalTranscript: '',
  };

  recognition.interimResults = true;

  recognition.onstart = () => reactor.dispatch(actionTypes.VOICE_START);
  recognition.onerror = () => reactor.dispatch(actionTypes.VOICE_ERROR);
  recognition.onend = stopForReactor;

  recognition.onresult = (event) => {
    const result = getResult(reactor);

    if (!result) {
      return;
    }

    let finalTranscript = '';
    let interimTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }

    result.interimTranscript = interimTranscript;
    result.finalTranscript += finalTranscript;

    reactor.dispatch(actionTypes.VOICE_RESULT, {
      interimTranscript,
      finalTranscript: result.finalTranscript,
    });

    autostop();
  };

  recognition.start();
}
