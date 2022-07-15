import axios from 'axios';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  background-color: #f7f7f9;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  font-size: 80px;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
`;

const LogoutBtn = styled.button`
  height: 40px;
  width: 120px;
  font-size: 16px;
  border: 2px solid #333;
  border-radius: 8px;
  cursor: pointer;
  background-color: white;
`;
// eslint-disable-next-line react-hooks/rules-of-hooks

export default Main;
function Main() {
  const [user, SetUser] = useState<boolean>(true);
  const nav = useNavigate();
  const logoutClick = async (e: any) => {
    try {
      const res = await axios.get('/api/user/logout');
      alert('로그아웃되었습니다');
    } catch (e) {
      SetUser(false);
    }
  };
  const loginClick = (e: any) => {
    nav('/login');
  };
  useEffect(() => {
    return () => {
      async function loginCheck() {
        const res = await axios.get('/api/user/logincheck');
        if (res.data) {
          SetUser(true);
        }
      }
      loginCheck();
    };
  });
  return (
    <Container>
      아직 구현 하지 못함
      {user === true ? (
        <LogoutBtn onClick={logoutClick}>로그아웃하기</LogoutBtn>
      ) : (
        <LogoutBtn onClick={loginClick}>로그인하러가기</LogoutBtn>
      )}
    </Container>
  );
}
