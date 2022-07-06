import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './views/components/Loginbox';
import About from './views/components/About';
import NotFound from './views/components/NotFound';

export function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/about' element={<About />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}
