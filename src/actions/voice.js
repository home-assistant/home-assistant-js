'use strict';

import dispatcher from '../app_dispatcher';
import constants from '../constants';
import { callService } from './service';

let recognition = null;
let interimTranscript = '';
let finalTranscript = '';

export function isSupported() {
  return 'webkitSpeechRecognition' in window;
}

function process() {
  let text = finalTranscript || interimTranscript;

  dispatcher.dispatch({
    actionType: constants.ACTION_LISTENING_TRANSMITTING,
    finalTranscript: text,
  });

  callService('conversation', 'process', {text: text}).then(function() {
    dispatcher.dispatch({
      actionType: constants.ACTION_LISTENING_DONE,
      finalTranscript: text,
    });
  }, function() {
    dispatcher.dispatch({
      actionType: constants.ACTION_LISTENING_ERROR,
    });
  });
}

export function stop() {
  if (recognition !== null) {
    recognition.onstart = null;
    recognition.onresult = null;
    recognition.onerror = null;
    recognition.onend = null;
    recognition.stop();

    process();
  }

  interimTranscript = '';
  finalTranscript = '';
}

export function listen() {
  stop();

  window.r = recognition = new webkitSpeechRecognition();
  recognition.interimResults = true;

  recognition.onstart = function() {
    dispatcher.dispatch({
      actionType: constants.ACTION_LISTENING_START,
    });
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

    dispatcher.dispatch({
      actionType: constants.ACTION_LISTENING_RESULT,
      interimTranscript: interimTranscript,
      finalTranscript: finalTranscript,
    });
  };

  recognition.onerror = function() {
    dispatcher.dispatch({
      actionType: constants.ACTION_LISTENING_ERROR,
    });
  };

  recognition.onend = stop;

  recognition.start();
}
