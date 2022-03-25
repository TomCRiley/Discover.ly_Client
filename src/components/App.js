import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateSpot from './CreateSpot';

import '../styles/style.scss';

const App = () => (
  <BrowserRouter>
    {/* <Navbar /> */}
    <Routes>
      <Route path="/" element={<h1>Hello world</h1>} />
      <Route path="/create" element={<CreateSpot />} />
    </Routes>
  </BrowserRouter>
);

export default App;
