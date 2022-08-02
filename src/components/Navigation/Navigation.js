import React from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
// import Typography from '@mui/material/Typography';

import * as ROUTES from '../../constants/routes';
import { ReactComponent as MWMusicLogo } from '../../assets/MWMUSIC.svg';

const Navigation = () => {
  return (
    <AppBar position='static' className='Navigation'>
      <Paper sx={{ borderRadius: '0' }} elevation={0}>
        <Toolbar>
          <MWMusicLogo />
        </Toolbar>
      </Paper>
    </AppBar>

    // <nav className='Navigation'>
    //   <ul>
    //     <li>
    //       <Link to={ROUTES.HOME}>Home</Link>
    //     </li>
    //     <li>
    //       <Link to={ROUTES.CUE_LIBRARY}>Cue library</Link>
    //     </li>
    //   </ul>
    // </nav>
  );
};

export default Navigation;
