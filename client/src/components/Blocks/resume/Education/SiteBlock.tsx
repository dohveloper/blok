import styled from 'styled-components';
import { RemtoVw } from '../../../../utils/cssconvert';
import { useAppSelector } from '../../../../reducers';
import { selectBlockById } from '../../../../reducers/SiteReducer';
import { SiteBlockProps, ColorSet } from '../../blockValidator';

const REM = 16;
const Educationbox = styled.div`
  padding: 1rem 0;

  @media screen and (max-width: 1120px) {
    padding: ${RemtoVw(REM, 1.7)} 0;
  }
`;
const Container = styled.div<{ colorSet: ColorSet; font: string }>`
  background-color: ${(props) => props.colorSet.background};
  font-family: ${(props) => props.font};
  color: ${(props) => props.colorSet.surface};
  display: flex;
  width: 90%;
  padding: 2rem 0;
  margin: 0 auto;
  border-bottom: 1px #7a7b7c solid;
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

export default function SiteBlock(props: SiteBlockProps) {
  const { blockId } = props;
  const { data } = useAppSelector((state) => selectBlockById(state, blockId));
  const colorSet = useAppSelector((state) => state.site.colorSet);
  const font = useAppSelector((state) => state.site.font);

  return (
    <Container font={font} colorSet={colorSet}>
      <Title colorSet={colorSet}>{data.title?.value}</Title>
      <Intro>
        <Educationbox>
          <CareerTitle>{data.leftText?.value}</CareerTitle>
          <CareerRole>{data.rightText?.value}</CareerRole>
          <CareerTerm>{data.caption?.value}</CareerTerm>
        </Educationbox>
      </Intro>
    </Container>
  );
}
