import styled from "styled-components";
import Button from "./Button";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ContentTitle, Content, ContentDiv, Title } from "./MyInfo";
import { MainTitle } from "../components/MyInfo";
import logoImg from "./../imgs/logo.png";

const Container = styled.div`
  margin-bottom: 10px;

  @media screen and (max-width: 1120px) {
    width: 100%;
    .title {
      margin-top: 65px;
    }
  }

  @media screen and (max-width: 780px) {
    .title {
      margin-top: 102px;
    }
  }
`;

const UserContainer = styled.div`
  display: flex;

  align-items: center;
  margin-top: 20px;
  width: 1020px;

  @media screen and (max-width: 1120px) {
    flex-direction: column;
    width: 100%;
  }
`;

const UserShow = styled.div`
  width: 500px;
  height: 600px;
  padding: 60px;
  box-sizing: border-box;
  border: 1px solid black;
  margin-right: 20px;
  background-color: #fff;
  border-radius: 10px;
  font-size: 16px;

  .item {
    height: 58px;
  }

  @media screen and (max-width: 1120px) {
    margin-right: 0;
    margin-bottom: 20px;
  }

  @media screen and (max-width: 500px) {
    width: 90%;
    height: 100%;
    padding: 20px;
  }
`;

const Profile = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  border: 1px solid black;
  overflow: hidden;
  margin: 0 auto;

  .imageThumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CustomContentTitle = styled(ContentTitle)`
  font-size: 16px;

  @media screen and (max-width: 500px) {
    font-size: 14px;
  }
`;

const CustomContent = styled(Content)`
  font-size: 16px;

  @media screen and (max-width: 500px) {
    font-size: 14px;
  }
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

  @media screen and (max-width: 500px) {
    width: 90%;
    height: 100%;

    padding: 20px;
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

export default function User() {
  const { userId } = useParams();
  const [data, setData] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [propfileImage, setProfileImage] = useState("");
  const [role, setRole] = useState("");
  const [plan, setPlan] = useState("");

  const getUserInfo = async () => {
    const res = await axios.get(`/user/${userId}`);
    await setData(res.data);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const userToPatch = {
      plan: plan,
      name: name,
      password: password,
      profileImage: propfileImage,
      role: role,
    };

    console.log("patchData", userToPatch);

    await axios
      .patch(`/user/${userId}`, userToPatch)
      .catch((error) => console.log("Error: ", error));
  };

  return (
    <Container>
      <MainTitle className="title">User Infomation</MainTitle>
      <UserContainer>
        <UserShow>
          <Title>회원정보</Title>
          <div className="userUpdateItem">
            {data.map((e) => (
              <div key={e.id}>
                <ContentDiv>
                  <Profile className="contnet">
                    <img
                      className="imageThumbnail"
                      src={logoImg}
                      alt={e.profileImage}
                    ></img>
                  </Profile>
                </ContentDiv>
                <ContentDiv>
                  <CustomContentTitle>이름</CustomContentTitle>
                  <CustomContent>{e.name}</CustomContent>
                </ContentDiv>
                <ContentDiv>
                  <CustomContentTitle>도메인</CustomContentTitle>
                  <CustomContent>
                    {e.domain.map((domain: any, idx: any) => (
                      <span key={idx}>
                        <a href={domain.link}>
                          {idx + 1}.{domain.domainName}{" "}
                        </a>
                      </span>
                    ))}
                  </CustomContent>
                </ContentDiv>

                <ContentDiv>
                  <CustomContentTitle className="contnetTitle">
                    템플릿
                  </CustomContentTitle>
                  <CustomContent className="contnet">
                    {e.template}
                  </CustomContent>
                </ContentDiv>
              </div>
            ))}
          </div>
        </UserShow>

        <UserUpdate>
          <div className="editTitle">회원정보 수정</div>
          {data
            .filter((user) => user.id === Number(userId))
            .map((e: any) => (
              <div key={e.id}>
                <div>
                  <EmailDiv>{e.email}</EmailDiv>
                </div>
                <form
                  className="userUpdateForm"
                  onSubmit={handleSubmit}
                  key={e.id}
                >
                  <div className="userUpdateItem">
                    <InputDiv>
                      <InputTitle htmlFor="">이름</InputTitle>
                      <Input
                        type="text"
                        placeholder="elice"
                        defaultValue={e.name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </InputDiv>
                    <InputDiv>
                      <InputTitle htmlFor="">비밀번호</InputTitle>
                      <Input
                        type="text"
                        placeholder="elice"
                        defaultValue=" "
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </InputDiv>
                    <InputDiv>
                      <InputTitle htmlFor="">프로필</InputTitle>
                      <Input
                        type="text"
                        placeholder="elice"
                        defaultValue={e.profileImage}
                        onChange={(e) => setProfileImage(e.target.value)}
                      />
                    </InputDiv>
                    <InputDiv>
                      <InputTitle htmlFor="">분류</InputTitle>
                      <Input
                        type="text"
                        placeholder="elice"
                        defaultValue={e.role}
                        onChange={(e) => setRole(e.target.value)}
                      />
                    </InputDiv>
                    <InputDiv>
                      <InputTitle htmlFor="">플랜</InputTitle>
                      <Input
                        type="text"
                        placeholder="elice"
                        defaultValue={e.plan}
                        onChange={(e) => setPlan(e.target.value)}
                      />
                    </InputDiv>
                    <Button
                      className="updateButton"
                      type="submit"
                      size="large"
                      fullWidth
                    >
                      Update
                    </Button>
                    <Button color="black" outline size="large" fullWidth>
                      Delete
                    </Button>
                  </div>
                </form>
              </div>
            ))}
        </UserUpdate>
      </UserContainer>
    </Container>
  );
}
