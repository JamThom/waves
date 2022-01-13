import { AnimationLoop } from "../AnimationLoop";
import WaveAudio from "../WaveAudio";
import ButtonEle from "../ButtonEle";
import BackingTrack from "../BackingTrack";

interface DrumsToggleButtonConstructor {
    backingTrack: BackingTrack;
}

export class DrumsToggleButton extends ButtonEle {

    private muted = false;

    constructor({ backingTrack }: DrumsToggleButtonConstructor) {
        super();
        this.ele.addEventListener('click', () => {
            this.muted = !this.muted;
            if (this.muted) {
                backingTrack.unmute();
            } else {
                backingTrack.mute();
            };
        });
        this.ele.innerHTML = '#';
    }

}