import { AnimationLoop } from "../AnimationLoop";
import WaveAudio from "../WaveAudio";
import ButtonEle from "../ButtonEle";
import BackingTrack from "../BackingTrack";

interface DrumsToggleButtonConstructor {
    backingTrack: BackingTrack;
}

export class DrumsToggleButton extends ButtonEle {

    constructor({ backingTrack }: DrumsToggleButtonConstructor) {
        super({
            onToggle: (active) => {
                if (active) {
                    backingTrack.unmute();
                } else {
                    backingTrack.mute();
                };
            }
        });
    }

}