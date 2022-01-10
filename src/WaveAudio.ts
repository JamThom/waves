export default class WaveAudio {
  ac;

  outputGain;

  oscillator;

  initAudio() {
    this.ac.audioWorklet.addModule('src/white-noise-processor.js').then(() => {
      const whiteNoiseNode = new AudioWorkletNode(this.ac, 'white-noise-processor');
      whiteNoiseNode.connect(this.ac.destination);
    }).catch(console.error);
  }

  constructor() {
    this.ac = new AudioContext();
    this.initAudio();
    this.outputGain = this.ac.createGain();
    this.oscillator = this.ac.createOscillator();
  }
}
