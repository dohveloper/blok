import styled from 'styled-components';
import { RemtoVw } from '../../../../utils/cssconvert';
const REM = 16;
SiteBlock.defaultProps = {
  data: {
    title: '나는 프론트엔트 엔지니어',
    intro: `애국가의 자취는 조선 후기 개화기와 갑오개혁 직후까지 올라간다. 
      1896년 당시 독립문 정초식에서 배재학당 학생들에 의해 그 유명한 
      스코틀랜드 민요 올드 랭 사인의 멜로디로 불린 작사 미상인 애국가가 최초의 애국가로 여겨진다. 
      여기서 후렴 "무궁화 삼천리 화려강산 죠션 사람 죠션으로 길이 보죤하세" 라는 가사가 지금의 애국가 가사에서도 맥을 
      이어 변형(조선→대한)되어 쓰이고 있는 데서 확인할 수 있다. 이 때는 한 해에 수십 개의 애국가가 쏟아져 나왔다.`,
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

  const data = props.data;
  console.log(props);
  return (
    <Container>
      <Title>{data.title}</Title>
      <Intro>{data.intro}</Intro>
    </Container>
  );
}
