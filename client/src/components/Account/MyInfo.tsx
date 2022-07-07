import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  margin-bottom: 50px;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 26px;
  margin-bottom: 32px;
`;

const ContentDiv = styled.div`
  display: flex;
`;

const ContentTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  width: 100px;
  text-align: center;
  margin-right: 43px;
`;

const Content = styled.div`
  font-size: 20px;
  margin-bottom: 24px;
  width: 300px;
  border-bottom: 1px solid #ececec;
`;

export default function MyInfo() {
  const [name, setName] = useState<string>("ads");
  const [email, setEmail] = useState<string>("as");
  const [plan, setPlan] = useState<string>("Free");

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
    <Container>
      <Title>My Infomation</Title>
      <ContentDiv>
        <ContentTitle>Name</ContentTitle>
        <Content>{name}</Content>
      </ContentDiv>
      <ContentDiv>
        <ContentTitle>Email</ContentTitle>
        <Content>{email}</Content>
      </ContentDiv>
      <ContentDiv>
        <ContentTitle>Plan</ContentTitle>
        <Content>{plan}</Content>
      </ContentDiv>
    </Container>
  );
}
