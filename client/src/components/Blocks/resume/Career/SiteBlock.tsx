import styled from 'styled-components';
import { RemtoVw } from '../../../../utils/cssconvert';

SiteBlock.defaultProps = {
  data: {
    title: '경력',
    skills: ['javascript', 'typescript', 'react', 'node'],
    paraphrase: `엘리스 SW 엔지니어 트랙이란? 엘리스 SW 엔지니어 트랙은 4개월 간 웹 개발 이론, 실무 프로젝트 경험,
  취업 역량을 모두 쌓아 신입 웹 개발자로 매칭되는 풀코스 교육입니다.
  1. 현업에서 사용하는 최신 기술 스택을 집중적으로 학습하고,
  2. 두 번의 팀 프로젝트를 거쳐 실무에 강한 신입 인재로 성장하고,
  3. 원하는 IT 로켓 스타트업에 채용 매칭까지 받고 싶다면 지금 바로 엘리스 SW 엔지니어 트랙에 합류하세요!`,
    careertitle: '엘리스 SW엔지니어 트랙 2기',
    careerrole: '프론트 엔드 개발',
    careerterm: '2022년 4월 ~ 2022년 7월',
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
  const REM = 16;
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
    flex-direction: column;
    @media screen and (max-width: 1120px) {
      font-size: ${RemtoVw(REM, 1)};
    }
  `;
  const Skills = styled.div`
    display: flex;
    margin-bottom: 0.6rem;
    @media screen and (max-width: 1120px) {
      margin-bottom: ${RemtoVw(REM, 0.6)};
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

  const CareerTitle = styled.div`
    font-weight: 700;
    font-size: 1.1rem;

    color: black;
    margin-bottom: 0.6rem;
    vertical-align: top;
    @media screen and (max-width: 1120px) {
      font-size: ${RemtoVw(REM, 1.1)};
      margin-bottom: ${RemtoVw(REM, 0.6)};
    }
  `;
  const CareerTerm = styled.div`
    font-size: 0.95rem;
    color: black;
    margin-bottom: 0.6rem;
    @media screen and (max-width: 1120px) {
      font-size: ${RemtoVw(REM, 0.95)};
      margin-bottom: ${RemtoVw(REM, 0.6)};
    }
  `;
  const CareerRole = styled.div`
    font-size: 0.95rem;

    margin-bottom: 0.3rem;
    @media screen and (max-width: 1120px) {
      font-size: ${RemtoVw(REM, 0.95)};
      margin-bottom: ${RemtoVw(REM, 0.3)};
    }
  `;
  const Careerparaphrase = styled.div`
    font-size: 1.1rem;
    color: #7a7b7c;

    vertical-align: top;
    @media screen and (max-width: 1120px) {
      font-size: ${RemtoVw(REM, 1.1)};
    }
  `;
  const Skill = styled.div`
    box-sizing: border-box;
    padding: 0.33rem 1rem;
    background-color: #f0f1f3;
    margin: 0 0.19rem;
    border-radius: 1rem;
    margin-bottom: 0.2rem;
    vertical-align: top;

    @media screen and (max-width: 1120px) {
      padding: ${RemtoVw(REM, 0.33)} ${RemtoVw(REM, 1)};
      border-radius: ${RemtoVw(REM, 1)};
      margin-bottom: ${RemtoVw(REM, 0.2)};
      font-size: ${RemtoVw(REM, 1.1)};
      margin-bottom: ${RemtoVw(REM, 0.6)};
    }
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
      <Intro>
        <CareerTitle>{data.careertitle}</CareerTitle>
        <CareerRole>{data.careerrole}</CareerRole>
        <CareerTerm>{data.careerterm}</CareerTerm>
        <Skills>{skills(data.skills)}</Skills>
        <Careerparaphrase>{data.paraphrase}</Careerparaphrase>
      </Intro>
    </Container>
  );
}
