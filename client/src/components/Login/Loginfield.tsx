import styled from 'styled-components';
import React, { useState, useRef } from 'react';
import axios from 'axios';
import * as LoginForm from './LoginForm';
import { useNavigate } from 'react-router-dom';
import * as vaildation from '../../utils/validation';
import * as imgs from '../../imgs';

const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 49px 72px 25px 70px;
  box-sizing: border-box;
  width: 645px;
  border: 1px solid black;
  @media screen and (max-width: 1120px) {
    width: 100%;
    padding: 39px 62px 15px 60px;
  }
`;

function Loginfield() {
  const nav = useNavigate();
  const regEmail = vaildation.regEmail;
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [pswError, setPswError] = useState<boolean>(false);
  // const [loginError, setloginError] = useState<boolean>(false);
  const [loginErrorMsg, setloginErrorMsg] = useState<string>('');
  const [btnError, setbtnError] = useState<boolean>(true);
  const btnactive =
    emailError === true || pswError === true || btnError === true;
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (
      regEmail.test(emailRef.current!.value) !== true &&
      emailRef.current!.value.length >= 1
    ) {
      setEmailError(true);
    } else {
      // setloginError(false);
      setEmailError(false);
    }
    if (emailRef.current!.value.length === 0) {
      setbtnError(true);
    } else {
      setbtnError(false);
    }
  };
  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (
      passwordRef.current!.value.length < 6 &&
      passwordRef.current!.value.length >= 1
    ) {
      setPswError(true);
    } else {
      // setloginError(false);
      setPswError(false);
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
    console.log(
      `email: ${emailRef.current!.value}, password: ${
        passwordRef.current!.value
      } `
    );
    const data = {
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
    };
    const logindata = JSON.stringify(data);
    localStorage.setItem('login', logindata);
    try {
      const res = await axios.post('/api/auth/login', data);
      const resdata = res.data;
      if (resdata.passwordReset) {
        nav('/changepassword');
      }
      nav('main');
    } catch (e: any) {
      console.log(e.response.data.reason);
      // setloginError(true);
      setloginErrorMsg(() => {
        return e.response.data.reason;
      });
      alert(loginErrorMsg);
    }
  };

  const googleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      const res = await axios.get('/api/auth/google');
      console.log(res);
      nav('/main');
    } catch (e) {
      console.log(e);
    }
  };
  const toSigninClick = (
    e: React.MouseEvent<HTMLHyperlinkElementUtils, MouseEvent>
  ) => {
    nav('/signin');
  };
  const tofindPswClick = (
    e: React.MouseEvent<HTMLHyperlinkElementUtils, MouseEvent>
  ) => {
    nav('/findpassword');
  };

  return (
    <Container>
      <LoginForm.Title>로그인</LoginForm.Title>
      <LoginForm.InputDiv>
        <LoginForm.InputTitle error={emailError}>이메일</LoginForm.InputTitle>
        <LoginForm.ErrorSpan>
          {emailError && '유효하지 않은 이메일 주소입니다.'}
        </LoginForm.ErrorSpan>
      </LoginForm.InputDiv>
      <LoginForm.Input
        onChange={handleEmailChange}
        type='string'
        ref={emailRef}
        placeholder='이메일 주소를 입력하세요.'
        error={emailError}
      />
      <LoginForm.InputDiv>
        <LoginForm.InputTitle error={pswError}>비밀번호</LoginForm.InputTitle>
        <LoginForm.ErrorSpan>
          {pswError && '비밀번호는 6자리 이상이여야합니다.'}
        </LoginForm.ErrorSpan>
      </LoginForm.InputDiv>
      <LoginForm.Input
        onChange={handlePasswordChange}
        type='password'
        ref={passwordRef}
        placeholder='비밀번호는 6자리 이상이여야합니다.'
        error={pswError}
      />

      <LoginForm.FindPasswordtag onClick={tofindPswClick}>
        비밀번호 찾기
      </LoginForm.FindPasswordtag>

      <LoginForm.Button onClick={handleClick} disabled={btnactive}>
        로그인 버튼
      </LoginForm.Button>
      <LoginForm.Text>또는</LoginForm.Text>
      <LoginForm.GoogleButton onClick={googleClick}>
        <img src={imgs.googleloginicon} alt='구글'></img>구글 로그인
      </LoginForm.GoogleButton>

      <LoginForm.Graytext>
        처음이신가요?
        <LoginForm.Atag onClick={toSigninClick}>가입하기</LoginForm.Atag>
      </LoginForm.Graytext>
    </Container>
  );
}

export default Loginfield;
