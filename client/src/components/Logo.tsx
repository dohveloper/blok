import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Logodiv = styled.div`
  font-size: 30px;
  font-weight: 700;
  width: 100px;
  margin: 0 auto 0 20px;
  position: absolute;
  top: 10px;
  left: 10px;
  height: 40px;
  cursor: pointer;
  padding: 10px;
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

const Logo = () => {
  const nav = useNavigate();
  const toMainClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    nav('/main');
  };
  return (
    <Logodiv
      onClick={(e) => {
        toMainClick(e);
      }}
    >
      Blocks.
    </Logodiv>
  );
};

export default Logo;
