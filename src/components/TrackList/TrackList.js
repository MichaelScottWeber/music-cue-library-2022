import React, { useState, useEffect } from 'react';
import Track from '../Track/Track';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function TrackList({
  tracks,
  searchTerm,
  selectedMood,
  selectedGenre,
  selectedInstrument,
  filteredTracks,
  handleCurrentTrack,
  currentTrack,
  isPlaying,
  handleIsPlaying,
}) {
  const trackList = () => {
    if (searchTerm || selectedMood || selectedGenre || selectedInstrument) {
      return filteredTracks;
    } else {
      return tracks;
    }
  };
  return (
    <Stack spacing={2}>
      {trackList().map((track) => {
        return (
          <li key={track.title}>
            <Track
              trackInfo={track}
              handleCurrentTrack={handleCurrentTrack}
              currentTrack={currentTrack}
              handleIsPlaying={handleIsPlaying}
              isPlaying={isPlaying}
            />
          </li>
        );
      })}
      {filteredTracks.length === 0 ? (
        <Typography variant='body1' component='p'>
          Sorry, no matches found
        </Typography>
      ) : (
        ''
      )}
    </Stack>
  );
}

export default TrackList;
