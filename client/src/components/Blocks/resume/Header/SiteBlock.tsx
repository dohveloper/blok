import styled from 'styled-components';
import { RemtoVw } from '../../../../utils/cssconvert';
import { useAppSelector } from '../../../../reducers';
import { selectBlocks } from '../../../../reducers/SiteReducer';
import { SiteBlockProps, ColorSet } from '../../blockValidator';
import { SiteBlockByType } from '../../../../reducers/HostReducer';

const REM = 16;

const Container = styled.div<{
  colorSet: ColorSet;
  font: string;
  paddingNumber: number;
}>`
  background-color: ${(props) => props.colorSet.primary};
  font-family: ${(props) => props.font};
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: ${(props) =>
    props.paddingNumber ? `${props.paddingNumber}rem 4rem` : '0 4rem'};
  font-size: ${REM}px;
  box-sizing: border-box;
  @media screen and (max-width: 1120px) {
    height: ${RemtoVw(REM, 3.8)};
    padding: ${RemtoVw(REM, 7)} ${RemtoVw(REM, 4)};
  }
`;

const Title = styled.div<{ colorSet: ColorSet }>`
  font-weight: 700;
  font-size: 2rem;
  margin-left: 0.75rem;
  color: ${(props) => props.colorSet.background};
  @media screen and (max-width: 1120px) {
    font-size: ${RemtoVw(REM, 2)};
    margin-left: ${RemtoVw(REM, 0.75)};
  }
`;
const NavTitles = styled.div<{ colorSet: ColorSet }>`
  font-size: 1rem;
  margin-left: 0.75rem;
  color: ${(props) => props.colorSet.background};
  @media screen and (max-width: 1120px) {
    font-size: ${RemtoVw(16, 2)};
    margin-left: ${RemtoVw(16, 0.75)};
  }
`;
const NavTitle = (titles: string | any[], colorSet: ColorSet) => {
  const arr = [];
  for (let i = 0; i < titles.length; i++) {
    arr.push(
      <NavTitles key={titles[i]} colorSet={colorSet}>
        {titles[i]}
      </NavTitles>
    );
  }
  return arr;
};
const Nav = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
`;
export default function SiteBlock(props: SiteBlockProps) {
  const { blockId, type } = props;
  const { colorSet, font, data } = SiteBlockByType({ blockId, type });

  const alldata = useAppSelector((state) => selectBlocks(state));
  const NavTitles: (string | null)[] = [];
  alldata.forEach((res) => {
    if (res.data.navTitle) return NavTitles.push(res.data.navTitle);
  });
  console.log(data);
  return (
    <Container
      colorSet={colorSet}
      font={font}
      paddingNumber={data.number?.value}
    >
      <Title colorSet={colorSet}>{data.title?.value}</Title>
      <Nav>{NavTitle(NavTitles, colorSet)}</Nav>
    </Container>
  );
}
