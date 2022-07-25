import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';

function Filters({ handleSearchTerm, searchTerm }) {
  return (
    <section className='Filters'>
      <TextField
        fullWidth
        id='outlined-basic'
        label='Search'
        variant='outlined'
        onChange={(e) => {
          handleSearchTerm(e.target.value);
        }}
        value={searchTerm}
      />
    </section>
  );
}

export default Filters;
