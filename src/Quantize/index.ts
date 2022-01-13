import WaveShape from "../WaveShape";

interface QuantizeConstructor {
    waveShape: WaveShape
};

export default class Quantize {

    private waveShape: WaveShape;

    constructor({ waveShape }: QuantizeConstructor) {
        this.waveShape = waveShape;
    }

    apply(resolution: number) {
        this.waveShape.getWave().forEach((x: number, i: number) => {
            this.waveShape.setShape(x, i);
        });
    }

}