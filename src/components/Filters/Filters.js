import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

function Filters({
  tracks,
  handleSearchTerm,
  searchTerm,
  handleSelectedMood,
  selectedMood,
}) {
  const [moodOptions, setMoodOptions] = useState([]);

  useEffect(() => {
    let arr = [];

    tracks.forEach((track) => {
      arr = [...arr, ...track.mood];
    });

    const set = new Set(arr);

    setMoodOptions([...set].sort());
  }, [tracks]);

  return (
    <section className='Filters'>
      <TextField
        fullWidth
        id='outlined-basic'
        label='Search'
        variant='outlined'
        onChange={(e) => handleSearchTerm(e.target.value)}
        value={searchTerm}
      />

      <FormControl fullWidth>
        <InputLabel id='mood-select-label'>Mood</InputLabel>
        <Select
          labelId='mood-select-label'
          id='mood-select'
          value={selectedMood}
          label='Age'
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
    </section>
  );
}

export default Filters;
