import { AnimationLoop } from "../AnimationLoop";

interface BackingTrackConstructor {
    animationLoop: AnimationLoop
}

export default class BackingTrack {

    private player: HTMLAudioElement;

    constructor({ animationLoop }: BackingTrackConstructor) {
        this.player = document.createElement('audio');
        this.player.style.display = 'none';
        this.player.src = require('./amen.m4a').default;
        document.body.append(this.player);
        animationLoop.onStop(() => this.player.pause());
        this.player.volume = 0;
        let previousProgress = 1;
        animationLoop.onLoop((progress) => {
            if (progress < previousProgress) {
                this.player.pause();
                this.player.currentTime = 0;
                this.player.play();
            }
            previousProgress = progress;
        })
    }

    mute() {
        this.player.volume = 0;
    }

    unmute() {
        this.player.volume = 1;
    }


}