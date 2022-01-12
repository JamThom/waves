import WaveCanvas from './WaveCanvas';
import WaveAudio from './WaveAudio';
import WaveShape from './WaveShape';
import { AnimationLoop } from './AnimationLoop';
import PitchCanvas from './PitchCanvas';
import BackingTrack from './BackingTrack';
import { PlayPauseButton } from './PlayPauseButton';

const animationLoop = new AnimationLoop({ duration: 2000 });
const audioWaveShape = new WaveShape({
  wave: [...new Array(1024).fill(0).map((x, i) => (Math.sin((i/1024) * (Math.PI * 4)) + 1) / 2)]
});
const pitchWaveShape = new WaveShape({
  wave: [...new Array(900).fill(0).map((x, i) => .25 + ((Math.sin((i/1024) * (Math.PI * 2)) + 1) / 2) * 0.5)]
});
const waveAudio = new WaveAudio();
animationLoop.onStart(() => {console.log(8);waveAudio.play()});
animationLoop.onStop(() => waveAudio.pause());
const waveCanvas = new WaveCanvas({ animationLoop, waveAudio, audioWaveShape });
const pitchCanvas = new PitchCanvas({ animationLoop, waveAudio, pitchWaveShape });
const playPauseButton = new PlayPauseButton({ animationLoop, waveAudio, text: 'Play / pause' });
const backingTrack = new BackingTrack({ animationLoop });
waveCanvas.appendTo(document.body);
pitchCanvas.appendTo(document.body);
playPauseButton.appendTo(document.body);
