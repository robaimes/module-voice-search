# Aimes_VoiceSearch

A simple module that adds voice search capabilities to the Magento 2 global search. An icon will be displayed in the search bar if the module is enabled.

## Installation

Installation via composer is recommended.

 - `composer require aimes/module-voice-search`
 - `php bin/magento module:enable Aimes_VoiceSearch`
 - `php bin/magento setup:upgrade`
 
 Alternatively, if for whatever reason you are not using composer, put the contents of this repository in `<magento_directory>/app/code/Aimes/VoiceSearch`

## Configuration

 - Enable Voice Search `Default: Yes`
    - When disabled this module will have no effect
 - Skip Suggestions `Default: No`
    - With this value set to `No` the search autocomplete suggestions will display to the user
    - With this value set to `Yes` the user will be directed to the relevant catalogsearch page and will not fire an AJAX request to get autocomplete results
    
This module is tested and developed on an _unmodified_ Magento 2.3.5 Open Source instance with Luma theme and sample data. Results may vary using a custom theme.
 
## Developer Notes

The voice search functionality is powered by a jQuery widget `$.aimes.voiceSearch` which exposes 2 public methods for convenience.

 - `startSpeechRecognition` - Start listening for user speech
 - `stopSpeechRecognition` - Stop listening for user speech

Example:

```js
$('#search').voiceSearch('startSpeechRecognition');
$('#search').voiceSearch('stopSpeechRecognition');
``` 

----

The widget has multiple functions for extension. One for each [event](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition#Events). It is suggested you use [mixins](https://devdocs.magento.com/guides/v2.4/javascript-dev-guide/javascript/js_mixins.html) to add additional functionality where appropriate.

## Browser Support

This module makes use of the [SpeechRecognition API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition). Browser support can be seen on this page or on [caniuse](https://caniuse.com/#search=SpeechRecognition).
