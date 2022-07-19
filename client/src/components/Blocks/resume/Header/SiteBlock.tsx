import styled from 'styled-components';
import { RemtoVw } from '../../../../utils/cssconvert';
const REM = 16;
SiteBlock.defaultProps = {
  data: { title: '나는 프론트엔트 엔지니어' },
  style: '왼쪽',

  colorSet: {
    primary: '#482924',
    secondary: '#123456',
    background: '#123456',
    surface: '#123456',
  },
};

export default function SiteBlock(props: any) {
  const Container = styled.div`
    font-family: ${props.font};
    color: ${props.colorSet.surface};
    font-family: 'Roboto';
    background-color: ${props.colorSet.background};
    display: flex;
    align-items: center;
    width: 100%;

    padding: 7rem 4rem;
    font-size: ${REM}px;
    box-sizing: border-box;
    @media screen and (max-width: 1120px) {
      height: ${RemtoVw(REM, 3.8)};
      padding: ${RemtoVw(REM, 7)} ${RemtoVw(REM, 1.6)};
    }
  `;

  const Title = styled.div<{ colorSet: any }>`
    font-weight: 700;
    font-size: 3rem;
    margin-left: 1rem;
    color: ${(props) => props.colorSet.primary && '#fff'};
    @media screen and (max-width: 1120px) {
      font-size: ${RemtoVw(REM, 2)};
      margin-left: ${RemtoVw(REM, 0.75)};
    }
  `;

  const data = props.data;
  console.log(props);
  return (
    <Container>
      <Title colorSet={props.colorSet}>{data.title}</Title>
    </Container>
  );
}
