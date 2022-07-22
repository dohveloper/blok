import styled, { keyframes } from 'styled-components';
import Logo from '../components/Logo';
const Container = styled.div`
  background-color: #f7f7f9;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 3rem;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
`;
const circleAni = keyframes`
  0%{

    opacity: 1;
  }
  50%{

    opacity: 0.5;
  }
  100%{

    opacity: 0;
  }
`;
const Maindiv = styled.div`
  width: 40rem;
  animation: ${circleAni} 3s;
`;

export default Main;
function Main() {
  return (
    <>
      <Logo></Logo>
      <Container>
        <Maindiv>쉽게</Maindiv>
        <Maindiv></Maindiv>
        <Maindiv className='123'>blok 에 오신걸 환영합니다.</Maindiv>
        <button>로그인 하러가기</button>
      </Container>
    </>
  );
}
