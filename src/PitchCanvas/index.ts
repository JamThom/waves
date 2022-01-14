import DrawingBoard from "../DrawingBoard";
import WaveShape from "../WaveShape";


interface PitchCanvasConstructor {
  pitchWaveShape: WaveShape;
};

export default class PitchCanvas extends DrawingBoard {

  constructor({ pitchWaveShape }: PitchCanvasConstructor) {
    super({
      width: window.innerWidth < window.innerHeight ? window.innerWidth : window.innerWidth / 2,
      height: window.innerHeight / 2,
      onDraw: (x, y) => {
        const pitchShape = pitchWaveShape.setShape(x, y);
        this.setWave(pitchShape);
      }
    })
    this.setWave(pitchWaveShape.getWave());
  }
}
