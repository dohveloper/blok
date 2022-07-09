import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const MainContainer = styled.div`
  margin: 100px;
`;

const Container = styled.div`
  margin-bottom: 50px;
`;

export const MainTitle = styled.div`
  font-weight: 600;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 70px;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
  margin-bottom: 32px;
`;

const ContentContainer = styled.div`
  background-color: #fff;
  padding: 1.6rem;
  border-radius: 10px;

  .content {
    margin-bottom: 20px;
  }
`;

const ContentDiv = styled.div`
  display: flex;
  width: 16rem;
`;

const ContentTitle = styled.div`
  font-size: 1.125rem;
  font-weight: 500;
  width: 6.25em;
  text-align: center;
  margin-right: 43px;
`;

const Content = styled.div`
  font-size: 1.125rem;
  width: 18.75rem;
  height: 1.5rem;
  background-color: #fff;
  border-bottom: 1px solid #e5e5e5;
`;

const ResetButton = styled.button`
  border: 1px solid #d9d9d9;
  border-radius: 30px;
  background-color: #ffffff;
  color: black;
  width: 13.25rem;
  height: 3rem;
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
  width: 13.25rem;
  height: 3rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
`;

export default function MyInfo() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [plan, setPlan] = useState<string>("");

  const getUserInfo = async () => {
    axios.get("/user").then((res): void => {
      const user = res.data;
      setName(user.name);
      setEmail(user.email);
      setPlan(user.plan);
    });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <MainContainer>
      <MainTitle>Account</MainTitle>
      <Container>
        <Title>My Infomation</Title>
        <ContentContainer>
          <ContentDiv className="content">
            <ContentTitle>Name</ContentTitle>
            <Content>{name}</Content>
          </ContentDiv>
          <ContentDiv className="content">
            <ContentTitle>Email</ContentTitle>
            <Content>{email}</Content>
          </ContentDiv>
          <ContentDiv>
            <ContentTitle>Plan</ContentTitle>
            <Content>{plan}</Content>
          </ContentDiv>
        </ContentContainer>
      </Container>
      <Container>
        <Title>Manage Account</Title>
        <ResetButton>Reset Password</ResetButton>
        <DeleteButton>Delete Account</DeleteButton>
      </Container>
    </MainContainer>
  );
}
