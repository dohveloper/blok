import React from 'react';
import styled from 'styled-components';

import LoginForm from '../components/LoginForm';

const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Login() {
  return (
    <Container>
      <LoginForm></LoginForm>
    </Container>
  );
}

export default Login;
