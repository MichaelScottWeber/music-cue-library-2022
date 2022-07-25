import React, { useState, useEffect } from 'react';
import Track from '../Track/Track';

import Stack from '@mui/material/Stack';

function TrackList({
  tracks,
  filteredTracks,
  searchTerm,
  handleCurrentTrack,
  currentTrack,
  isPlaying,
  handleIsPlaying,
}) {
  const allTracks = tracks.map((track) => {
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
  });

  return (
    <Stack marginBottom={2} spacing={2}>
      {allTracks}
    </Stack>
  );
}

export default TrackList;
