import React, { useState, useEffect } from 'react';
import Track from '../Track/Track';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function TrackList({
  tracks,
  searchTerm,
  filteredTracks,
  handleCurrentTrack,
  currentTrack,
  isPlaying,
  handleIsPlaying,
}) {
  return (
    <Stack marginBottom={2} spacing={2}>
      {(searchTerm === '' ? tracks : filteredTracks).map((track) => {
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
