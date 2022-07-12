import styled from "styled-components";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { MainTitle } from "./MyInfo";
import Button from "./Button";
import { TemplateCard } from "./TemplateCard";

const Container = styled.div`
  margin-bottom: 10px;

  @media screen and (max-width: 780px) {
    .title {
      margin-top: 102px;
    }
  }

  @media screen and (max-width: 1120px) {
    width: 100%;
  }
`;

const Table = styled.table`
  border-bottom: 1px solid #e5e5e5;
  border-collapse: separate;
  width: 1120px;

  th {
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid #e5e5e5;
  }

  td {
    padding: 1rem 4.8rem;
    text-align: center;
    transition: 0.2s ease-out;
  }

  @media screen and (max-width: 780px) {
    td {
      padding: 1rem;
    }
  }
  @media screen and (max-width: 1120px) {
    width: 100%;
  }
`;

const TemplateBox = styled.div`
  display: flex;
  width: 1120px;
  justify-content: center;
  align-items: center;
  z-index: 5;
  over-flow: hidden;

  @media screen and (max-width: 780px) {
    flex-direction: column;
  }

  @media screen and (max-width: 1120px) {
    width: 100%;
  }
`;

export const ControlButton = styled(Button)`
  pointer-events: auto;
  pointer: cursor;

  @media screen and (max-width: 780px) {
    margin-right: 0;
    margin-bottom: 0.3rem;
    justify-content: center;
  }
`;

const AddButton = styled(Button)`
  float: right;
  margin-top: 22px;

  @media screen and (max-width: 780px) {
    width: 100%;
    margin-right: 0;
    justify-content: center;
  }
`;

export function TemplateList() {
  const [templateData, setTemplateData] = useState<any[]>([]);

  const getTemplate = async () => {
    axios.get("/template").then((res): void => {
      const data = res.data.template;
      setTemplateData(data);
      console.log(templateData);
      console.log(data[0].title);
    });
  };

  useEffect(() => {
    getTemplate();
  }, []);

  return (
    <Container>
      <MainTitle className="title">Template</MainTitle>
      <TemplateBox>
        {templateData?.map((e) => (
          <>
            <TemplateCard
              key={e.title}
              title={e.title}
              description={e.description}
              color1={e.color1}
              color2={e.color2}
            />
          </>
        ))}
      </TemplateBox>
    </Container>
  );
}

export function DashboardInfo() {
  const [domain, setDomain] = useState([]);
  const dispatch = useDispatch();

  const getUserInfo = async () => {
    axios.get("/user").then((res): void => {
      const data = res.data.domain;
      setDomain(data);
    });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const showModalHandler = () => {
    dispatch({ type: "TEMPLATE/MODAL_ON" });
  };

  const deleteHandler = () => {
    dispatch({
      type: "CONFIRM/MODAL_ON",
      payload: {
        title: "삭제",
        msg: "정말 삭제하시겠습니까?",
      },
    });
  };

  return (
    <Container>
      <MainTitle className="title">Dashboard</MainTitle>
      <div className="tableBox">
        <Table>
          <thead>
            <tr>
              <th>웹 사이트</th>
              <th>플랜</th>
              <th>관리</th>
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
                  <ControlButton
                    className={"editButton"}
                    rounding
                    color="white"
                  >
                    Edit
                  </ControlButton>
                  <ControlButton
                    className={"deleteButton"}
                    onClick={deleteHandler}
                    color="gray"
                    rounding
                  >
                    Delete
                  </ControlButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <AddButton
          className="addButton"
          onClick={showModalHandler}
          size="medium"
          rounding
        >
          사이트 추가
        </AddButton>
      </div>
    </Container>
  );
}
