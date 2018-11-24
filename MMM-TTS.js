/* global Module Log */

/* Magic Mirror
 * Module: MMM-TTS
 *
 * By fewieden https://github.com/fewieden/MMM-TTS
 *
 * MIT Licensed.
 */

Module.register('MMM-TTS', {
    tts: '',

    defaults: {
        text: 'MMM-TTS',
        voice: null,
        speed: 1.0,
        debug: false
    },

    start() {
        Log.info(`Starting module: ${this.name}`);
        this.tts = this.config.text;
        this.sendSocketNotification('CONFIG', this.config);
    },

    notificationReceived(notification, payload) {
        if (notification === 'MMM-TTS') {
            this.sendSocketNotification('TTS', payload);
            this.tts = payload;
            this.updateDom();
        }
        else if (notification === 'SAY_YESPAPA') {
            this.sendSocketNotification('TTS', "Yes, Papa");
            this.tts = "Yes, Papa";
            this.updateDom();
        }
        else if (notification === 'SAY_NOPAPA') {
            this.sendSocketNotification('TTS', "No, Papa");
            this.tts = "No, Papa";
            this.updateDom();
        }
        else if (notification === 'SAY_AHAHAH') {
            this.sendSocketNotification('TTS', "Ah. Ah. Ah.");
            this.tts = "AhAhAh";
            this.updateDom();
        }
    },

    socketNotificationReceived(notification) {
        if (notification === 'HIDE') {
            this.tts = this.config.text;
            this.updateDom();
        }
    },

    getDom() {
        const wrapper = document.createElement('div');

        const img = document.createElement('img');
        const txt = document.createElement('h1');

        txt.innerHTML =  this.tts;

        wrapper.appendChild(txt);
        wrapper.appendChild(img);

        return wrapper;
    }
});
