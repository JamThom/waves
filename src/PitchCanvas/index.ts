import DrawingBoard from "../DrawingBoard";
import WaveShape from "../WaveShape";
import WaveAudio from "../WaveAudio";
import { AnimationLoop } from "../AnimationLoop";


interface PitchCanvasConstructor {
  pitchWaveShape: WaveShape;
  waveAudio: WaveAudio;
  animationLoop: AnimationLoop;
};

export default class PitchCanvas extends DrawingBoard {

  constructor({
    waveAudio,
    pitchWaveShape,
    animationLoop
  }: PitchCanvasConstructor) {
    super({
      width: window.innerWidth / 2,
      height: window.innerHeight / 2,
      onDraw: (x, y) => {
        const pitchShape = pitchWaveShape.setShape(x, y);
        this.setWave(pitchShape);
      }
    })
    this.setWave(pitchWaveShape.getWave());
    animationLoop.onLoop((progress) => {
      const y = this.wave[Math.floor(progress * this.wave.length)];
      const frequency = (1 - (0.9 ** ((1-y)*3))) * 3520;
      waveAudio.setFrequency(frequency);
      this.setProgressDot(progress, y);
    });
  }
}
