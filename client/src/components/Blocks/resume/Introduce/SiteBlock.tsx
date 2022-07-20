import styled from 'styled-components';
import { RemtoVw } from '../../../../utils/cssconvert';
import { useAppSelector } from '../../../../reducers';
import { selectBlockById } from '../../../../reducers/SiteReducer';
import { SiteBlockProps } from '../../blockValidator';

const REM = 16;
export default function SiteBlock(props: SiteBlockProps) {
  const { blockId } = props;
  const { data } = useAppSelector((state) => selectBlockById(state, blockId));
  const colorSet = useAppSelector((state) => state.site.colorSet);
  const font = useAppSelector((state) => state.site.font);

  const Container = styled.div`
    background-color: ${colorSet.background};
    font-family: ${font};
    color: ${colorSet.surface};
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

  return (
    <Container>
      <Title>{data.title?.value}</Title>
      <Intro>{data.body?.value}</Intro>
    </Container>
  );
}
