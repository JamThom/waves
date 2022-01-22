import WaveAudio from "../WaveAudio";
import ButtonEle from "../ButtonEle";
import PitchCanvas from "../PitchCanvas";

interface QuantizeToggleButtonConstructor {
    pitchCanvas: PitchCanvas;
}

export class QuantizeToggleButton extends ButtonEle {

    constructor({ pitchCanvas }: QuantizeToggleButtonConstructor) {
        super({
            icons: [
                'icon-th',
                'icon-grid',
            ],
            onToggle: (active) => {
                pitchCanvas.setQuantize(active);
            }
        });
    }

}