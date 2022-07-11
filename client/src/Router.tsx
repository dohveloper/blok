import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Account from './pages/Account';
import Dashboard from './pages/Dashboard';
import About from './components/About';
import NotFound from './components/NotFound';
import AxiosTest from './pages/Axiostest';
import Logout from './pages/Logout';
import FindPassword from './pages/FindPassword';
import Signin from './pages/Signin';

export function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/logout' element={<Logout />}></Route>
        <Route path='/findpassword' element={<FindPassword />}></Route>
        <Route path='/signin' element={<Signin />}></Route>
        <Route path='/about' element={<About />} />
        <Route path='/account' element={<Account />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/test' element={<AxiosTest />} />
      </Routes>
    </Router>
  );
}
