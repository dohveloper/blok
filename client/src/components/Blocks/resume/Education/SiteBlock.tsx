import styled from 'styled-components';
import { RemtoVw } from '../../../../utils/cssconvert';

const REM = 16;

SiteBlock.defaultProps = {
  data: {
    title: '학력',
    educationtitle: '엘리스 대학교',
    role: '프론트 엔드 비전공 (학사)',
    term: '2022년 4월 ~ 2022년 7월',
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
  const Educationbox = styled.div`
    padding: 1.7rem 1.7rem;
    border-bottom: 1px #7a7b7c solid;
    @media screen and (max-width: 1120px) {
      padding: ${RemtoVw(REM, 1.7)} ${RemtoVw(REM, 1.7)};
    }
  `;
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
    div:not(:first-child) {
      border: none;
    }
    div:first-child {
      padding-top: 0;
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

    @media screen and (max-width: 1120px) {
      font-size: ${RemtoVw(REM, 0.95)};
    }
  `;
  const CareerRole = styled.div`
    font-size: 0.95rem;
    color: #7a7b7c;
    margin-bottom: 0.3rem;
    @media screen and (max-width: 1120px) {
      font-size: ${RemtoVw(REM, 0.95)};
      margin-bottom: ${RemtoVw(REM, 0.3)};
    }
  `;

  const data = props.data;
  console.log(props);
  return (
    <Container>
      <Title>{data.title}</Title>
      <Intro>
        <Educationbox>
          <CareerTitle>{data.educationtitle}</CareerTitle>
          <CareerRole>{data.role}</CareerRole>
          <CareerTerm>{data.term}</CareerTerm>
        </Educationbox>
        <Educationbox>
          <CareerTitle>{data.educationtitle}</CareerTitle>
          <CareerRole>{data.role}</CareerRole>
          <CareerTerm>{data.term}</CareerTerm>
        </Educationbox>
      </Intro>
    </Container>
  );
}
