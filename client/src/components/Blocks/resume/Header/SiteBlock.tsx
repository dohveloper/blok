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

  const Title = styled.div`
    font-weight: 700;
    font-size: 3rem;
    margin-left: 1rem;
    color: ${colorSet.primary && '#fff'};
    @media screen and (max-width: 1120px) {
      font-size: ${RemtoVw(REM, 2)};
      margin-left: ${RemtoVw(REM, 0.75)};
    }
  `;

  return (
    <Container>
      <Title>{data.title?.value}</Title>
    </Container>
  );
}
