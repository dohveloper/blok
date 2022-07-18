import styled from "styled-components";
import axios from "axios";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../reducers";

const MainContainer = styled.div`
  margin: 100px;
`;

const Container = styled.div`
  margin-bottom: 70px;
`;

export const MainTitle = styled.div`
  font-weight: 600;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 70px;
`;

export const Title = styled.div`
  font-weight: 500;
  font-size: 1.5rem;
  margin-bottom: 32px;
`;

export const ContentDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const ContentTitle = styled.div`
  font-size: 18px;
  text-align: center;
  margin-right: 28px;
  flex: 1;
`;

export const Content = styled.div`
  font-size: 18px;
  width: 100%;
  height: 42px;
  line-height: 44px;
  border: 1px solid #ececec;
  box-sizing: border-box;
  border-radius: 8px;
  padding-left: 18px;
  flex: 5;
  color: #111111;
  background-color: #fff;
`;

const ControlButton = styled(Button)`
  padding: 0 3.2rem;
  & + & {
    margin-left: 1rem;
  }

  @media screen and (max-width: 780px) {
    width: 100%;
    margin-bottom: 10px;
    justify-content: center;

    & + & {
      margin-left: 0;
    }
  }
`;

export default function MyInfo() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const confirmState = useAppSelector(
    (state) => state.modalReducer.confirmState
  );
  const confirmAction = useAppSelector(
    (state) => state.modalReducer.confirmData
  );
  const userData = useAppSelector((state) => state.loginCheckReducer.loginData);

  const resethandler = () => {
    dispatch({
      type: "CONFIRM/MODAL_ON",
      payload: {
        title: "비밀번호 초기화",
        msg: "정말 초기화하시겠습니까?",
        action: "reset",
      },
    });
  };

  const deleteHandler = () => {
    dispatch({
      type: "CONFIRM/MODAL_ON",
      payload: {
        title: "계정탈퇴",
        msg: "정말 탈퇴하시겠습니까?",
        action: "delete",
      },
    });
  };

  const resetPassword = async () => {
    try {
      const data = { userName: userData!.userName, email: userData!.email };
      console.log(data);
      await axios.post("/api/user/reset-password", data);
      dispatch({ type: "CONFIRM/MODAL_OFF" });
      dispatch({
        type: "alertOn",
        payload: { msg: "성공적으로 메일을 보냈습니다." },
      });
      navigate("/ChangePassword");
    } catch (e) {
      console.log(e);
    }
  };

  const deleteUser = async () => {
    try {
      await axios.delete(`/api/user/${userData?.userId}`);
      dispatch({ type: "CONFIRM/MODAL_OFF" });
      dispatch({
        type: "alertOn",
        payload: { msg: "회원탈퇴 처리 되었습니다." },
      });
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  if (confirmState) {
    if (confirmAction?.action === "reset") {
      console.log("리샛");
      resetPassword();
    }

    if (confirmAction?.action === "delete") {
      console.log("삭제");
      deleteUser();
    }
  }

  return (
    <MainContainer>
      <MainTitle className="title">Account</MainTitle>
      <Container>
        <Title>내 정보</Title>
        <ContentDiv className="content">
          <ContentTitle>이름</ContentTitle>
          <Content>{userData?.userName}</Content>
        </ContentDiv>
        <ContentDiv className="content">
          <ContentTitle>이메일</ContentTitle>
          <Content>{userData?.email}</Content>
        </ContentDiv>
        <ContentDiv>
          <ContentTitle>플랜</ContentTitle>
          <Content>{userData?.plan}</Content>
        </ContentDiv>
      </Container>
      <Container>
        <Title>계정 관리</Title>
        <ControlButton
          onClick={resethandler}
          size="large"
          color="white"
          rounding
        >
          Reset Password
        </ControlButton>
        <ControlButton onClick={deleteHandler} size="large" rounding>
          Delete Account
        </ControlButton>
      </Container>
    </MainContainer>
  );
}