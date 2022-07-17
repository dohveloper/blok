import Loginfield from '../components/Login/Loginfield';
import styled from 'styled-components';
import Logo from '../components/Logo';
import { useAppSelector } from '../reducers';

export const Container = styled.div`
  background-color: #f7f7f9;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;

  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  @media screen and (max-width: 1120px) {
    justify-content: flex-start;
  }
`;

export default Login;
function Login() {
  return (
    <Container>
      <Logo></Logo>
      <Loginfield></Loginfield>
    </Container>
  );
}
