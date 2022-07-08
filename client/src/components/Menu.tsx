import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaUserAlt } from "react-icons/fa";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";

const MenuContainer = styled.div`
  width: 200px;
  height: 150px;
  background-color: white;
  border-radius: 30px;
  border: 1px solid black;

  position: absolute;
  bottom: 54px;
  left: 58px;

  @media screen and (max-width: 780px) {
    top: 54px;
    right: 0;
  }
`;

const List = styled.div`
  padding: 12px;
  margin: 5px 0 0 20px;
`;

export default function Menu() {
  return (
    <MenuContainer>
      <List>
        <Link to="/">
          <FaUserAlt />
          <span>Account</span>
        </Link>
      </List>
      <List>
        <Link to="/">
          <MdOutlineSpaceDashboard />
          <span>Dashboard</span>
        </Link>
      </List>
      <List>
        <Link to="/">
          <BiLogOut />
          <span>Logout</span>
        </Link>
      </List>
    </MenuContainer>
  );
}
