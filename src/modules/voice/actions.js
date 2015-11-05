import {actions as serviceActions} from '../service';
import actionTypes from './action-types';

const RESULTS = {};

function getResult(reactor) {
  return RESULTS[reactor.hassId];
}

function process(reactor) {
  const recognition = getResult(reactor);

  if (!recognition) return;

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
    RESULTS[reactor.hassId] = false;
  }
}

export function finish(reactor) {
  process(reactor);
  stop(reactor);
}

export function listen(reactor) {
  const finishForReactor = finish.bind(null, reactor);
  finishForReactor();

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
  recognition.onend = finishForReactor;

  recognition.onresult = (event) => {
    const result = getResult(reactor);

    if (!result) {
      return;
    }

    let finalTranscript = '';
    let interimTranscript = '';

    for (let ind = event.resultIndex; ind < event.results.length; ind++) {
      if (event.results[ind].isFinal) {
        finalTranscript += event.results[ind][0].transcript;
      } else {
        interimTranscript += event.results[ind][0].transcript;
      }
    }

    result.interimTranscript = interimTranscript;
    result.finalTranscript += finalTranscript;

    reactor.dispatch(actionTypes.VOICE_RESULT, {
      interimTranscript,
      finalTranscript: result.finalTranscript,
    });
  };

  recognition.start();
}
