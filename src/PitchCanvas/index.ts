import DrawingBoard from "../DrawingBoard";
import WaveShape from "../WaveShape";


interface PitchCanvasConstructor {
  pitchWaveShape: WaveShape;
};

export default class PitchCanvas extends DrawingBoard {

  private quantize = false;

  constructor({ pitchWaveShape }: PitchCanvasConstructor) {
    super({
      width: window.innerWidth < window.innerHeight ? window.innerWidth : window.innerWidth / 2,
      height: window.innerHeight / 2,
      onDraw: (x, y) => {
        let pitchShape;
        if (this.quantize) {
          const res = 32;
          const quantizedX = x * res;
          const startX = Math.floor(quantizedX) / res;
          const endX = Math.ceil(quantizedX) / res;
          pitchWaveShape.setShape(startX, y);
          pitchShape = pitchWaveShape.setShape(Math.min(endX, 0.999), y);
        } else {
          pitchShape = pitchWaveShape.setShape(x, y);
        }
        this.setWave(pitchShape);
      }
    })
    this.setWave(pitchWaveShape.getWave());
  }

  setQuantize(quantize: boolean) {
    this.quantize = quantize;
  }
}
