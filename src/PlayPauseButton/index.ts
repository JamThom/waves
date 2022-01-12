import { AnimationLoop } from "../AnimationLoop";
import WaveAudio from "../WaveAudio";
import ButtonEle from "../ButtonEle";

interface PlayPauseButtonConstructor {
    animationLoop: AnimationLoop;
    text: string;
    waveAudio: WaveAudio;
}

export class PlayPauseButton extends ButtonEle {

    constructor({ animationLoop, waveAudio }: PlayPauseButtonConstructor) {
        super();
        this.ele.addEventListener('click', () => {
            if (!animationLoop.playing) {
                waveAudio.play();
                this.ele.innerHTML = 'STOP';
                animationLoop.playLoop();
            } else {
                waveAudio.pause();
                this.ele.innerHTML = 'PLAY';
                animationLoop.stop();
            };
        });
        this.ele.innerHTML = 'PLAY';
    }

}