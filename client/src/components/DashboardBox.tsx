import styled from "styled-components";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Container = styled.div`
  width: 1000px;

  .new {
    background-color: #9747ff;
    color: #ffffff;
    float: right;
    margin-top: 22px;
  }
`;

const Table = styled.table`
  width: 1000px;
  border-bottom: 1px solid #e5e5e5;
  border-collapse: collapse;

  th {
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid #e5e5e5;
  }

  td {
    padding: 15px;
    text-align: center;
  }

  .delete {
    background-color: #e0e0ed;
    color: #ffffff;
  }
`;

const Button = styled.button`
  border: 1px solid #d9d9d9;
  border-radius: 30px;
  background-color: #ffffff;
  color: black;
  width: 90px;
  height: 39px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  margin-right: 20px;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 26px;
  margin-bottom: 32px;
`;

const TemplateBox = styled.div`
  width: 950px;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    width: 240px;
    height: 200px;
    background-color: #d9d9d9;
    text-align: center;
    margin: 0 40px 10px 0;
  }
`;

const ContentBox = styled.div``;

export function templateList() {
  return (
    <Container>
      <Title>Template</Title>
      <TemplateBox>
        <ContentBox>
          <div></div>
          <span>포트폴리오 3분 기적</span>
        </ContentBox>
        <ContentBox>
          <div></div>
          <span>포트폴리오 3분 기적</span>
        </ContentBox>
        <ContentBox>
          <div></div>
          <span>포트폴리오 3분 기적</span>
        </ContentBox>
      </TemplateBox>
    </Container>
  );
}

export function DashboardInfo() {
  const [domain, setDomain] = useState([]);

  const getUserInfo = async () => {
    axios.get("/user").then((res): void => {
      const data = res.data.domain;
      setDomain(data);
    });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>Web Site</th>
            <th>Plan</th>
            <th>Manage</th>
          </tr>
        </thead>
        <tbody>
          {domain.map(({ doname, link }) => (
            <tr key={doname + link}>
              <td>
                {doname}
                <br />
                <a href={link}>{link}</a>
              </td>
              <td>Free</td>
              <td>
                <Button className={"edit"}>Edit</Button>
                <Button className={"delete"}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button className={"new"}>New</Button>
    </Container>
  );
}
