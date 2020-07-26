/**
 * Copyright © Rob Aimes - https://aimes.dev
 * https://github.com/robaimes
 */

define([
    'jquery',
    'mage/translate',
    'Magento_Customer/js/customer-data',
    'jquery-ui-modules/widget'
], function ($, $t, customerData) {

    $.widget("aimes.voiceSearch", {
        options: {
            searchInput: '#search',
            activeClass: 'recording active',
            storeLocale: 'en-US',
            skipSuggestions: 0,
        },

        recognition: null,
        active: false,

        _init: function () {
            if (('webkitSpeechRecognition' || 'SpeechRecognition') in window) {
                this._initVoiceSearch();
            }
        },

        _initVoiceSearch: function () {
            var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

            this.recognition = new SpeechRecognition();
            this.recognition.lang = this.options.storeLocale;

            this.recognition.onaudioend = this._onAudioEnd.bind(this);
            this.recognition.onaudiostart = this._onAudioStart.bind(this);
            this.recognition.onend = this._onEnd.bind(this);
            this.recognition.onerror = this._onError.bind(this);
            this.recognition.onnomatch = this._onNoMatch.bind(this);
            this.recognition.onresult = this._onResult.bind(this);
            this.recognition.onsoundend = this._onSoundEnd.bind(this);
            this.recognition.onsoundstart = this._onSoundStart.bind(this);
            this.recognition.onspeechend = this._onSpeechEnd.bind(this);
            this.recognition.onspeechstart = this._onSpeechStart.bind(this);
            this.recognition.onstart = this._onStart.bind(this);

            this.element.on({
                mousedown: this._onMouseDown.bind(this),
                click: this._onClick.bind(this),
                touchstart: this._onClick.bind(this),
            });

            $(this.element).removeClass('hidden');
        },

        _onMouseDown: function (event) {
            event.preventDefault(); // Prevent stealing focus to prevent issues with mageQuickSearch widget
        },

        _onClick: function (event) {
            this.active ? this.stopSpeechRecogniton() : this.startSpeechRecognition();
        },

        startSpeechRecognition: function () {
            this.recognition.start();
            this.active = true;
            $(this.element).addClass(this.options.activeClass);
        },

        stopSpeechRecogniton: function () {
            this.recognition.stop();
            this.active = false;
            $(this.element).removeClass(this.options.activeClass);
        },

        _onAudioEnd: function () {
            // Open for extension
        },

        _onAudioStart: function () {
            // Open for extension
        },

        _onEnd: function () {
            this.stopSpeechRecogniton();
        },

        _onError: function (event) {
            var message = this._getErrorMessage(event);

            this._addPageMessage(
                $t(message),
                'error'
            );
        },

        _onNoMatch: function (event) {
            this._addPageMessage(
                $t('Unable to recognise that phrase. Please try again.'),
                'warning'
            );
        },

        _onResult: function (event) {
            var last = event.results.length - 1,
                voiceInput = event.results[last][0].transcript;

            if (voiceInput) {
                this._searchVoiceInput(voiceInput);
            } else {
                this._onNoMatch(event);
            }
        },

        _onSoundEnd: function () {
            // Open for extension
        },

        _onSoundStart: function () {
            // Open for extension
        },

        _onSpeechEnd: function () {
            this.stopSpeechRecogniton();
        },

        _onSpeechStart: function () {
            // Open for extension
        },

        _onStart: function () {
            // Open for extension
        },

        _searchVoiceInput: function (voiceInput) {
            var $search = $(this.options.searchInput)

            $search.val(voiceInput);

            if (this.options.skipSuggestions) {
                $search.closest('form').submit();
            } else {
                $search.trigger('input');
            }
        },

        _getErrorMessage: function (event) {
            var errorCode = event.error,
                logError = false,
                message = '';

            switch (errorCode) {
                case 'no-speech':
                    message = 'No speech was detected.';
                    break;
                case 'not-allowed':
                    message = 'Unable to start voice search. Please check your browser permissions and allow this website to use the microphone.';
                    break;
                case 'language-not-supported':
                    message = 'Unfortunately, your language is not supported by speech to text services at this time.';
                    break;
                case 'aborted':
                    message = 'Voice capture has been aborted.';
                    break;
                case 'audio-capture':
                    message = 'Voice capture has failed.';
                    break;
                case 'network':
                    message = 'Network connectivity is required for voice input.';
                    break;
                default:
                    message = 'An error has occurred with the speech to text services.';
                    logError = true;
                    break;
            }

            if (logError && event.message) {
                console.error(event.message);
            }

            return message;
        },

        _addPageMessage: function (message, type) {
            var customerMessages = customerData.get('messages')() || {},
                messages = customerMessages.messages || [];

            messages.push({
               text: message,
               type: type
            });

            customerMessages.messages = messages;

            customerData.set('messages', customerMessages);
        }
    });

    return $.aimes.voiceSearch;
});
