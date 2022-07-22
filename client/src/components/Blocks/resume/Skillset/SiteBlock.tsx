import styled from 'styled-components';
import { RemtoVw } from '../../../../utils/cssconvert';

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
  flex-wrap: wrap;
  @media screen and (max-width: 1120px) {
    font-size: ${RemtoVw(REM, 1)};
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

const Skill = styled.div`
  box-sizing: border-box;
  padding: 0.33rem 1rem;
  background-color: #f0f1f3;
  margin: 0 0.19rem;
  border-radius: 1rem;
  margin-bottom: 0.2rem;
  @media screen and (max-width: 1120px) {
    padding: ${RemtoVw(REM, 0.33)} ${RemtoVw(REM, 1)};
    border-radius: ${RemtoVw(REM, 1)};
    margin-bottom: ${RemtoVw(REM, 0.2)};
    font-size: ${RemtoVw(REM, 1.1)};
    margin-bottom: ${RemtoVw(REM, 0.6)};
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
      <Intro>{skills(data.arrText?.value)}</Intro>
    </Container>
  );
}
