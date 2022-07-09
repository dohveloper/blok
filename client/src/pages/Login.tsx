import LoginBox from '../components/Login/Loginbox';
import styled from 'styled-components';

export const Container = styled.div`
  background-color: #f7f7f9;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;

  box-sizing: border-box;
  width: 1920px;
  height: 1080px;
`;

export default Login;
function Login() {
  return (
    <Container>
      <LoginBox></LoginBox>
    </Container>
  );
}
