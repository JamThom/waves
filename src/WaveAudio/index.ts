import Reverb from "@logue/reverb";
import interpolate from "../utils/interpolate";

interface setReverbArgs {
  mix: number;
};

export default class WaveAudio {

  private ac: AudioContext;

  private outputGain: GainNode;

  private audioBuffer: AudioBuffer;

  private source: AudioBufferSourceNode;

  private reverb: Reverb;

  constructor() {
    this.ac = new AudioContext();

    const start = () => {
      this.ac.resume();
      document.removeEventListener('mousedown', start);
    }
    document.addEventListener('mousedown', start);
    this.reverb = new Reverb(this.ac, {
      noise: 1,      
      decay: .3,
      delay: 0,
      filterFreq: 2000,
      filterQ: 10,
      filterType: 'highpass',
      once: false,
      mix: 0,
      reverse: false,
      time: .4
    });
    this.ac.createDelay()
    this.audioBuffer = this.ac.createBuffer(2, this.ac.sampleRate, this.ac.sampleRate);
    this.source = this.ac.createBufferSource();
    this.source.buffer = this.audioBuffer;
    this.source.loop = true;
    this.outputGain = this.ac.createGain();
    this.source.connect(this.outputGain);
    const output = this.reverb.connect(this.outputGain);
    output.connect(this.ac.destination);
    this.outputGain.gain.value = 1;
    this.source.start();
  }

  setReverb({ mix }: setReverbArgs) {
    this.reverb.mix(mix);
  }

  play() {
    this.outputGain.gain.setTargetAtTime(0.3, 0, 0);
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
        nowBuffering[i] = interpolatedWave[(i+(channel*1000))%interpolatedWave.length] * 2 - 1;
      }
    }
  }

}
