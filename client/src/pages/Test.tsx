import styled from 'styled-components';
import Navbar from '../components/SettingBox/Navbar';
import Hero from '../components/SettingBox/Hero';
import Feature from '../components/SettingBox/Feature';
import Footer from '../components/SettingBox/Footer';

const Container = styled.div`
  padding-top: 50px;
  background-color: #f7f7f9;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  font-family: 'Inter';
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
`;

function Test() {
  return (
    <Container>
      <Navbar></Navbar>
      <Hero></Hero>
      <Feature></Feature>
      <Footer></Footer>
    </Container>
  );
}

export default Test;
