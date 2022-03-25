import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Register';

import Navbar from './Navbar';
import Home from './Home';

import '../styles/style.scss';
import ShowSpot from './ShowSpot';

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/spots/:id" element={<ShowSpot />} />
    </Routes>
  </BrowserRouter>
);
export default App;
