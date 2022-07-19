import styled from 'styled-components';
import { RemtoVw } from '../../../../utils/cssconvert';
const REM = 16;
SiteBlock.defaultProps = {
  data: {
    title: '보유 기술 스택',
    intro: ['javascript', 'java', 'typescript', 'react', 'node'],
  },
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
    background-color: ${props.colorSet.background};
    font-family: ${props.font};
    color: ${props.colorSet.surface};
    font-family: 'Roboto';
    background-color: #fff;
    display: flex;
    width: 90%;
    padding: 2rem 0;
    margin: 0 auto;
    border-bottom: 1px solid black;
    font-size: ${REM}px;
    box-sizing: border-box;
    @media screen and (max-width: 1120px) {
      padding: ${RemtoVw(REM, 2)} 0;
    }
  `;

  const Intro = styled.span`
    font-size: 1rem;
    color: black;
    width: 80%;
    display: flex;
    @media screen and (max-width: 1120px) {
      font-size: ${RemtoVw(REM, 1)};
    }
  `;

  const Title = styled.span`
    font-weight: 700;
    font-size: 1.1rem;
    margin-left: 1rem;
    color: black;
    width: 20%;
    vertical-align: top;
    @media screen and (max-width: 1120px) {
      font-size: ${RemtoVw(REM, 1.1)};
      margin-left: ${RemtoVw(REM, 0.75)};
    }
  `;

  const Skill = styled.div`
    box-sizing: border-box;
    padding: 5px 8px;
    background-color: #f0f1f3;
    margin: 0 1px;
    border-radius: 10px;
  `;

  const data = props.data;
  console.log(props);
  const skills = (data: any) => {
    const arr = [];
    for (let i = 0; i < data.length; i++) {
      arr.push(<Skill>{data[i]}</Skill>);
    }
    return arr;
  };
  return (
    <Container>
      <Title>{data.title}</Title>
      <Intro>{skills(data.intro)}</Intro>
    </Container>
  );
}
