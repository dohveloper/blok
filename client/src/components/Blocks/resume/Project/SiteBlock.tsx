import styled from 'styled-components';
import { RemtoVw } from '../../../../utils/cssconvert';
import { LinkTag } from '../../../../icons';
import { SiteBlockProps, ColorSet } from '../../blockValidator';
import { SiteBlockByType } from '../../../../reducers/HostReducer';

const REM = 16;
const Container = styled.div<{ colorSet: ColorSet; font: string }>`
  background-color: #fff;
  font-family: ${(props) => props.font};
  color: ${(props) => props.colorSet.surface};
  display: flex;
  width: 90%;
  padding: 3rem 0;
  margin: 0 auto;
  border-bottom: 1px solid black;
  font-size: ${REM}px;
  box-sizing: border-box;
  @media screen and (max-width: 1120px) {
    padding: ${RemtoVw(REM, 3)} 0;
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
  flex-wrap: wrap;
  @media screen and (max-width: 1120px) {
    margin-bottom: ${RemtoVw(REM, 0.6)};
  }
`;
const Title = styled.span<{ colorSet: ColorSet }>`
  font-weight: 700;
  font-size: 1.1rem;
  margin-left: 1rem;
  color: ${(props) => props.colorSet.primary};
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

const Link = styled.a`
  font-size: 1.3rem;
  color: #7a7b7c;
  text-decoration: none;
  vertical-align: top;
  margin-top: 1rem;
  display: flex;

  align-items: center;
  cursor: pointer;
  transition: color 0.4s;
  @media screen and (max-width: 1120px) {
    font-size: ${RemtoVw(REM, 1.3)};
  }
  :hover {
    color: skyblue;
  }
`;

const LinkImg = styled.img`
  width: 1rem;
  height: 1rem;
  margin-right: 1rem;
  @media screen and (max-width: 1120px) {
    width: ${RemtoVw(REM, 1)};
    height: ${RemtoVw(REM, 1)};
    margin-right: ${RemtoVw(REM, 1)};
  }
`;
export default function SiteBlock(props: SiteBlockProps) {
  const { blockId, type } = props;
  const { colorSet, font, data } = SiteBlockByType({ blockId, type });

  const skills = (data: any) => {
    const arr = [];
    if (!data) return;
    for (let i = 0; i < data.length; i++) {
      arr.push(<Skill>{data[i]}</Skill>);
    }
    return arr;
  };

  return (
    <Container colorSet={colorSet} font={font}>
      <Title colorSet={colorSet}>{data.title?.value}</Title>
      <Intro>
        <CareerTitle>{data.leftText?.value}</CareerTitle>
        <CareerRole>{data.rightText?.value}</CareerRole>
        <CareerTerm>{data.caption?.value}</CareerTerm>
        <Skills>{skills(data.arrText?.value)}</Skills>
        <Careerparaphrase>{data.body?.value}</Careerparaphrase>
        {data.button?.url && (
          <Link href={data.button?.url} target='_blank'>
            <LinkImg src={LinkTag} />
            {data.button?.url}
          </Link>
        )}
      </Intro>
    </Container>
  );
}
