import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import * as icon from '../icons';

const Logodiv = styled.div`
  font-family: 'GangwonEduPower';
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 29px;
  width: 100px;
  margin: 0 auto 0 20px;
  position: absolute;
  top: 10px;
  left: 10px;
  height: 40px;
  cursor: pointer;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1120px) {
    position: static;
    width: 100%;
    text-align: center;
    margin: 0;
    padding: 0;
    height: 40px;
    padding: 10px 0;
  }
`;

const LogoImg = styled.img`
  height: 33px;
  width: 36px;
  margin-right: 10px;
`;

const Logo = () => {
  const nav = useNavigate();
  const toMainClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    nav('/');
  };
  return (
    <Logodiv
      onClick={(e) => {
        toMainClick(e);
      }}
    >
      <LogoImg src={icon.Logo} />
      blok
    </Logodiv>
  );
};

export default Logo;
