# home-assistant-js
JavaScript backend in [NuclearJS][nuclear-js] for [Home Assistant][home-assistant]. Used by [the Home Assistant Polymer frontend][home-assistant-polymer].

To see it in action, [check out the demo][home-assistant-demo]. Debug mode has been enabled for NuclearJS so make sure to open your developer tools!

## Cool stuff

In this section some of the cool stuff that I built on top of NuclearJS.

The [Rest API module][module-rest-api] holds the data that is being retrieved from the server. The Rest API module is based on the [NuclearJS Rest API example](https://github.com/optimizely/nuclear-js/tree/master/examples/rest-api). This module is the foundation for the [entity][module-entity], [event][module-event] and [service][module-service] modules. Each of these implement their own model, based on [the ImmutableJS Record object][immutablejs-record].

The [more-info module][module-more-info] powers a UI component that shows more information about an entity. The only information that is stored in the store is the ID of the current selected entity. By using composable getters it is able to automatically serve the correct information when an entity is selected or updated. Another nice use of getters can be seen in the [config module][module-config] which allows the dynamic creation of getters to observe if a certain component is loaded.

The [stream module][module-stream] streams all events from the Home Assistant server using the HTML5 [EventSource API][mdn-eventsource]. It dispatches the same actions for received events as when the data would have been loaded using REST api calls.

The [voice module][module-voice] allows the user to send voice commands to Home Assistant. The voice is being translated to text using the HTML5 [SpeechRecognition API][google-speechrecognition]. _(Only available in Chrome)_

The [preferences module][module-preferences] tracks certain parts of the global app state and stores them in local storage to persist them between sessions. The preferences object is queried on launch of the application after which `startSync()` is called to keep the local storage synced with the global app state.

The [navigation module][module-navigation] keeps track of which part of the UI is currently visible. It will sync this state to the URL using the HTML5 [History API][mdn-history]. This allows the users to bookmark a current page in the application and enable the use of browser back and forward buttons. _(Not available in Demo mode)_

Home Assistant JS can be compiled with the DEMO flag enabled. This will override [the `callApi()` method][module-api] to return demo data. The Webpack define plugin is used to convert an environment variable to be available in JS. UglifyJS is used to strip out the demo parts when the demo mode is disabled so it will never ship to production.

[nuclear-js]: http://optimizely.github.io/nuclear-js/
[home-assistant]: https://home-assistant.io
[home-assistant-polymer]: https://github.com/balloob/home-assistant-polymer
[home-assistant-demo]: https://home-assistant.io/demo/

[module-rest-api]: https://github.com/balloob/home-assistant-js/tree/master/src/modules/rest-api
[module-entity]: https://github.com/balloob/home-assistant-js/tree/master/src/modules/entity
[module-event]: https://github.com/balloob/home-assistant-js/tree/master/src/modules/event
[module-service]: https://github.com/balloob/home-assistant-js/tree/master/src/modules/service
[module-more-info]: https://github.com/balloob/home-assistant-js/blob/master/src/modules/more-info/getters.js
[module-config]: https://github.com/balloob/home-assistant-js/blob/master/src/modules/config/getters.js
[module-stream]: https://github.com/balloob/home-assistant-js/blob/master/src/modules/stream/actions.js
[module-voice]: https://github.com/balloob/home-assistant-js/blob/master/src/modules/voice/actions.js
[module-preferences]: https://github.com/balloob/home-assistant-js/blob/master/src/modules/preferences/localstorage-preferences.js
[module-navigation]: https://github.com/balloob/home-assistant-js/blob/master/src/modules/navigation/url-sync.js
[module-api]: https://github.com/balloob/home-assistant-js/blob/master/src/modules/api/call-api.js

[immutablejs-record]: http://facebook.github.io/immutable-js/docs/#/Record
[mdn-eventsource]: https://developer.mozilla.org/en-US/docs/Web/API/EventSource
[mdn-history]: https://developer.mozilla.org/en-US/docs/Web/API/History
[google-speechrecognition]: https://developers.google.com/web/updates/2013/01/Voice-Driven-Web-Apps-Introduction-to-the-Web-Speech-API
