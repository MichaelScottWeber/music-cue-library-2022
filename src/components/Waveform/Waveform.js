import React, { useState, useRef, useEffect } from 'react';
import './Waveform.css';
import WaveSurfer from 'wavesurfer.js';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import CircularProgress from '@mui/material/CircularProgress';

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
  height: 62,
  normalize: true,
  minPxPerSec: 20,
  pixelRatio: 2,
  partialRender: false,
});

function Waveform({ trackInfo, isPlaying, handleIsPlaying }) {
  const [currentTime, setCurrentTime] = useState();
  const [waveformReady, setWaveformReady] = useState(false);
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const url = trackInfo.audio;

  useEffect(() => {
    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(url);

    setWaveformReady(false);

    wavesurfer.current.on('ready', () => {
      wavesurfer.current.playPause();
      setWaveformReady(true);
    });

    wavesurfer.current.on('audioprocess', () => {
      setCurrentTime(wavesurfer.current.getCurrentTime());
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

  const formatTime = (time) => {
    if (time) {
      const min = Math.floor(time / 60).toString();
      const sec = Math.floor(time % 60)
        .toString()
        .padStart(2, '0');

      return `${min}:${sec}`;
    }
  };

  return (
    <Paper elevation={5} className='Waveform'>
      <Box padding={2}>
        <Typography variant='h6' component='h2' gutterBottom>
          {trackInfo.title}
        </Typography>
        <Stack direction='row' alignItems='center' spacing={0}>
          <Button
            sx={{
              borderRadius: '50px',
              width: '62px',
              height: '62px',
              marginRight: '24px',
            }}
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
          <Typography
            variant='body2'
            component='span'
            sx={{ marginRight: '10px' }}
          >
            {formatTime(currentTime)}
          </Typography>
          <div style={{ width: '100%' }}>
            {!waveformReady ? (
              <div className='waveform-loading'>
                <Typography
                  variant='body1'
                  component='span'
                  sx={{ marginRight: '8px' }}
                >
                  Loading...
                </Typography>
                <CircularProgress />
              </div>
            ) : (
              ''
            )}
            <div id='waveform' ref={waveformRef} />
          </div>
          <Typography variant='body2' component='span'>
            {trackInfo.duration}
          </Typography>
        </Stack>
      </Box>
    </Paper>
  );
}

export default Waveform;
