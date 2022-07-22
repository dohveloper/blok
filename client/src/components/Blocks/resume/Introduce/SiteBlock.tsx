import styled from 'styled-components';
import { RemtoVw } from '../../../../utils/cssconvert';
import { SiteBlockProps, ColorSet } from '../../blockValidator';
import { SiteBlockByType } from '../../../../reducers/HostReducer';

const REM = 16;
const Container = styled.div<{ colorSet: ColorSet; font: string }>`
  background-color: #fff;
  font-family: ${(props) => props.font};
  color: ${(props) => props.colorSet.surface};
  font-family: 'Roboto';

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

export default function SiteBlock(props: SiteBlockProps) {
  const { blockId, type } = props;
  const { colorSet, font, data } = SiteBlockByType({ blockId, type });

  return (
    <Container colorSet={colorSet} font={font}>
      <Title colorSet={colorSet}>{data.title?.value}</Title>
      <Intro>{data.body?.value}</Intro>
    </Container>
  );
}
