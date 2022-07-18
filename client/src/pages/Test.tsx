import styled from 'styled-components';

import { HeroSite, NavBar } from '../components/Sitebox';

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
const font = 'Roboto';
const colorSet = {
  primary: '#482924',
  secondary: '#123456',
  background: '#123456',
  surface: '#123456',
};

function Test() {
  return (
    <>
      <HeroSite></HeroSite>
    </>
  );
}

export default Test;
