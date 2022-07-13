import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Account from './pages/Account';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import About from './components/About';
import NotFound from './components/NotFound';
import FindPassword from './pages/FindPassword';
import Signin from './pages/Signin';
import Test from './pages/Test';

export function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/account' element={<Account />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/findpassword' element={<FindPassword />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/test' element={<Test />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}
