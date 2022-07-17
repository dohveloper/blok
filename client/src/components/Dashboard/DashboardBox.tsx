import styled from "styled-components";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button";
import { MainTitle } from "./MyInfo";
import { TemplateCard } from "./TemplateCard";
import { templateCardData } from "./TemplateData";
import { RootState } from "../../reducers";
import { Link } from "react-router-dom";

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
  const [data, setData] = useState<any[]>([]);
  const dispatch = useDispatch();

  const userData = useSelector(
    (state: RootState) => state.loginCheckReducer.loginData
  );

  useEffect(() => {
    const getUserInfo = async () => {
      if (userData?.userId === "") {
        console.log("userId를 불러오지 못했습니다.");
        return;
      }
      console.log("userId:", userData?.userId);
      const res = await axios.get(`/api/site/user/${userData?.userId}`);
      console.log("site Data:", res.data);
      await setData(res.data);
    };
    getUserInfo();
  }, [userData?.userId]);

  const showModalHandler = () => {
    dispatch({ type: "TEMPLATE/MODAL_ON" });
  };

  const deleteHandler = (props: string) => {
    dispatch({
      type: "CONFIRM/MODAL_ON",
      payload: {
        title: "삭제",
        msg: "정말 삭제하시겠습니까?",
        action: "deleteSite",
        props: props,
      },
    });
  };

  const modalAction = useSelector(
    (state: RootState) => state.modalReducer.confirmData
  );

  const deleteSite = async () => {
    try {
      console.log("siteId:", modalAction?.props);
      if (modalAction?.props === "") {
        console.log("modolAction의 props를 불러오지 못했습니다.");
        return;
      }
      // 사이트 삭제 API 통신 에러
      await axios.delete(`/api/site/delete/${modalAction?.props}`);
      dispatch({ type: "CONFIRM/MODAL_OFF" });
      dispatch({ type: "alertOn", payload: "사이트가 삭제되었습니다." });
    } catch (e) {
      console.log(e);
    }
  };
  if (modalAction?.action === "deleteSite") {
    deleteSite();
  }

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
            {data.length > 0 ? (
              data.map((e, idx) => (
                <tr key={idx}>
                  <td>
                    {e.name}
                    <br />
                    <a href={e.domain}>{e.domain}</a>
                  </td>
                  <td>Free</td>
                  <td>
                    <Link to={`/editor/${e._id}`}>
                      <ControlButton
                        className={"editButton"}
                        rounding
                        color="white"
                      >
                        Edit
                      </ControlButton>
                    </Link>
                    <ControlButton
                      className={"deleteButton"}
                      onClick={() => deleteHandler(e._id)}
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
