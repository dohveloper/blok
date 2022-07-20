import axios from 'axios';
import styled from 'styled-components';
import React, { useState, useEffect, ButtonHTMLAttributes } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrInput } from '../components/Input';
import * as icons from '../icons';

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
  const [intros, setIntros] = useState('');
  const [arr, setArr] = useState<Array<string>>([]);
  const Skill = styled.div`
    box-sizing: border-box;
    padding: 5px 12px;
    background-color: #f0f1f3;
    margin: 0 4px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
  `;
  const Intro = styled.span`
    font-size: 1rem;
    color: black;
    width: 80%;
    display: flex;
    flex-wrap: wrap;
  `;
  const Del = styled.img`
    width: 8px;
    height: 8px;
    padding: 3px;
    margin-left: 2px;
    cursor: pointer;
  `;
  const skills = (data: Array<string> | undefined) => {
    const arr = [];
    if (!data) {
      return;
    }
    for (let i = 0; i < data.length; i++) {
      arr.push(
        <Skill key={`${data}-${i}`}>
          {data[i]}
          <Del
            src={icons.x}
            onClick={() => {
              setArr((res) => {
                res.splice(i, 1);
                return [...res];
              });
            }}
          />
        </Skill>
      );
    }
    return arr;
  };

  return (
    <Container>
      아직 구현 하지 못함
      {user === true ? (
        <LogoutBtn onClick={logoutClick}>로그아웃하기</LogoutBtn>
      ) : (
        <LogoutBtn onClick={loginClick}>로그인하러가기</LogoutBtn>
      )}
      <ArrInput
        title='스킬 셋'
        required
        guideline='기술 스택을 입력해주세요'
        key={'skillset'}
        value={intros}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setIntros(e.target.value);
        }}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          console.log(e);
          setArr((res) => {
            return [...res, intros];
          });
          setIntros('');
        }}
        arr={<Intro>{skills(arr)}</Intro>}
      ></ArrInput>
    </Container>
  );
}
