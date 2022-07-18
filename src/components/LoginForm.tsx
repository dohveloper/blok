import React from 'react';
import styled from 'styled-components';
import { Button } from '../components/Button';

const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
`;
const Title = styled.div`
  font-weight: 600;
  font-size: 32px;
  line-height: 39px;
  align-items: center;
  text-align: center;
`;

function LoginForm() {
  return (
    <Container>
      <Title>Login 페이지 테스트</Title>
      <Button handleClick={(e) => console.log('로그인완료!')}>
        로그인 버튼
      </Button>
    </Container>
  );
}

export default LoginForm;
