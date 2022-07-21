import styled from 'styled-components';
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import * as LoginForm from './LoginForm';
import { useNavigate } from 'react-router-dom';
import * as vaildation from '../../utils/validation';
import { useAppDispatch } from '../../reducers';

const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 49px 39px 51px 39px;
  box-sizing: border-box;
  width: 478px;

  /* shadow-m */
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.12);
  border-radius: 7px;
  @media screen and (max-width: 1120px) {
    width: 100%;
    padding: 39px 62px 30px 60px;
  }
`;
const Button = styled(LoginForm.Button)`
  margin: 32px 0;
`;

function FindPasswordfield() {
  const regEmail = vaildation.regEmail;
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [btnError, setbtnError] = useState<boolean>(true);
  const btnactive = emailError === true || btnError === true;
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (
      regEmail.test(emailRef.current!.value) !== true &&
      emailRef.current!.value.length >= 1
    ) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    if (emailRef.current!.value.length === 0) {
      setbtnError(true);
    } else {
      setbtnError(false);
    }
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (nameRef.current!.value.length === 1) {
      setNameError(true);
    } else {
      setNameError(false);
    }
    if (emailRef.current!.value.length === 0) {
      setbtnError(true);
    } else {
      setbtnError(false);
    }
  };
  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const data = {
      userName: nameRef.current!.value,
      email: emailRef.current!.value,
    };
    try {
      await axios.post('/api/user/reset-password/', data);
      dispatch({
        type: 'alertOn',
        payload: { msg: '성공적으로 메일이 보내졌습니다.' },
      });
      nav('/login');
    } catch (e: any) {
      console.log(e);
      dispatch({
        type: 'alertOn',
        payload: { msg: `${e.response.data.reason}` },
      });
    }
  };

  const toLoginClick = (
    e: React.MouseEvent<HTMLHyperlinkElementUtils, MouseEvent>
  ) => {
    nav('/login');
  };

  useEffect(() => {
    return () => {
      async function loginCheck() {
        const res = await axios.get('/api/user/logincheck');
        if (res.data) {
          console.log('이미 로그인 되어있습니다.');
          nav('/dashboard');
        }
      }
      loginCheck();
    };
  });
  return (
    <Container>
      <LoginForm.FindPswTitle>비밀번호를 잊으셨나요?</LoginForm.FindPswTitle>
      <LoginForm.InputDiv>
        <LoginForm.InputTitle error={false}>이름</LoginForm.InputTitle>
        <LoginForm.ErrorSpan>
          {nameError && '유효하지 않은 이름입니다.'}
        </LoginForm.ErrorSpan>
      </LoginForm.InputDiv>
      <LoginForm.Input
        onChange={handleNameChange}
        type='string'
        ref={nameRef}
        placeholder='가입한 이름을 입력해주세요.'
        error={nameError}
      />

      <LoginForm.InputDiv>
        <LoginForm.InputTitle error={false}>이메일</LoginForm.InputTitle>
        <LoginForm.ErrorSpan>
          {emailError && '유효하지 않은 이메일 주소입니다.'}
        </LoginForm.ErrorSpan>
      </LoginForm.InputDiv>
      <LoginForm.Input
        onChange={handleEmailChange}
        type='string'
        ref={emailRef}
        placeholder='가입한 이메일 주소를 입력해주세요.'
        error={emailError}
      />
      <Button onClick={handleClick} disabled={btnactive}>
        이메일로 새 비밀번호 보내기
      </Button>
      <LoginForm.Graytext>
        <LoginForm.Atag onClick={toLoginClick}>
          로그인으로 돌아가기
        </LoginForm.Atag>
      </LoginForm.Graytext>
    </Container>
  );
}

export default FindPasswordfield;
