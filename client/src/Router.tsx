import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Dashboard from "./pages/Dashboard";
import ManageSite from "./pages/ManageSite";
import ManageUser from "./pages/ManageUser";
import UserInfo from "./pages/UserInfo";
import About from "./components/About";
import NotFound from "./components/NotFound";
import FindPassword from "./pages/FindPassword";
import Signin from "./pages/Signin";
import Test from "./pages/Test";
import Editor from "./pages/Editor";
import ChangePassword from "./pages/ChangePassword";
import Main from "./pages/Main";

export function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/account" element={<Account />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user" element={<ManageUser />} />
        <Route path="/site" element={<ManageSite />} />
        <Route path="/user/:userId" element={<UserInfo />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/main" element={<Main />} />
        <Route path="/findpassword" element={<FindPassword />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/test" element={<Test />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </Router>
  );
}
