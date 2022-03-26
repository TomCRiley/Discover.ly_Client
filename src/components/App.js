import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Register';

import Navbar from './Navbar';
import Home from './Home';
import ShowSpot from './ShowSpot';
import Footer from './Footer';
import AutoSuggest from './w3w';

import '../styles/style.scss';

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/spots/:id' element={<ShowSpot />} />
      <Route path='/w3w' element={<AutoSuggest />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);
export default App;
