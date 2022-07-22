import styled from 'styled-components';
import axios from 'axios';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../reducers';
import { useEffect, useState, useRef, useCallback } from 'react';
import default_profile from '../../imgs/profileImage.png';

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
  margin-bottom: 50px;
  user-select: none;
`;

export const Title = styled.div`
  font-weight: 500;
  font-size: 1.5rem;
  margin-bottom: 32px;
  user-select: none;
`;

export const ContentDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const ContentTitle = styled.div`
  flex: 1;
  font-size: 18px;
  text-align: center;
  margin-right: 28px;
  user-select: none;
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

const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  /* background-color: #e7e7e7; */
  cursor: pointer;
`;

export default function MyInfo() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [plan, setPlan] = useState('');
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [prorileImage, setProfileImage] = useState('');
  // const userData = useAppSelector((state) => state.loginCheckReducer.loginData);
  // 리덕스 스토어에서 userData를 불러올 때 간헐적 에러가 있어서 아래 코드 추가
  const getUserInfo = async () => {
    try {
      const res = await axios.get('/api/user/logincheck');
      setEmail(res.data.email);
      setPlan(res.data.plan);
      setUserName(res.data.userName);
      setUserName(res.data.userName);
      setUserId(res.data.userId);
      setProfileImage(res.data.profileImage);

      if (res.data.profileImage === null) {
        setProfileImage(default_profile);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  // 이미지 로더
  const fileInput = useRef<HTMLInputElement>(null);
  const handleButtonClick = (e: any) => {
    fileInput.current?.click();
  };
  const handleChange = async (e: any) => {
    const formData = new FormData();
    formData.append('profileImage', e.target.files[0]);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    const res = await axios.patch(
      `/api/user/change-profileImage/${userId}`,
      formData,
      config
    );
    setProfileImage(res.data.profileImage);
    dispatch({
      type: 'USER/LOGIN',
      payload: {
        profileImage: res.data.profileImage,
      },
    });
    setTimeout(
      () =>
        dispatch({
          type: 'alertOn',
          payload: { msg: '프로필 이미지가 수정되었습니다.', time: 1000 },
        }),
      400
    );
  };

  const onErrorImg = (e: any) => {
    e.target.src = default_profile;
  };

  const resethandler = () => {
    dispatch({
      type: 'CONFIRM/MODAL_ON',
      payload: {
        title: '비밀번호 초기화',
        msg: '정말 초기화하시겠습니까?',
        onConfirm: resetPassword,
      },
    });
  };

  const deleteHandler = () => {
    dispatch({
      type: 'CONFIRM/MODAL_ON',
      payload: {
        title: '계정탈퇴',
        msg: '정말 탈퇴하시겠습니까?',
        onConfirm: deleteUser,
      },
    });
  };

  const resetPassword = async () => {
    try {
      const data = { userName: userName, email: email };
      await axios.post('/api/user/reset-password', data);
      dispatch({ type: 'CONFIRM/MODAL_OFF' });
      dispatch({
        type: 'alertOn',
        payload: { msg: '성공적으로 메일을 보냈습니다.' },
      });
      navigate('/ChangePassword');
    } catch (e) {
      console.log(e);
    }
  };

  const deleteUser = async () => {
    try {
      await axios.delete(`/api/user/${userId}`);
      dispatch({ type: 'CONFIRM/MODAL_OFF' });
      dispatch({
        type: 'alertOn',
        payload: { msg: '회원탈퇴 처리 되었습니다.' },
      });
      navigate('/login');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <MainContainer>
      <MainTitle className="title">Account</MainTitle>
      <Container>
        <ContentDiv>
          <ProfileImage
            src={prorileImage}
            alt="profileImg"
            onError={onErrorImg}
            onClick={handleButtonClick}
          ></ProfileImage>
          <input
            type="file"
            ref={fileInput}
            onChange={handleChange}
            style={{ display: 'none' }}
          />
        </ContentDiv>
        <Title>내 정보</Title>
        <ContentDiv className="content">
          <ContentTitle>이름</ContentTitle>
          <Content>{userName}</Content>
        </ContentDiv>
        <ContentDiv className="content">
          <ContentTitle>이메일</ContentTitle>
          <Content>{email}</Content>
        </ContentDiv>
        <ContentDiv>
          <ContentTitle>플랜</ContentTitle>
          <Content>{plan}</Content>
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
