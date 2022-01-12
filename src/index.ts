import WaveCanvas from './WaveCanvas';
import WaveAudio from './WaveAudio';
import WaveShape from './WaveShape';
import { AnimationLoop } from './AnimationLoop';
import PitchCanvas from './PitchCanvas';
import { PlayPauseButton } from './PlayPauseButton';

const animationLoop = new AnimationLoop({ duration: 2000 });
const audioWaveShape = new WaveShape({
  wave: [...new Array(1024).fill(0).map((x, i) => (Math.sin((i/1024) * (Math.PI * 4)) + 1) / 2)]
});
const pitchWaveShape = new WaveShape({
  wave: [...new Array(900).fill(0).map((x, i) => .25 + ((Math.sin((i/1024) * (Math.PI * 2)) + 1) / 2) * 0.5)]
});
const waveAudio = new WaveAudio();
const waveCanvas = new WaveCanvas({ animationLoop, waveShape: audioWaveShape, waveAudio });
const pitchCanvas = new PitchCanvas({ animationLoop, waveAudio, waveShape: pitchWaveShape });
const playPauseButton = new PlayPauseButton({ animationLoop, waveAudio, text: 'Play / pause' });
waveCanvas.appendTo(document.body);
pitchCanvas.appendTo(document.body);
playPauseButton.appendTo(document.body);
