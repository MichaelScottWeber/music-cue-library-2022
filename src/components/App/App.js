import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import * as ROUTES from '../../constants/routes';
import Navigation from '../Navigation/Navigation';
import Home from '../Home/Home';
import CueLibrary from '../CueLibrary/CueLibrary';

const customTheme = createTheme({
  palette: {
    // mode: 'dark',
  },
});

function App() {
  return (
    <div>
      <ThemeProvider theme={customTheme}>
        <BrowserRouter>
          <Navigation />
          <hr />

          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.CUE_LIBRARY} element={<CueLibrary />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
