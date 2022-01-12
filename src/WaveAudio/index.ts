const Reverb = require("@logue/reverb");
import interpolate from "../utils/interpolate";

export default class WaveAudio {

  private ac: AudioContext;

  private outputGain: GainNode;

  private audioBuffer: AudioBuffer;

  private source: AudioBufferSourceNode;

  constructor() {
    this.ac = new AudioContext();

    const start = () => {
      this.ac.resume();
      document.removeEventListener('click', start);
    }
    document.addEventListener('mousedown', start);
    const reverb = new Reverb.default(this.ac, {
      noise: 0,      
      decay: 100,
      delay: 1,
      filterFreq: 5000,
      filterQ: 1,
      filterType: 'lowpass',
      once: false,
      mix: 0.5,
      reverse: false,
      time: 50
    });
    this.audioBuffer = this.ac.createBuffer(2, this.ac.sampleRate, this.ac.sampleRate);
    this.source = this.ac.createBufferSource();
    this.source.buffer = this.audioBuffer;
    this.source.loop = true;
    this.outputGain = this.ac.createGain();
    this.source.connect(this.outputGain);
    reverb.connect(this.outputGain);
    this.outputGain.connect(this.ac.destination);
    this.outputGain.gain.value = 1;
    this.source.start();
  }

  play() {
    this.outputGain.gain.setTargetAtTime(0.5, 0, 0);
  }

  pause() {
    this.outputGain.gain.setTargetAtTime(0, 0, 0);
  }

  setFrequency(value: number) {
    this.source.playbackRate.setTargetAtTime(value, 0, 0);
  }

  setWave(wave: number[]) {
    const interpolatedWave = interpolate(wave, this.audioBuffer.length);
    for (let channel = 0; channel < this.audioBuffer.numberOfChannels; channel++) {
      const nowBuffering = this.audioBuffer.getChannelData(channel);
      for (let i = 0; i < this.audioBuffer.length; i++) {
        nowBuffering[i] = interpolatedWave[i] * 2 - 1;
      }
    }
  }

}
