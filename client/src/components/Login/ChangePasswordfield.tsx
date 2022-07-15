import styled from 'styled-components';
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import * as LoginForm from './LoginForm';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 49px 72px 25px 70px;
  box-sizing: border-box;
  width: 645px;
  border: 1px solid black;
  @media screen and (max-width: 1120px) {
    width: 100%;
    padding: 39px 62px 15px 60px;
  }
`;

function ChangePasswordfield() {
  const nav = useNavigate();
  const currentpswRef = useRef<HTMLInputElement>(null);
  const newPswRef = useRef<HTMLInputElement>(null);
  const newPscheckRef = useRef<HTMLInputElement>(null);
  const [currentpswError, setCurrentpswError] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');
  const [newpswError, setNewPswError] = useState<boolean>(false);
  const [newpswcheckError, setNewPswcheckError] = useState<boolean>(false);
  const [btnError, setbtnError] = useState<boolean>(true);

  const btnactive =
    currentpswError === true ||
    newpswcheckError === true ||
    newpswError === true ||
    btnError === true;
  const handleCPChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (
      currentpswRef.current!.value.length < 6 &&
      currentpswRef.current!.value.length >= 1
    ) {
      setCurrentpswError(true);
    } else {
      setCurrentpswError(false);
    }
    if (currentpswRef.current!.value.length === 0) {
      setbtnError(true);
    } else {
      setbtnError(false);
    }
  };
  const handleNPChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (
      newPswRef.current!.value.length < 6 &&
      newPswRef.current!.value.length >= 1
    ) {
      setNewPswError(true);
    } else {
      setNewPswError(false);
    }
    if (newPswRef.current!.value.length === 0) {
      setbtnError(true);
    } else {
      setbtnError(false);
    }
  };
  const handleNPCChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (
      newPscheckRef.current!.value.length < 6 &&
      newPscheckRef.current!.value.length >= 1
    ) {
      setNewPswcheckError(true);
    } else {
      setNewPswcheckError(false);
    }
    if (newPscheckRef.current!.value.length === 0) {
      setbtnError(true);
    } else {
      setbtnError(false);
    }
  };

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const current = currentpswRef.current!.value;
    const newpsw = newPswRef.current!.value;
    const newpswcheck = newPscheckRef.current!.value;
    // current 유효한지 확인 후
    if (newpsw !== newpswcheck) {
      console.log('비밀번호가 일치하지 않습니다.');
      newPscheckRef.current!.focus();
      setNewPswcheckError(true);
    } else {
      const data = {
        currentPassword: current,
        password: newpsw,
      };
      try {
        await axios.patch(`/api/user/change-password/${userId}`, data);
        alert('비밀번호를 바꾸었습니다.'); // 모달창구현
        nav('/login');
      } catch (e) {
        console.log(e);
      }
    }
  };

  const toLoginClick = (
    e: React.MouseEvent<HTMLHyperlinkElementUtils, MouseEvent>
  ) => {
    nav('/login');
  };

  useEffect(() => {
    async function loginCheck() {
      const res = await axios.get('/api/user/logincheck');
      if (res.data) {
        console.log(res.data.passwordReset);
        setUserId(res.data._id);
      } else {
        nav('login');
      }
    }
    loginCheck();
  });
  return (
    <Container>
      <LoginForm.Title>비밀번호 변경</LoginForm.Title>
      <LoginForm.InputDiv>
        <LoginForm.InputTitle error={currentpswError}>
          현재 비밀번호
        </LoginForm.InputTitle>
        <LoginForm.ErrorSpan>
          {currentpswError && '유효하지 않은 비밀번호 입니다.'}
        </LoginForm.ErrorSpan>
      </LoginForm.InputDiv>
      <LoginForm.Input
        onChange={handleCPChange}
        type='password'
        ref={currentpswRef}
        placeholder='현재 비밀번호를 입력하세요.'
        error={currentpswError}
      />
      <LoginForm.InputDiv>
        <LoginForm.InputTitle error={newpswError}>
          새 비밀번호
        </LoginForm.InputTitle>
        <LoginForm.ErrorSpan>
          {newpswError && '유효하지 않은 비밀번호 입니다.'}
        </LoginForm.ErrorSpan>
      </LoginForm.InputDiv>
      <LoginForm.Input
        onChange={handleNPChange}
        type='password'
        ref={newPswRef}
        placeholder='변경할 비밀번호를 입력하세요.'
        error={newpswError}
      />
      <LoginForm.InputDiv>
        <LoginForm.InputTitle error={newpswcheckError}>
          새 비밀번호 확인
        </LoginForm.InputTitle>
        <LoginForm.ErrorSpan>
          {newpswcheckError && '유효하지 않은 비밀번호 입니다.'}
        </LoginForm.ErrorSpan>
      </LoginForm.InputDiv>
      <LoginForm.Input
        onChange={handleNPCChange}
        type='password'
        ref={newPscheckRef}
        placeholder='비밀번호는 6자리 이상이여야합니다.'
        error={newpswcheckError}
      />

      <LoginForm.Button onClick={handleClick} disabled={btnactive}>
        비밀번호 변경
      </LoginForm.Button>
      <LoginForm.Text>또는</LoginForm.Text>
      <LoginForm.Graytext>
        로그인으로 돌아가기
        <LoginForm.Atag onClick={toLoginClick}>로그인하기</LoginForm.Atag>
      </LoginForm.Graytext>
    </Container>
  );
}

export default ChangePasswordfield;
