import styled from 'styled-components';

import HeroSite from '../components/Sitebox';

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
    <>
      <HeroSite></HeroSite>
    </>
  );
}

export default Test;
