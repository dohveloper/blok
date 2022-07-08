import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logoImg from "./../imgs/logo.png";
import Menu from "./Menu";

// import icon
import { GrMenu } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";

const Nav = styled.nav`
  width: 72px;
  height: 100%;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;

  @media screen and (max-width: 780px) {
    width: 100%;
    height: 52px;
    justify-content: space-between;
    align-items: center;
  }
`;

const Profile = styled.div`
  position: absolute;
  bottom: 20px;
  left: 12px;

  @media screen and (max-width: 780px) {
    display: none;
  }
`;

const Hamburger = styled.span`
  @media screen and (min-width: 780px) {
    display: none;
  }
`;

export default function Sidebar() {
  const [click, setClick] = useState(false);

  const showMenuHandler = () => {
    setClick(!click);
  };

  return (
    <Nav>
      <Link to="/" className="navbar-logo">
        <img src={logoImg} alt="logo" width={48}></img>
      </Link>
      <Hamburger onClick={showMenuHandler}>
        <GrMenu size={42} />
      </Hamburger>
      <Profile onClick={showMenuHandler}>
        <FaRegUserCircle size="48" color="#CCCCCC" />
      </Profile>
      {click && <Menu />}
    </Nav>
  );
}
