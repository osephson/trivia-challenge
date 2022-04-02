import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './store';

import 'bootstrap/dist/css/bootstrap.css';
import './style.css';

import { Entrance, Notfound, Questions, Results } from './components';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className='App'>
          <Routes>
            <Route path='/' element={<Entrance />} />
            <Route path='/questions' element={<Questions />} />
            <Route path='/results' element={<Results />} />
            <Route path='*' element={<Notfound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
