import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

const Navigation = () => {
  return (
    <nav className='Navigation'>
      <ul>
        <li>
          <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
          <Link to={ROUTES.CUE_LIBRARY}>Cue library</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
