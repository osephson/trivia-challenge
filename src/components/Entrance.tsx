import React from 'react';
import { Link } from 'react-router-dom';

const Entrance = (): JSX.Element => {
  return (
    <main className='entrance'>
      <h2 className='mb-5'>Welcome to the Trivia Challenge</h2>

      <div className='mb-5'>
        You will be presented with 10 True or False questions.
      </div>

      <div className='mb-5'>Can you score 100%?</div>

      <Link className='mt-5' to='/questions'>
        BEGIN
      </Link>
    </main>
  );
};

export default Entrance;
