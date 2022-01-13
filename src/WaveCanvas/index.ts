import { AnimationLoop } from "../AnimationLoop";
import DrawingBoard from "../DrawingBoard";
import WaveAudio from "../WaveAudio";
import WaveShape from "../WaveShape";


interface WavePointConstructor {
  audioWaveShape: WaveShape;
  waveAudio: WaveAudio;
  animationLoop: AnimationLoop;
  pitchWaveShape: WaveShape;
};

export default class WavePoint extends DrawingBoard {

  private dotX = 0;

  private pitchWaveShape: WaveShape;

  constructor({
    audioWaveShape,
    waveAudio,
    animationLoop,
    pitchWaveShape
  }: WavePointConstructor) {
    super({
      width: window.innerWidth / 2,
      height: window.innerHeight / 2,
      onDraw: (x, y) => {
        const wave = audioWaveShape.setShape(x, y);
        this.setWave(wave);
        waveAudio.setWave(wave);
      }
    })
    this.pitchWaveShape = pitchWaveShape;
    this.setWave(audioWaveShape.getWave());
    animationLoop.onLoop((progress) => {
      const next = 1 - (this.pitchWaveShape.getWave()[Math.floor(progress * this.wave.length)]??0.1);
      this.dotX += next * next;
      const y = this.wave[Math.floor((this.dotX % 1) * this.wave.length)];
      console.log(progress, this.dotX);
      this.setProgressDot((this.dotX % 1), y);
    });
  }
}
