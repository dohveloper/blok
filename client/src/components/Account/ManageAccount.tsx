import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-bottom: 50px;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 26px;
  margin-bottom: 32px;
`;

const ResetButton = styled.button`
  border: 1px solid #d9d9d9;
  border-radius: 30px;
  background-color: #ffffff;
  color: black;
  width: 212px;
  height: 48px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-right: 20px;
`;

const DeleteButton = styled.button`
  border: 1px solid #d9d9d9;
  border-radius: 30px;
  background-color: #9747ff;
  color: #ffffff;
  width: 212px;
  height: 48px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

export default function ManageAccount() {
  return (
    <Container>
      <Title>Manage Account</Title>
      <ResetButton>Reset Password</ResetButton>
      <DeleteButton>Delete Account</DeleteButton>
    </Container>
  );
}
