import WaveCanvas from './WaveCanvas';
import WaveAudio from './WaveAudio';
import WaveShape from './WaveShape';
import { AnimationLoop } from './AnimationLoop';
import PitchCanvas from './PitchCanvas';
import BackingTrack from './BackingTrack';
import { PlayPauseButton } from './PlayPauseButton';
import { ReverbToggleButton } from './ReverbToggleButton';
import { DrumsToggleButton } from './DrumsToggleButton';

const animationLoop = new AnimationLoop({ duration: 4000 });
const audioWaveShape = new WaveShape({
  wave: [...new Array(1024).fill(0).map((x, i) => .15 + (Math.sin((i/1024) * (Math.PI * 2)) + 1) / 2 * 0.7)]
});
const pitchWaveShape = new WaveShape({
  wave: [
    ...new Array(900).fill(0).map((x, i) => {
      const progress = 1 - (i / 900);
      return 1 - (progress * progress)
    })
  ]
});
const waveAudio = new WaveAudio();
waveAudio.setWave(audioWaveShape.getWave());
animationLoop.onStart(() => {waveAudio.play()});
animationLoop.onStop(() => waveAudio.pause());
const waveCanvas = new WaveCanvas({ animationLoop, waveAudio, audioWaveShape, pitchWaveShape });
const pitchCanvas = new PitchCanvas({ animationLoop, waveAudio, pitchWaveShape });
const playPauseButton = new PlayPauseButton({ animationLoop, waveAudio });
const reverbToggleButton = new ReverbToggleButton({ waveAudio });
const backingTrack = new BackingTrack({ animationLoop });
const drumsToggleButton = new DrumsToggleButton({ backingTrack });
waveCanvas.appendTo(document.getElementById('canvas'));
pitchCanvas.appendTo(document.getElementById('canvas'));
playPauseButton.appendTo(document.getElementById('buttons'));
reverbToggleButton.appendTo(document.getElementById('buttons'));
drumsToggleButton.appendTo(document.getElementById('buttons'));
