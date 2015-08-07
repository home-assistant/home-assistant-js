import debounce from 'lodash/function/debounce';
import {actions as serviceActions} from '../service';
import actionTypes from './action-types';

// Time to wait after last result to start processing.
const NO_RESULT_TIMEOUT = 3000;

let recognition = null;
let interimTranscript = '';
let finalTranscript = '';

function process(reactor) {
  const text = finalTranscript || interimTranscript;

  reactor.dispatch(actionTypes.VOICE_TRANSMITTING, {finalTranscript: text})

  serviceActions.callService('conversation', 'process', {text: text}).then(function() {
    reactor.dispatch(actionTypes.VOICE_DONE);
  }, function() {
    reactor.dispatch(actionTypes.VOICE_ERROR);
  });
}

export function stop(reactor) {
  if (recognition !== null) {
    recognition.onstart = null;
    recognition.onresult = null;
    recognition.onerror = null;
    recognition.onend = null;
    recognition.stop();
    recognition = null;

    process(reactor);
  }

  interimTranscript = '';
  finalTranscript = '';
}

const autostop = debounce(stop, NO_RESULT_TIMEOUT);

export function listen(reactor) {
  stop();

  recognition = new webkitSpeechRecognition();
  recognition.interimResults = true;

  recognition.onstart = function() {
    reactor.dispatch(actionTypes.VOICE_START);
  };

  recognition.onresult = function(event) {
    interimTranscript = '';

    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }

    reactor.dispatch(actionTypes.VOICE_RESULT,
                  {interimTranscript, finalTranscript})

    autostop();
  };

  recognition.onerror = function() {
    reactor.dispatch(actionTypes.VOICE_ERROR);
  };

  recognition.onend = stop;

  recognition.start();
}
