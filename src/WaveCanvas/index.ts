import { AnimationLoop } from "../AnimationLoop";
import DrawingBoard from "../DrawingBoard";
import WaveAudio from "../WaveAudio";
import WaveShape from "../WaveShape";


interface WavePointConstructor {
  waveShape: WaveShape;
  waveAudio: WaveAudio;
  animationLoop: AnimationLoop;
};

export default class WavePoint extends DrawingBoard {

  constructor({
    waveShape,
    waveAudio,
    animationLoop
  }: WavePointConstructor) {
    super({
      width: window.innerWidth / 2,
      height: window.innerHeight / 2,
      onDraw: (x, y) => {
        const wave = waveShape.setShape(x, y);
        this.setWave(wave);
        waveAudio.setWave(wave);
      }
    })
    this.setWave(waveShape.getWave());
    animationLoop.onLoop((progress) => {
      const x = (progress * 3) % 1;
      const y = this.wave[Math.floor(x * this.wave.length)];
      this.setProgressDot(x, y);
    });
  }
}
