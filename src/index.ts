import WaveCanvas from './WaveCanvas';
import WaveAudio from './WaveAudio';
import WaveShape from './WaveShape';
import { AnimationLoop } from './AnimationLoop';
import PitchCanvas from './PitchCanvas';
import BackingTrack from './BackingTrack';
import { PlayPauseButton } from './PlayPauseButton';
import { ReverbToggleButton } from './ReverbToggleButton';
import { DrumsToggleButton } from './DrumsToggleButton';
import penCursor from './PenCursor';
import { QuantizeToggleButton } from './QuantizeToggleButton';

penCursor.init();

const animationLoop = new AnimationLoop({ duration: 4000 });
const audioWaveShape = new WaveShape({
  wave: [...new Array(1024).fill(0).map((x, i) => .15 + (Math.sin((i / 1024) * (Math.PI * 2)) + 1) / 2 * 0.7)]
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
const waveCanvas = new WaveCanvas({ waveAudio, audioWaveShape });
const pitchCanvas = new PitchCanvas({ pitchWaveShape });
const backingTrack = new BackingTrack();


animationLoop.onStart(() => {
  waveAudio.play()
});

let previousProgress = 1;

animationLoop.onLoop((progress) => {

  const pitchWave = pitchWaveShape.getWave();

  waveCanvas.setWaveProgress(pitchWave, progress);


  const pitchY = pitchWave[Math.floor(progress * pitchWave.length)];
  const frequency = (1 - (0.9 ** ((1 - pitchY) * 3))) * 1760;
  waveAudio.setFrequency(frequency);
  pitchCanvas.setProgressDot(progress, pitchY);


  if (progress < previousProgress) {
    backingTrack.play();
  }

  previousProgress = progress;
});

animationLoop.onStop(() => {
  waveAudio.pause();
  backingTrack.pause();
});

const reverbToggleButton = new ReverbToggleButton({ waveAudio });
const playPauseButton = new PlayPauseButton({ animationLoop });
const quantizeToggleButton = new QuantizeToggleButton({ pitchCanvas });
const drumsToggleButton = new DrumsToggleButton({ backingTrack });

waveCanvas.appendTo(document.getElementById('canvas'));
pitchCanvas.appendTo(document.getElementById('canvas'));
playPauseButton.appendTo(document.getElementById('buttons'));
reverbToggleButton.appendTo(document.getElementById('buttons'));
drumsToggleButton.appendTo(document.getElementById('buttons'));
quantizeToggleButton.appendTo(document.getElementById('buttons'));
