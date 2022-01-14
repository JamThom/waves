import { AnimationLoop } from "../AnimationLoop";
import ButtonEle from "../ButtonEle";
import styles from './styles.css';

interface PlayPauseButtonConstructor {
    animationLoop: AnimationLoop;
}

export class PlayPauseButton extends ButtonEle {

    constructor({ animationLoop }: PlayPauseButtonConstructor) {
        super({
            onToggle: (active) => {
            if (active) {
                animationLoop.play();
            } else {
                animationLoop.stop();
            };
        }
    })
    this.ele.classList.add(styles.button)
    }

}