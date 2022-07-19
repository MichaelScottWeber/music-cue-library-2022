import React, { useState, useRef, useEffect } from 'react';
import './Waveform.css';
import WaveSurfer from 'wavesurfer.js';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

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
  height: 100,
  normalize: true,
  minPxPerSec: 20,
  pixelRatio: 2,
  partialRender: false,
});

function Waveform({ trackInfo, isPlaying, handleIsPlaying }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const url = trackInfo.audio;

  useEffect(() => {
    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(url);

    wavesurfer.current.on('ready', () => {
      wavesurfer.current.playPause();
    });

    wavesurfer.current.on('finish', () => {
      handleIsPlaying(false);
    });

    return () => wavesurfer.current.destroy();
  }, [trackInfo]);

  useEffect(() => {
    if (isPlaying) {
      wavesurfer.current.play();
    }

    if (!isPlaying) {
      wavesurfer.current.pause();
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    handleIsPlaying(!wavesurfer.current.isPlaying());
  };

  return (
    <Paper elevation={5} className='Waveform'>
      <Typography variant='h4' component='h2'>
        {trackInfo.title}
      </Typography>
      <Button
        sx={{ borderRadius: '50px', width: '62px', height: '62px' }}
        disableElevation
        variant='contained'
        size='small'
        aria-label='play/pause'
        onClick={handlePlayPause}
      >
        {isPlaying ? (
          <PauseIcon fontSize='large' />
        ) : (
          <PlayArrowIcon fontSize='large' />
        )}
      </Button>
      <div id='waveform' ref={waveformRef} />
    </Paper>
  );
}

export default Waveform;
