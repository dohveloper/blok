import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logoImg from "./../imgs/logo.png";
import { FaUserAlt } from "react-icons/fa";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { CgClose } from "react-icons/cg";

// import icon
import { GrMenu } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";

const Nav = styled.nav`
  width: 72px;
  height: 100vh;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  z-index: 2;

  .navbarLogo {
    display: block;
    margin: 0px auto;
  }

  @media screen and (max-width: 780px) {
    width: 100%;
    height: 52px;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 10px;

    .navbarLogo {
      display: block;
      margin: 0;
    }
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

const MenuContainer = styled.div`
  width: 200px;
  height: 150px;
  background-color: white;
  border-radius: 16px;
  border: 1px solid E5E5E5;
  padding: 10px 5px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  position: fixed;
  bottom: 54px;
  left: 54px;
  }

  @media screen and (max-width: 780px) {
    top: 51px;
    right: 0;
    left: auto;
    width: 100%;
    height: 220px;
    border-radius: 0;
    text-align: center;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  }
`;

const List = styled.div`
  padding: 24px;
  border-radius: 16px;

  span {
    color: black;
    font-weight: 600;
    margin-left: 12px;
  }

  :hover {
    background-color: #e5e5e5;
  }

  @media screen and (min-width: 780px) {
    padding: 12px;
  }
`;

interface IMyProps {
  isMobile: boolean;
  setIsMobile: any;
}

const Menu = (props: IMyProps) => {
  const closeMenuHandler = () => {
    props.setIsMobile(!props.isMobile);
  };
  return (
    <MenuContainer onMouseLeave={closeMenuHandler}>
      <Link to="/account" style={{ textDecoration: "none" }}>
        <List>
          <FaUserAlt color="black" />
          <span>Account</span>
        </List>
      </Link>
      <Link to="/dashboard" style={{ textDecoration: "none" }}>
        <List>
          <MdOutlineSpaceDashboard color="black" />
          <span>Dashboard</span>
        </List>
      </Link>
      <Link to="/" style={{ textDecoration: "none" }}>
        <List>
          <BiLogOut color="black" />
          <span>Logout</span>
        </List>
      </Link>
    </MenuContainer>
  );
};

export default function Sidebar() {
  const [isMobile, setIsMobile] = useState(false);

  const showMenuHandler = () => {
    setIsMobile(!isMobile);
  };

  return (
    <Nav>
      <div className="navbarLogo">
        <Link to="/">
          <img src={logoImg} alt="logo" width={48} height={48} />
        </Link>
      </div>
      <Hamburger onClick={showMenuHandler}>
        {isMobile ? <CgClose size={32} /> : <GrMenu size={32} />}
      </Hamburger>
      <Profile onMouseEnter={showMenuHandler}>
        <FaRegUserCircle size="48" color="#CCCCCC" />
      </Profile>
      {isMobile && <Menu isMobile={isMobile} setIsMobile={setIsMobile} />}
    </Nav>
  );
}
