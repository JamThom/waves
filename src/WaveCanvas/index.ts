import DrawingBoard from "../DrawingBoard";
import WaveAudio from "../WaveAudio";
import WaveShape from "../WaveShape";


interface WavePointConstructor {
  audioWaveShape: WaveShape;
  waveAudio: WaveAudio;
};

export default class WavePoint extends DrawingBoard {

  private dotX = 0;

  constructor({
    audioWaveShape,
    waveAudio
  }: WavePointConstructor) {
    super({
      width: window.innerWidth < window.innerHeight ? window.innerWidth : window.innerWidth / 2,
      height: window.innerHeight / 2,
      onDraw: (x, y) => {
        const wave = audioWaveShape.setShape(x, y);
        this.setWave(wave);
        waveAudio.setWave(wave);
      }
    })
    this.setWave(audioWaveShape.getWave());
  }
  
  setWaveProgress(pitchWave: number[], progress: number) {
    const next = 1 - (pitchWave[Math.floor(progress * this.wave.length)]??0.1);
    this.dotX += next * next;
    const y = this.wave[Math.floor((this.dotX % 1) * this.wave.length)];
    console.log(progress, this.dotX);
    this.setProgressDot((this.dotX % 1), y);
  }
}
