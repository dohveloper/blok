import React from 'react';
import {
  Navigate,
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import Login from './pages/Login';
import Account from './pages/Account';
import Dashboard from './pages/Dashboard';
import ManageSite from './pages/ManageSite';
import ManageUser from './pages/ManageUser';
import UserInfo from './pages/UserInfo';
import About from './components/About';
import NotFound from './components/NotFound';
import FindPassword from './pages/FindPassword';
import Signin from './pages/Signin';
import Editor from './pages/Editor';
import ChangePassword from './pages/ChangePassword';
import Main from './pages/Main';
import HostedPage from './pages/HostedPage';

export function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/blok" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/account" element={<Account />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="admin/site" element={<ManageSite />} />
        <Route path="/admin/user" element={<ManageUser />} />
        <Route path="/admin/user/:userId" element={<UserInfo />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/main" element={<Main />} />
        <Route path="/findpassword" element={<FindPassword />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/editor/:siteId" element={<Editor />} />
        <Route path="/:domain" element={<HostedPage />} />
      </Routes>
    </Router>
  );
}
