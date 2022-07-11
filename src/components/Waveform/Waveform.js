import React, { useState, useRef, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: '#E8E6E1',
  progressColor: '#14919B',
  cursorColor: '#14919B',
  autoCenter: true,
  barWidth: 1,
  barRadius: 1,
  barGap: null,
  responsive: true,
  height: 150,
  normalize: true,
  minPxPerSec: 20,
  pixelRatio: 2,
  partialRender: false,
});

function Waveform({ trackInfo, isPlaying }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const url = trackInfo.audio;
  const [playing, setPlaying] = useState(isPlaying);

  useEffect(() => {
    // setPlaying(true);

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(url);

    wavesurfer.current.on('ready', () => {
      wavesurfer.current.playPause();
    });

    return () => wavesurfer.current.destroy();
  }, [url]);

  useEffect(() => {
    // setPlaying(isPlaying);
    handlePlayPause();
  }, [isPlaying]);

  const handlePlayPause = () => {
    wavesurfer.current.playPause();
    setPlaying(wavesurfer.current.isPlaying());
  };

  return (
    <div className='Waveform'>
      <p>{trackInfo.title}</p>
      <button onClick={handlePlayPause}>{playing ? 'Pause' : 'Play'}</button>
      <div id='waveform' ref={waveformRef} />
    </div>
  );
}

export default Waveform;
