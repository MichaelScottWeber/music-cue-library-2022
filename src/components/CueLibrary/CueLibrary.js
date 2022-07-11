import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

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
    // If currentTrack is empty, set currentTrack and set isPlaying to true - Maybe don't need this rule?

    // If current track IS NOT track, set currentTrack and set isPlaying to true
    if (currentTrack.title !== track.title) {
      setCurrentTrack(track);
      setIsPlaying(true);
      console.log(isPlaying);
    }

    // If current track IS track and isPlaying is true, set isPlaying to false
    // If current track IS track and isPlaying is false, set isPlaying to true
    if (currentTrack.title === track.title) {
      setIsPlaying(!isPlaying);
      console.log(isPlaying);
    }

    // console.log(currentTrack.title);
    // setCurrentTrack(track);
    // if (currentTrack.title.length < 1) {
    //   setCurrentTrack(track);
    // }
  };

  // PASS THIS TO WAVEFORM, SO WAVEFORM CAN CALL AND UPDATE IT - CUELIBRARY MUST BE THE SOURCE OF ALL KNOWLEDGE WHEN IT COMES TO THE PLAYING STATE
  const handleIsPlaying = (bool) => {
    setIsPlaying(bool);
  };

  const trackList = tracks.map((track) => {
    return (
      <li key={track.title}>
        <Track trackInfo={track} handleCurrentTrack={handleCurrentTrack} />
      </li>
    );
  });

  let waveform;
  if (currentTrack.audio) {
    waveform = <Waveform trackInfo={currentTrack} isPlaying={isPlaying} />;
  } else {
    waveform = <div></div>;
  }

  return (
    <main className='CueLibrary'>
      <h1>Cue Library</h1>
      {waveform}
      {isError && <div>Something went wrong...</div>}
      {isLoading ? <div>LOADING...</div> : <ul>{trackList}</ul>}
    </main>
  );
}

export default CueLibrary;
