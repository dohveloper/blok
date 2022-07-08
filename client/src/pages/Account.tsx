import styled from "styled-components";
import React, { useState, useEffect } from "react";
import AccountContainer from "../components/Account";
import Sidebar from "../components/Sidebar";

const Container = styled.div`
  background-color: #f7f7f9;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

export default function Account() {
  return (
    <Container>
      <Sidebar />
      <AccountContainer />
    </Container>
  );
}
