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
            this.img = "yespapa.png";
            this.updateDom();
        }
        else if (notification === 'SAY_NOPAPA') {
            this.sendSocketNotification('TTS', "No, Papa");
            this.tts = "No, Papa";
            this.img = "nopapa.png";
            this.updateDom();
        }
        else if (notification === 'SAY_AHAHAH') {
            this.sendSocketNotification('TTS', "Ah. Ah. Ah.");
            this.tts = "AhAhAh";
            this.img = "ahahah.png";
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
        const txt = document.createElement('p');

        txt.innerHTML =  this.tts;

        if(this.img) {
            img.src = this.file('./resources/'+this.img);
            img.setAttribute('height', 160);
        }

        wrapper.appendChild(img);
        wrapper.appendChild(txt);        

        return wrapper;
    }
});
