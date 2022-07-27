import React, { useState, useEffect } from 'react';
import Track from '../Track/Track';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function TrackList({
  tracks,
  searchTerm,
  selectedMood,
  filteredTracks,
  handleCurrentTrack,
  currentTrack,
  isPlaying,
  handleIsPlaying,
}) {
  const trackList = () => {
    if (searchTerm || selectedMood) {
      return filteredTracks;
    } else {
      return tracks;
    }
  };
  return (
    <Stack marginBottom={2} spacing={2}>
      {/* {(filteredTracks.length > 0 ? filteredTracks : tracks).map((track) => { */}
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
