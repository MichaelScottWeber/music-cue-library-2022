import React, { useState, useEffect } from 'react';
import Track from '../Track/Track';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';

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
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, selectedMood, selectedGenre, selectedInstrument]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const trackList = () => {
    if (searchTerm || selectedMood || selectedGenre || selectedInstrument) {
      return filteredTracks;
    } else {
      return tracks;
    }
  };
  return (
    <Stack spacing={2}>
      {trackList()
        .slice((page - 1) * itemsPerPage, page * itemsPerPage)
        .map((track) => {
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
      <Pagination
        count={Math.ceil(trackList().length / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
      />
    </Stack>
  );
}

// yourItemList.subarray(
//   (pageNumber - 1) * numberOfItemsForPage,
//   pageNumber * numberOfItemsForPage
// );

export default TrackList;
