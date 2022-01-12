import DrawingBoard from "../DrawingBoard";
import WaveShape from "../WaveShape";
import WaveAudio from "../WaveAudio";
import { AnimationLoop } from "../AnimationLoop";


interface PitchCanvasConstructor {
  waveShape: WaveShape;
  waveAudio: WaveAudio;
  animationLoop: AnimationLoop;
};

export default class PitchCanvas extends DrawingBoard {

  constructor({
    waveAudio,
    waveShape,
    animationLoop
  }: PitchCanvasConstructor) {
    super({
      width: window.innerWidth / 2,
      height: window.innerHeight / 2,
      onDraw: (x, y) => {
        const pitchShape = waveShape.setShape(x, y);
        this.setWave(pitchShape);
      }
    })
    this.setWave(waveShape.getWave());
    animationLoop.onLoop((progress) => {
      const y = this.wave[Math.floor(progress * this.wave.length)];
      const frequency = 2 ** ((1-y) * 10);
      waveAudio.setFrequency(frequency);
      this.setProgressDot(progress, y);
    });
  }
}
