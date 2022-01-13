import WaveAudio from "../WaveAudio";
import ButtonEle from "../ButtonEle";

interface ReverbToggleButtonConstructor {
    waveAudio: WaveAudio;
}

export class ReverbToggleButton extends ButtonEle {

    private reverbActive = false;

    constructor({ waveAudio }: ReverbToggleButtonConstructor) {
        super();
        this.ele.addEventListener('click', () => {
            this.reverbActive = !this.reverbActive;
            if (this.reverbActive) {
                waveAudio.setReverb({ mix: 0.75 });
            } else {
                waveAudio.setReverb({ mix: 0 });
            };
        });
        this.ele.innerHTML = 'O';
    }

}