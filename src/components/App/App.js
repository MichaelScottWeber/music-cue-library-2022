import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import * as ROUTES from '../../constants/routes';
import Navigation from '../Navigation/Navigation';
import Home from '../Home/Home';
import CueLibrary from '../CueLibrary/CueLibrary';

const customTheme = createTheme({
  palette: {
    primary: { main: '#14919B' },
    secondary: { main: '#625D52' },
    info: { main: '#186FAF' },
    error: { main: '#A61B1B' },
    warning: { main: '#C99A2E' },
    success: { main: '#199473' },
  },
});

function App() {
  return (
    <div>
      <ThemeProvider theme={customTheme}>
        <BrowserRouter>
          <Navigation />

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
