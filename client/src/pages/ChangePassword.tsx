import styled from 'styled-components';
import ChangePasswordfield from '../components/Login/ChangePasswordfield';
import Logo from '../components/Logo';

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

function ChangePassword() {
  return (
    <Container>
      <Logo></Logo>
      <ChangePasswordfield></ChangePasswordfield>
    </Container>
  );
}

export default ChangePassword;
