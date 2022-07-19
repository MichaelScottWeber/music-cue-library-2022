import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import './CueLibrary.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Track from '../Track/Track';
import Waveform from '../Waveform/Waveform';

import { firebaseConfig } from '../../constants/firebaseConfig';

function CueLibrary() {
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [isError, setIsError] = useState();
  const [currentTrack, setCurrentTrack] = useState({
    audio: '',
    title: '',
    description: '',
    genre: [],
    instrumentation: [],
    mood: [],
  });
  const [isPlaying, setIsPlaying] = useState();

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const db = getDatabase();
    const trackRef = ref(db, '/');
    setIsError(false);
    setIsLoading(true);
    onValue(trackRef, async (snapshot) => {
      try {
        await setTracks(snapshot.val());
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    });
  }, []);

  const handleCurrentTrack = (track) => {
    if (currentTrack.title !== track.title) {
      setCurrentTrack(track);
      setIsPlaying(true);
      console.log(isPlaying);
    }
  };

  const handleIsPlaying = (bool) => {
    setIsPlaying(bool);
  };

  const trackList = tracks.map((track) => {
    return (
      <li key={track.title}>
        <Track
          trackInfo={track}
          handleCurrentTrack={handleCurrentTrack}
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          handleIsPlaying={handleIsPlaying}
        />
      </li>
    );
  });

  let waveform;
  if (currentTrack.audio) {
    waveform = (
      <Waveform
        trackInfo={currentTrack}
        isPlaying={isPlaying}
        handleIsPlaying={handleIsPlaying}
      />
    );
  } else {
    waveform = <div></div>;
  }

  return (
    <main className='CueLibrary'>
      <Container>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography variant='h1' component='h1'>
              Cue Library
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <div>Filter Section</div>
          </Grid>
          <Grid item xs={12} md={9}>
            {isError && <div>Something went wrong...</div>}
            {isLoading ? (
              <div>LOADING...</div>
            ) : (
              <Stack spacing={2}>{trackList}</Stack>
            )}
          </Grid>
        </Grid>
      </Container>
      {waveform}
    </main>
  );
}

export default CueLibrary;
