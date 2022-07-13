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

function Waveform({ trackInfo, isPlaying, handleIsPlaying }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const url = trackInfo.audio;
  // const [playing, setPlaying] = useState(isPlaying);

  useEffect(() => {
    // setPlaying(true);

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(url);

    wavesurfer.current.on('ready', () => {
      wavesurfer.current.playPause();
      // handleIsPlaying(wavesurfer.current.isPlaying());
    });

    // wavesurfer.current.on('play', () => {
    //   handleIsPlaying(true);
    //   console.log('handleIsPlaying fired true, from wavesurfer.on.play');
    // });

    // wavesurfer.current.on('pause', () => {
    //   handleIsPlaying(false);
    //   console.log('handleIsPlaying fired false');
    // });

    wavesurfer.current.on('finish', () => {
      handleIsPlaying(false);
    });

    return () => wavesurfer.current.destroy();
    // }, [url]);
  }, [trackInfo]);

  // THIS NEEDS TO CHECK WHETHER WAVESURFER IS PLAYING, AND THEN UPDATE CUELIBRARY'S STATE
  useEffect(() => {
    if (isPlaying) {
      wavesurfer.current.play();
    }

    if (!isPlaying) {
      wavesurfer.current.pause();
    }

    // wavesurfer.current.playPause();
    // console.log('useEffect of isPlaying made it Play/Pause');
  }, [isPlaying]);

  const handlePlayPause = () => {
    // wavesurfer.current.playPause();
    // console.log('handlePlayPause fires');
    handleIsPlaying(!wavesurfer.current.isPlaying());
    // console.log('handleIsPlaying fires', wavesurfer.current.isPlaying());
  };

  return (
    <div className='Waveform'>
      <p>{trackInfo.title}</p>
      <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      <div id='waveform' ref={waveformRef} />
    </div>
  );
}

export default Waveform;
