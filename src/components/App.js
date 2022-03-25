import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Register';

// import Navbar from './Navbar';
// import Home from './Home';

import '../styles/style.scss';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<h1>Hello world</h1>} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </BrowserRouter>
);
export default App;
