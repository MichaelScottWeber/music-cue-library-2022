import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

function Filters({
  tracks,
  handleSearchTerm,
  searchTerm,
  handleSelectedMood,
  selectedMood,
  handleSelectedGenre,
  selectedGenre,
  handleSelectedInstrument,
  selectedInstrument,
}) {
  const [moodOptions, setMoodOptions] = useState([]);
  const [genreOptions, setGenreOptions] = useState([]);
  const [instrumentOptions, setInstrumentOptions] = useState([]);

  useEffect(() => {
    let moodArr = [];
    let genreArr = [];
    let instrumentArr = [];

    tracks.forEach((track) => {
      moodArr = [...moodArr, ...track.mood];
      genreArr = [...genreArr, ...track.genre];
      instrumentArr = [...instrumentArr, ...track.instrumentation];
    });

    const moodSet = new Set(moodArr.map((mood) => mood.toLowerCase()));
    const genreSet = new Set(genreArr.map((genre) => genre.toLowerCase()));
    const instrumentSet = new Set(
      instrumentArr.map((instrument) => instrument.toLowerCase())
    );

    setMoodOptions([...moodSet].sort());
    setGenreOptions([...genreSet].sort());
    setInstrumentOptions([...instrumentSet].sort());
  }, [tracks]);

  return (
    <Paper elevation={0} className='Filters' sx={{ borderRadius: '10px' }}>
      <Box paddingX={2} paddingY={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* <Paper elevation={0}> */}
            <TextField
              fullWidth
              id='outlined-basic'
              label='Search'
              variant='outlined'
              onChange={(e) => handleSearchTerm(e.target.value)}
              value={searchTerm}
            />
            {/* </Paper> */}
          </Grid>

          <Grid item xs={4} md={12}>
            {/* <Paper elevation={0}> */}
            <FormControl fullWidth>
              <InputLabel id='mood-select-label'>Mood</InputLabel>
              <Select
                labelId='mood-select-label'
                id='mood-select'
                value={selectedMood}
                label='Mood'
                onChange={(e) => handleSelectedMood(e.target.value)}
              >
                <MenuItem value={''}>default (empty)</MenuItem>
                {moodOptions.map((mood) => {
                  return (
                    <MenuItem key={mood} value={mood}>
                      {mood}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            {/* </Paper> */}
          </Grid>

          <Grid item xs={4} md={12}>
            {/* <Paper elevation={0}> */}
            <FormControl fullWidth>
              <InputLabel id='genre-select-label'>Genre</InputLabel>
              <Select
                labelId='genre-select-label'
                id='genre-select'
                value={selectedGenre}
                label='Genre'
                onChange={(e) => handleSelectedGenre(e.target.value)}
              >
                <MenuItem value={''}>default (empty)</MenuItem>
                {genreOptions.map((genre) => {
                  return (
                    <MenuItem key={genre} value={genre}>
                      {genre}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            {/* </Paper> */}
          </Grid>

          <Grid item xs={4} md={12}>
            {/* <Paper elevation={0}> */}
            <FormControl fullWidth>
              <InputLabel id='instrument-select-label'>Instrument</InputLabel>
              <Select
                labelId='instrument-select-label'
                id='instrument-select'
                value={selectedInstrument}
                label='Instrument'
                onChange={(e) => handleSelectedInstrument(e.target.value)}
              >
                <MenuItem value={''}>default (empty)</MenuItem>
                {instrumentOptions.map((instrument) => {
                  return (
                    <MenuItem key={instrument} value={instrument}>
                      {instrument}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            {/* </Paper> */}
          </Grid>

          <Grid item xs={12}>
            <Button
              variant='text'
              onClick={() => {
                handleSearchTerm('');
                handleSelectedMood('');
                handleSelectedGenre('');
                handleSelectedInstrument('');
              }}
            >
              Clear Filters
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

export default Filters;
