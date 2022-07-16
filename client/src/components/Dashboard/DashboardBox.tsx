import styled from "styled-components";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button";
import { MainTitle } from "./MyInfo";
import { TemplateCard } from "./TemplateCard";
import { templateCardData } from "./TemplateData";
import { RootState } from "../../reducers";

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
  border-collapse: collapse;
  width: 1120px;
  min-height: 100px;

  tbody {
    height: 120px;
  }

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
  return (
    <Container>
      <MainTitle className="title">Template</MainTitle>
      <TemplateBox>
        {templateCardData?.map((e: any, idx: number) => (
          <div key={idx}>
            <TemplateCard
              title={e.title}
              description={e.description}
              color1={e.color1}
              color2={e.color2}
            />
          </div>
        ))}
      </TemplateBox>
    </Container>
  );
}

export function DashboardInfo() {
  const [domain, setDomain] = useState<any[]>([]);
  const dispatch = useDispatch();

  const userData = useSelector(
    (state: RootState) => state.loginCheckReducer.loginData
  );

  const getUserInfo = async () => {
    const res = await axios.get(`/api/site/user/${userData?.userId}`);
    console.log(333, res);
    // await setDomain(res.data[0].domain);
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
            {domain.length > 0 ? (
              domain.map((e, idx) => (
                <tr key={idx}>
                  <td>
                    {e.domainName}
                    <br />
                    <a href={e.link}>{e.link}</a>
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
              ))
            ) : (
              <tr>
                <td colSpan={3}>사이트가 없습니다.</td>
              </tr>
            )}
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
