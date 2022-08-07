import React, { useState, useEffect } from 'react';
import Track from '../Track/Track';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
  handleSelectedMood,
  handleSelectedGenre,
  handleSelectedInstrument,
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

  const handleItemsPerPageChange = (value) => {
    // console.log(typeof value);
    setItemsPerPage(value);
  };

  const trackList = () => {
    if (searchTerm || selectedMood || selectedGenre || selectedInstrument) {
      return filteredTracks;
    } else {
      return tracks;
    }
  };
  return (
    <Stack spacing={2} className='TrackList'>
      <div className='top-pagination'>
        <FormControl
          fullWidth
          variant='standard'
          size='small'
          sx={{ minWidth: 80, maxWidth: 85 }}
        >
          <InputLabel id='items-per-page-label'>Items per page</InputLabel>
          <Select
            labelId='items-per-page-label'
            id='items-per-page'
            value={itemsPerPage}
            label='Iems per page'
            onChange={(e) => {
              handleItemsPerPageChange(e.target.value);
            }}
            autoWidth
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>
        <Pagination
          count={Math.ceil(trackList().length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          className='pagination'
        />
      </div>
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
                handleSelectedMood={handleSelectedMood}
                handleSelectedGenre={handleSelectedGenre}
                handleSelectedInstrument={handleSelectedInstrument}
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
        className='pagination'
      />
    </Stack>
  );
}

export default TrackList;
