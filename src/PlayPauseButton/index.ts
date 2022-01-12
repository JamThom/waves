import { AnimationLoop } from "../AnimationLoop";
import WaveAudio from "../WaveAudio";
import styles from './styles.css';

interface PlayPauseButtonConstructor {
    animationLoop: AnimationLoop;
    text: string;
    waveAudio: WaveAudio;
}

export class PlayPauseButton {

    private ele: HTMLButtonElement;

    constructor({ animationLoop, waveAudio, text }: PlayPauseButtonConstructor) {
        this.ele = document.createElement('button');
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
        this.ele.setAttribute('class', styles.button);
        this.ele.innerHTML = 'PLAY';
    }

    appendTo(target: HTMLElement) {
        target.append(this.ele);
    }
}