import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../reducers';
import { SiteBlockProps, ColorSet } from '../../blockValidator';
import { selectBlockById } from '../../../../reducers/SiteReducer';
import { SiteBlockByType } from '../../../../reducers/HostReducer';

const Container = styled.div<{ colorSet: ColorSet; font: string }>`
  background-color: ${(props) => props.colorSet.background};
  font-family: ${(props) => props.font};
  color: ${(props) => props.colorSet.surface};

  height: 50px;
  background-color: ${(props) => props.colorSet.background};
  font-family: ${(props) => props.font};
  color: ${(props) => props.colorSet.surface};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  margin: 0 auto;
  margin-top: 80px;
  max-width: 940px;
  @media screen and (max-width: 1120px) {
    font-size: 1.5vw;
    padding: 0 20px;
  }
`;

export default function SiteBlock(props: SiteBlockProps) {
  const { blockId, type } = props;
  const { colorSet, font, data } = SiteBlockByType({ blockId, type });

  return (
    <>
      <Container
        colorSet={colorSet}
        font={font}
        id={data.navTitle !== null ? data.navTitle : ''}
      >
        <p>{data.leftText?.value}</p>
        <p>{data.rightText?.value}</p>
      </Container>
    </>
  );
}
