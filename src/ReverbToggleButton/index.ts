import WaveAudio from "../WaveAudio";
import ButtonEle from "../ButtonEle";

interface ReverbToggleButtonConstructor {
    waveAudio: WaveAudio;
}

export class ReverbToggleButton extends ButtonEle {

    constructor({ waveAudio }: ReverbToggleButtonConstructor) {
        super({
            icons: [
                'icon-dot',
                'icon-dot-circled',
            ],
            onToggle: (active) => {
                if (active) {
                    waveAudio.setReverb({ mix: 0.75 });
                } else {
                    waveAudio.setReverb({ mix: 0 });
                };
            }
        });
    }

}