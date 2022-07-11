import styled from 'styled-components';
import React, { useState, useRef } from 'react';
// import axios from 'axios';
import * as LoginForm from './LoginForm';
import { useNavigate } from 'react-router-dom';
import * as vaildation from '../../utils/validation';

const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 49px 72px 25px 70px;
  box-sizing: border-box;
  width: 645px;
  border: 1px solid black;
`;

function FindPasswordfield() {
  const regEmail = vaildation.regEmail;
  const nav = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
    // 문제없으면 이동
    // nav('/signin');
    // try {
    //   Api.get('url:${data}')

    // } catch(e){
    //   console.log(e)
    //   모달창 띄우기
    // }
  };

  const toLoginClick = (
    e: React.MouseEvent<HTMLHyperlinkElementUtils, MouseEvent>
  ) => {
    nav('/login');
  };

  // useEffect(() => {
  //   const data = localStorage.set('login');
  //   console.log(
  //     `${data ? '로그인정보 이미 있습니다.' : '로그인 정보가 없습니다.'}`
  //   );
  // }, []);
  // useEffect(() => {
  //   axios.get('/123').then((res): void => console.log(res));
  // }, []);
  return (
    <Container>
      <LoginForm.FindPswTitle>비밀번호를 잊으셨나요?</LoginForm.FindPswTitle>
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
      <LoginForm.Button onClick={handleClick} disabled={btnactive}>
        이메일로 새로운 비밀번호 보내기
      </LoginForm.Button>
      <LoginForm.Graytext>
        <LoginForm.Atag onClick={toLoginClick}>
          로그인으로 돌아가기
        </LoginForm.Atag>
      </LoginForm.Graytext>
    </Container>
  );
}

export default FindPasswordfield;
