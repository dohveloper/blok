import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logoImg from './../imgs/logo.png';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../reducers';
import default_profile from '../imgs/profileImage.png';
// import icon
import { CgClose } from 'react-icons/cg';
import { BiLogOut } from 'react-icons/bi';
import { FaUserAlt } from 'react-icons/fa';
import { GrMenu } from 'react-icons/gr';
import { FaRegUserCircle } from 'react-icons/fa';

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
      margin: 0;
    }
  }
`;

const Profile = styled.div`
  position: absolute;
  bottom: 10px;
  left: 12px;
  cursor: pointer;

  @media screen and (max-width: 780px) {
    display: none;
  }
`;

const ProfileImage = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;

  @media screen and (max-width: 780px) {
    display: none;
  }
`;

const Hamburger = styled.span`
  @media screen and (min-width: 780px) {
    display: none;
  }
  @media screen and (max-width: 780px) {
    display: flex;
  }
`;

const MenuContainer = styled.div`
  background-color: white;
  border-radius: 16px;
  border: 1px solid E5E5E5;
  padding: 10px 10px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  position: fixed;
  bottom: 50px;
  left: 50px;

  @media screen and (max-width: 780px) {
    top: 51px;
    right: 0;
    left: auto;
    width: 100%;
    height: fit-content;
    border-radius: 0;
    text-align: center;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  }
`;

const List = styled.div`
  padding: 24px;
  border-radius: 16px;
  width: 180px;
  display: flex;
  align-items: center;

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
  @media screen and (max-width: 780px) {
    width: auto;
    justify-content: center;
  }
`;

const ListSpan = styled.span`
  font-size: 18px;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  @media screen and (max-width: 780px) {
    margin-top: 6px;
    width: 100px;
  }
`;

const LogoImg = styled.img`
  width: 49px;
  height: 43px;
  margin-top: 10px;
  @media screen and (max-width: 780px) {
    margin-top: 6px;
  }
`;

interface IMyProps {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const Menu = (props: IMyProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userData = useAppSelector((state) => state.loginCheckReducer.loginData);

  const logoutHandler = async () => {
    await axios.get('/api/user/logout');
    dispatch({ type: 'USER/LOGOUT' });
    dispatch({
      type: 'alertOn',
      payload: { msg: '로그아웃 처리 되었습니다.' },
    });
    navigate('/login');
  };

  return (
    <MenuContainer
      onMouseLeave={props.onMouseLeave}
      onMouseEnter={props.onMouseEnter}
    >
      <Link to="/account" style={{ textDecoration: 'none' }}>
        <List>
          <FaUserAlt color="black" />
          <ListSpan>Account</ListSpan>
        </List>
      </Link>

      {userData?.role === 'admin' ? (
        <>
          <Link to="/admin/site" style={{ textDecoration: 'none' }}>
            <List>
              <MdOutlineSpaceDashboard color="black" />
              <ListSpan>Manage Site</ListSpan>
            </List>
          </Link>
          <Link to="/admin/user" style={{ textDecoration: 'none' }}>
            <List>
              <MdOutlineSpaceDashboard color="black" />
              <ListSpan>Manage User</ListSpan>
            </List>
          </Link>
        </>
      ) : (
        <Link to="/dashboard" style={{ textDecoration: 'none' }}>
          <List>
            <MdOutlineSpaceDashboard color="black" />
            <ListSpan>Dashboard</ListSpan>
          </List>
        </Link>
      )}
      <div onClick={logoutHandler} style={{ textDecoration: 'none' }}>
        <List>
          <BiLogOut color="black" />
          <ListSpan>Logout</ListSpan>
        </List>
      </div>
    </MenuContainer>
  );
};

export default function Sidebar() {
  const [isMobile, setIsMobile] = useState(false);
  const { profileImage } = useAppSelector(
    (state) => state.loginCheckReducer.loginData
  );
  const onErrorImg = (e: any) => {
    e.target.src = default_profile;
  };

  return (
    <Nav>
      <div className="navbarLogo">
        <Link to="/dashboard">
          <LogoImg src={logoImg} alt="logo" />
        </Link>
      </div>
      <Hamburger onClick={() => setIsMobile(true)}>
        {isMobile ? <CgClose size={32} /> : <GrMenu size={32} />}
      </Hamburger>
      <Profile
        onMouseEnter={() => setIsMobile(true)}
        onMouseLeave={() => setIsMobile(false)}
      >
        {profileImage == null ? (
          <ProfileImage src={default_profile} alt="profile" />
        ) : (
          <ProfileImage
            src={profileImage}
            alt="profileImg"
            onError={onErrorImg}
          />
        )}
      </Profile>
      {isMobile && (
        <Menu
          onMouseEnter={() => setIsMobile(true)}
          onMouseLeave={() => setIsMobile(false)}
        />
      )}
    </Nav>
  );
}
