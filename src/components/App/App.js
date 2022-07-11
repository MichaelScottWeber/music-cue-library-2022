import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import Navigation from '../Navigation/Navigation';
import Home from '../Home/Home';
import CueLibrary from '../CueLibrary/CueLibrary';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <hr />

        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.CUE_LIBRARY} element={<CueLibrary />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
