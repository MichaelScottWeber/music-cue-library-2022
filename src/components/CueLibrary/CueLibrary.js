import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import LazyHero from 'react-lazy-hero';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import TrackList from '../TrackList/TrackList';
import Waveform from '../Waveform/Waveform';
import Filters from '../Filters/Filters';

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
    duration: '',
  });
  const [isPlaying, setIsPlaying] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedInstrument, setSelectedInstrument] = useState('');
  const [filteredTracks, setfilteredTracks] = useState([]);

  // Sets tracks from db
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

  // Filter Tracks
  useEffect(() => {
    const searchTermList = searchTerm ? handleSearchTracks(tracks) : tracks;
    const selectedMoodList = selectedMood ? handleFilterByMood(tracks) : tracks;
    const selectedGenreList = selectedGenre
      ? handleFilterByGenre(tracks)
      : tracks;
    const selectedInstrumentList = selectedInstrument
      ? handleFilterByInstrument(tracks)
      : tracks;

    let arr = [];

    searchTermList.forEach((searchTermItem) => {
      selectedMoodList.forEach((selectedMoodItem) => {
        if (searchTermItem === selectedMoodItem) {
          selectedGenreList.forEach((selectedGenreItem) => {
            if (selectedMoodItem === selectedGenreItem) {
              selectedInstrumentList.forEach((selectedInstrumentItem) => {
                if (selectedGenreItem === selectedInstrumentItem) {
                  arr.push(selectedInstrumentItem);
                }
              });
            }
          });
        }
      });
    });

    const set = new Set(arr);

    setfilteredTracks([...set]);
  }, [
    searchTerm,
    selectedMood,
    selectedGenre,
    selectedInstrument,
    filteredTracks,
  ]);

  const handleSearchTracks = (trackList) => {
    // Empty arr
    let arr = [];

    // Loop through each item
    trackList.forEach((track) => {
      // If search term is in description, add to arr
      if (track.description.toLowerCase().includes(searchTerm)) {
        arr.push(track);
      }

      // If track is not already in arr, if seach term is in title, add to arr
      if (!arr.includes(track)) {
        if (track.title.toLowerCase().includes(searchTerm)) {
          arr.push(track);
        }
      }

      // If track is not already in arr, if search term is in genre list, add to arr
      if (!arr.includes(track)) {
        for (let i = 0; i < track.genre.length; i++) {
          if (track.genre[i].includes(searchTerm)) {
            arr.push(track);
            return;
          }
        }
      }

      // If track is not already in arr, if search term is in mood list, add to arr
      if (!arr.includes(track)) {
        for (let i = 0; i < track.mood.length; i++) {
          if (track.mood[i].includes(searchTerm)) {
            arr.push(track);
            return;
          }
        }
      }

      // If track is not already in arr, if search term is in instrumentation list, add to arr
      if (!arr.includes(track)) {
        for (let i = 0; i < track.instrumentation.length; i++) {
          if (track.instrumentation[i].includes(searchTerm)) {
            arr.push(track);
            return;
          }
        }
      }
    });

    return arr;
  };

  const handleFilterByMood = (trackList) => {
    let arr = [];

    trackList.forEach((track) => {
      if (!arr.includes(track)) {
        for (let i = 0; i < track.mood.length; i++) {
          if (
            track.mood.map((mood) => mood.toLowerCase()).includes(selectedMood)
          ) {
            arr.push(track);
            return;
          }
        }
      }
    });

    return arr;
  };

  const handleFilterByGenre = (trackList) => {
    let arr = [];

    trackList.forEach((track) => {
      if (!arr.includes(track)) {
        for (let i = 0; i < track.genre.length; i++) {
          if (
            track.genre
              .map((genre) => genre.toLowerCase())
              .includes(selectedGenre)
          ) {
            arr.push(track);
            return;
          }
        }
      }
    });

    return arr;
  };

  const handleFilterByInstrument = (trackList) => {
    let arr = [];

    trackList.forEach((track) => {
      if (!arr.includes(track)) {
        for (let i = 0; i < track.instrumentation.length; i++) {
          if (
            track.instrumentation
              .map((instrument) => instrument.toLowerCase())
              .includes(selectedInstrument)
          ) {
            arr.push(track);
            return;
          }
        }
      }
    });

    return arr;
  };

  const handleCurrentTrack = (track) => {
    if (currentTrack.title !== track.title) {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const handleIsPlaying = (bool) => {
    setIsPlaying(bool);
  };

  const handleSearchTerm = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  const handleSelectedMood = (mood) => {
    setSelectedMood(mood);
  };

  const handleSelectedGenre = (genre) => {
    setSelectedGenre(genre);
  };

  const handleSelectedInstrument = (instrument) => {
    setSelectedInstrument(instrument);
  };

  return (
    <main className='CueLibrary'>
      <LazyHero
        parallaxOffset={0}
        color='#e0fcff'
        opacity={0.2}
        isCentered={false}
        imageSrc='https://images.unsplash.com/photo-1497616987741-7fba8102046e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80'
        // imageSrc='https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80'
        // imageSrc='https://images.unsplash.com/photo-1466428996289-fb355538da1b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
        // imageSrc='https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
        // imageSrc='https://images.unsplash.com/photo-1450044804117-534ccd6e6a3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80'
        // imageSrc='https://images.unsplash.com/photo-1483101974978-cf266fdf1139?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80'
        minHeight='28vh'
      >
        {/* <div className='h1-container'>
          <Typography paddingX={3} paddingY={2} variant='h2' component='h1'>
            Cue Library
          </Typography>
        </div> */}
      </LazyHero>

      <Container sx={{ minHeight: '80vh' }}>
        <Grid paddingY={3} container spacing={5}>
          <Grid item xs={12} md={3}>
            <Filters
              tracks={tracks}
              handleSearchTerm={handleSearchTerm}
              searchTerm={searchTerm}
              handleSelectedMood={handleSelectedMood}
              selectedMood={selectedMood}
              handleSelectedGenre={handleSelectedGenre}
              selectedGenre={selectedGenre}
              handleSelectedInstrument={handleSelectedInstrument}
              selectedInstrument={selectedInstrument}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            {isError && <div>Something went wrong...</div>}
            {isLoading ? (
              <div className='tracks-loading'>
                <CircularProgress />
                <Typography variant='body1' component='p'>
                  Loading tracks...
                </Typography>
              </div>
            ) : (
              <TrackList
                tracks={tracks}
                searchTerm={searchTerm}
                selectedMood={selectedMood}
                selectedGenre={selectedGenre}
                selectedInstrument={selectedInstrument}
                filteredTracks={filteredTracks}
                currentTrack={currentTrack}
                handleCurrentTrack={handleCurrentTrack}
                isPlaying={isPlaying}
                handleIsPlaying={handleIsPlaying}
                handleSelectedMood={handleSelectedMood}
                handleSelectedGenre={handleSelectedGenre}
                handleSelectedInstrument={handleSelectedInstrument}
              />
            )}
          </Grid>
        </Grid>
      </Container>
      {/* {waveform()} */}
      {currentTrack.audio ? (
        <Waveform
          trackInfo={currentTrack}
          isPlaying={isPlaying}
          handleIsPlaying={handleIsPlaying}
        />
      ) : (
        <div></div>
      )}
    </main>
  );
}

export default CueLibrary;
