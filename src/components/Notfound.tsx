import React from 'react';
import { Link } from 'react-router-dom';

const Notfound = (): JSX.Element => {
  return (
    <main className='not-found'>
      <h1>No content</h1>

      <Link to='/'>GO HOME!</Link>
    </main>
  );
};

export default Notfound;
