import styled from 'styled-components';
import Button from '../Button';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { MainTitle } from './MyInfo';
import { useAppDispatch } from '../../reducers';
import { ImgInput, TextInputWidth90, CustomSelectWidth90 } from '../Input';

const Container = styled.div`
  margin-bottom: 10px;

  @media screen and (max-width: 780px) {
    .title {
      margin-top: 102px;
    }
  }
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
`;

const UserUpdate = styled.div`
  width: 700px;
  padding: 40px 80px;
  border: 1px solid black;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;

  .editTitle {
    font-size: 28px;
    text-align: center;
  }

  .userUpdateInputBox {
    display: flex;
    flex-direction: column;

    .inputBox {
      display: flex;
    }
  }

  .updateButton {
    margin-top: 40px;
  }

  @media screen and (max-width: 580px) {
    width: 100%;
  }
`;

const EmailDiv = styled.div`
  font-size: 18px;
  text-align: center;
  margin: 10px 0 32px 0;
`;
interface IUser {
  createdAt: string;
  email: string;
  oauth: string;
  password: string;
  passwordReset: boolean;
  plan: string;
  profileImage: string;
  role: string;
  sites: [];
  updatedAt: string;
  userName: string;
  __v: number;
  _id: string;
}

export default function User() {
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const [data, setData] = useState<IUser>({
    createdAt: '',
    email: '',
    oauth: '',
    password: '',
    passwordReset: false,
    plan: '',
    profileImage: '',
    role: '',
    sites: [],
    updatedAt: '',
    userName: '',
    __v: 0,
    _id: '',
  });

  const profileImage = useRef<HTMLInputElement>(null);
  const userName = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const [userNameError, setUserNameError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const [role, setRole] = useState({ value: data.role, label: data.role });
  const [plan, setPlan] = useState({ value: data.plan, label: data.plan });

  console.log(3333, data.role, data.plan);
  console.log(role, plan);

  const roleOptions = [
    { value: 'basic', label: 'basic' },
    { value: 'admin', label: 'admin' },
  ];
  const planOptions = [
    { value: 'free', label: 'free' },
    { value: 'paid', label: 'paid' },
  ];

  // userId로 userData 불러오기
  const getUserInfo = async () => {
    const res = await axios.get(`/api/admin/user/${userId}`);
    await setData(() => res.data);
    setRole({ value: res.data.role, label: res.data.role });
    setPlan({ value: res.data.plan, label: res.data.plan });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const userNameHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (
      userName.current!.value.length < 2 &&
      userName.current!.value.length >= 1
    ) {
      setUserNameError(true);
    } else {
      setUserNameError(false);
    }
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (
      password.current!.value.length < 6 &&
      password.current!.value.length >= 1
    ) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const userToPatch = {
      userName: userName.current!.value,
      password: password.current!.value,
      profileImage: profileImage.current!.value,
      plan: plan.value,
      role: role.value,
    };

    console.log('patchData', userToPatch);

    await axios
      .patch(`/api/admin/user/${userId}`, userToPatch)
      .catch((error) => console.log('Error: ', error));

    dispatch({
      type: 'alertOn',
      payload: { msg: '회원정보 수정 되었습니다.' },
    });
    password.current!.value = '';
    getUserInfo();
  };

  return (
    <Container>
      <MainTitle className="title">User Infomation</MainTitle>
      <UserContainer>
        <UserUpdate>
          <div className="editTitle">회원정보 수정</div>
          <div>
            <EmailDiv>{data.email}</EmailDiv>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="userUpdateInputBox">
              <div className="inputBox">
                <TextInputWidth90
                  key={data.userName}
                  title="이름"
                  ref={userName}
                  onChange={userNameHandler}
                  defaultValue={data.userName}
                  placeholder="이름을 입력해주세요"
                />
                {userNameError && '2글자 이상 입력해주세요'}
                <TextInputWidth90
                  key={`${data.userName}/password`}
                  title="비밀번호"
                  ref={password}
                  placeholder=" "
                  onChange={passwordHandler}
                  defaultValue=" "
                />
                {passwordError && '비밀번호는 6자리 이상이여야 합니다.'}
              </div>
              <div className="inputBox">
                <CustomSelectWidth90
                  title="분류"
                  options={roleOptions}
                  onChange={(e: any) => setRole(() => e)}
                  value={role}
                />
                <CustomSelectWidth90
                  title="플랜"
                  options={planOptions}
                  onChange={(e: any) => setPlan(() => e)}
                  value={plan}
                />
              </div>
            </div>
            <ImgInput
              key={data.profileImage}
              title="프로필 이미지"
              ref={profileImage}
              defaultValue={data.profileImage}
            />
            <Button
              className="updateButton"
              type="submit"
              size="large"
              fullWidth
              disabled={userNameError || passwordError}
            >
              Update
            </Button>
          </form>
        </UserUpdate>
      </UserContainer>
    </Container>
  );
}
