import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Register from './Register';
import Navbar from './Navbar';
import Home from './Home';
import ShowSpot from './ShowSpot';
import Footer from './Footer';
import Map from './Map';
import Login from './Login';
import Discover from './Discover';
import CreateSpot from './CreateSpot';
import UserProfile from './UserProfile';

import '../styles/style.scss';

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/map' element={<Map />} />
      <Route path='/register' element={<Register />} />
      <Route path='/spots/:id' element={<ShowSpot />} />
      <Route path='/login' element={<Login />} />
      <Route path='/discover' element={<Discover />} />
      <Route path='/add' element={<CreateSpot />} />
      <Route path='/profile' element={<UserProfile />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);
export default App;
