import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import './CueLibrary.css';
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

  // // Sets filteredtracks to tracks
  // useEffect(() => {
  //   setfilteredTracks([...tracks]);
  // }, [tracks, selectedMood, searchTerm]);

  // // Filters tracks by mood
  // useEffect(() => {
  //   // const list = filteredTracks.length < 0 ? filteredTracks : tracks;
  //   // setfilteredTracks(handleFilterByMood(list));
  //   // setfilteredTracks(handleSearchTracks(list));
  //   if (selectedMood) {
  //     setfilteredTracks([...handleFilterByMood(filteredTracks)]);
  //   } else {
  //     setfilteredTracks([...handleFilterByMood(tracks)]);
  //   }
  // }, [selectedMood]);

  // // Filters tracks by search term
  // useEffect(() => {
  //   // const list = filteredTracks.length < 0 ? filteredTracks : tracks;
  //   // setfilteredTracks(handleFilterByMood(list));
  //   // setfilteredTracks(handleSearchTracks(list));
  //   if (searchTerm) {
  //     setfilteredTracks(handleSearchTracks(tracks));
  //   }
  // }, [searchTerm]);

  // Filter Tracks
  useEffect(() => {
    const searchTermList = searchTerm ? handleSearchTracks(tracks) : tracks;
    const selectedMoodList = selectedMood ? handleFilterByMood(tracks) : tracks;

    let arr = [];

    searchTermList.forEach((searchTermItem) => {
      selectedMoodList.forEach((selectedMoodItem) => {
        if (searchTermItem === selectedMoodItem) {
          arr.push(selectedMoodItem);
        }
      });
    });

    const set = new Set(arr);

    setfilteredTracks([...set]);
  }, [searchTerm, selectedMood]);

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
          if (track.mood.includes(selectedMood)) {
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

  // const waveform = () => {
  //   if (currentTrack.audio) {
  //     return (
  //       <Waveform
  //         trackInfo={currentTrack}
  //         isPlaying={isPlaying}
  //         handleIsPlaying={handleIsPlaying}
  //       />
  //     );
  //   } else {
  //     return <div></div>;
  //   }
  // };

  return (
    <main className='CueLibrary'>
      <Container sx={{ minHeight: '80vh' }}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography variant='h1' component='h1'>
              Cue Library
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Filters
              tracks={tracks}
              handleSearchTerm={handleSearchTerm}
              searchTerm={searchTerm}
              handleSelectedMood={handleSelectedMood}
              selectedMood={selectedMood}
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
                filteredTracks={filteredTracks}
                currentTrack={currentTrack}
                handleCurrentTrack={handleCurrentTrack}
                isPlaying={isPlaying}
                handleIsPlaying={handleIsPlaying}
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
