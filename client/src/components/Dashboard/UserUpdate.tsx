import styled from "styled-components";
import Button from "../Button";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MainTitle } from "./MyInfo";
import { useDispatch } from "react-redux";

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
  width: 500px;
  height: 600px;
  padding: 40px 80px;
  border: 1px solid black;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;

  .editTitle {
    font-size: 28px;
    text-align: center;
  }

  .updateButton {
    margin-top: 20px;
  }

  @media screen and (max-width: 580px) {
    width: 100%;
  }
`;

export const InputDiv = styled.div`
  display: flex;
  margin-bottom: 18px;
`;

export const InputTitle = styled.label`
  font-size: 16px;
  line-height: 36px;
  margin-right: 12px;
  flex: 1;

  @media screen and (max-width: 500px) {
    width: 90%;
    font-size: 14px;
  }
`;

export const Input = styled.input`
  flex: 2;
  width: 100%;
  height: 38px;
  font-size: 16px;
  line-height: 40px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid black;
  box-sizing: border-box;
  padding: 12px;

  @media screen and (max-width: 500px) {
    width: 90%;
    font-size: 14px;
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
  const dispatch = useDispatch();

  const [profileImage, setProfileImage] = useState("");
  const [role, setRole] = useState("");
  const [plan, setPlan] = useState("");

  const password = useRef<HTMLInputElement>(null);
  const userName = useRef<HTMLInputElement>(null);
  const [userNameError, setUserNameError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const [data, setData] = useState<IUser>({
    createdAt: "",
    email: "",
    oauth: "",
    password: "",
    passwordReset: false,
    plan: "",
    profileImage: "",
    role: "",
    sites: [],
    updatedAt: "",
    userName: "",
    __v: 0,
    _id: "",
  });

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

  useEffect(() => {
    const getUserInfo = async () => {
      const res = await axios.get(`/api/admin/user/${userId}`);
      await setData(res.data);
      await setProfileImage(data.profileImage);
      await setRole(data.role);
      await setPlan(data.plan);
    };
    getUserInfo();
  }, [
    userId,
    data.userName,
    data.password,
    data.profileImage,
    data.role,
    data.plan,
  ]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const userToPatch = {
      userName: userName.current!.value,
      password: password.current!.value,
      profileImage: profileImage,
      plan: plan,
      role: role,
    };

    console.log("patchData", userToPatch);

    await axios
      .patch(`/api/admin/user/${userId}`, userToPatch)
      .catch((error) => console.log("Error: ", error));

    dispatch({ type: "alertOn", payload: "회원정보 수정 되었습니다." });
    password.current!.value = "";
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
          <form className="userUpdateForm" onSubmit={handleSubmit}>
            <div className="userUpdateItem">
              <InputDiv>
                <InputTitle htmlFor="">이름</InputTitle>
                <Input
                  type="text"
                  placeholder="elice"
                  ref={userName}
                  defaultValue={data.userName}
                  onChange={userNameHandler}
                />
                {userNameError && "2글자 이상 입력해주세요"}
              </InputDiv>
              <InputDiv>
                <InputTitle htmlFor="">비밀번호</InputTitle>
                <Input
                  type="text"
                  placeholder=""
                  defaultValue=" "
                  ref={password}
                  onChange={passwordHandler}
                />
                {passwordError && "비밀번호는 6자리 이상이여야 합니다."}
              </InputDiv>
              <InputDiv>
                <InputTitle htmlFor="">프로필</InputTitle>
                <Input
                  type="text"
                  placeholder="elice"
                  defaultValue={data.profileImage}
                  onChange={(e) => setProfileImage(e.target.value)}
                />
              </InputDiv>
              <InputDiv>
                <InputTitle htmlFor="">분류</InputTitle>
                <Input
                  type="text"
                  placeholder="elice"
                  defaultValue={data.role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </InputDiv>
              <InputDiv>
                <InputTitle htmlFor="">플랜</InputTitle>
                <Input
                  type="text"
                  placeholder="elice"
                  defaultValue={data.plan}
                  onChange={(e) => setPlan(e.target.value)}
                />
              </InputDiv>
              <Button
                className="updateButton"
                type="submit"
                size="large"
                fullWidth
                disabled={userNameError || passwordError}
              >
                Update
              </Button>
            </div>
          </form>
        </UserUpdate>
      </UserContainer>
    </Container>
  );
}
