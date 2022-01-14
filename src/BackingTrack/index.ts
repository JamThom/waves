export default class BackingTrack {

    private player: HTMLAudioElement;

    constructor() {
        this.player = document.createElement('audio');
        this.player.style.display = 'none';
        this.player.src = require('./amen.m4a').default;
        document.body.append(this.player);
        this.player.volume = 0;
    }

    mute() {
        this.player.volume = 0;
    }

    unmute() {
        this.player.volume = 1;
    }

    play() {
        this.player.currentTime = 2;
        this.player.play();
    }

    pause() {
        this.player.pause();
    }

}