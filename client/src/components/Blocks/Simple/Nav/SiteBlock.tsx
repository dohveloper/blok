import styled from 'styled-components';
import { RemtoVw } from '../../../../utils/cssconvert';
import { SiteBlockByType } from '../../../../reducers/HostReducer';
import { useAppSelector } from '../../../../reducers';
import { selectBlocks } from '../../../../reducers/SiteReducer';
import { SiteBlockProps } from '../../blockValidator';

const NavBarContainer = styled.div<{ font: any; colorSet: any }>`
  margin-top: 8px;
  background-color: ${(props) => props.colorSet.background};
  font-family: ${(props) => props.font};
  color: ${(props) => props.colorSet.primary};
  font-family: 'Roboto';
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3.8rem;
  padding: 1.2rem 1.6rem;
  @media screen and (max-width: 1120px) {
    height: ${RemtoVw(16, 3.8)};
    padding: 32px 32px;
  }
`;

const DefaultLogo = styled.div`
  position: relative;
  bottom: 2px;
  width: 40px;
  height: 40px;
  margin-right: 28px;
`;
const Box1 = styled.div<{ colorSet: any }>`
  position: relative;
  border-radius: 5px;
  width: 32px;
  height: 32px;
  background-color: ${(props) => props.colorSet.secondary};
`;
const Box2 = styled.div<{ colorSet: any }>`
  position: relative;
  bottom: 20px;
  left: 15px;
  border-radius: 5px;
  width: 32px;
  height: 32px;
  background-color: ${(props) => props.colorSet.primary};
`;

const LogoBox = styled.div<{ style: any }>`
  display: flex;
  align-items: center;
`;
const LogoImg = styled.img`
  width: 2.3rem;
  height: 2.3rem;
  @media screen and (max-width: 1120px) {
    width: ${RemtoVw(16, 2.3)};
    height: ${RemtoVw(16, 2.3)};
  }
`;
const LogoTitle = styled.div`
  font-family: 'GangwonEduPower';
  font-weight: 300;
  font-size: 28px;
  letter-spacing: 0.8px;
  color: black;
  user-select: none;
`;
const NavTitleses = styled.div`
  font-size: 16px;
  padding: 8px 0 6px 24px;

  color: #5e5e5e;

  @media screen and (max-width: 1120px) {
    padding: 4px 0 4px 16px;
    font-size: 16px;
    font-weight: 600;
    margin-left: ${RemtoVw(16, 0.75)};
  }
  &:hover {
    cursor: pointer;
  }
`;
const NavTitle = (titles: string | any[]) => {
  const arr = [];
  for (let i = 0; i < titles.length; i++) {
    arr.push(<NavTitleses>{titles[i]}</NavTitleses>);
  }
  return arr;
};
const Nav = styled.div`
  display: flex;
  align-items: center;
`;
export const ImgDiv = styled.div`
  background-color: #efefef;
  width: 2.3rem;
  height: 2.3rem;
  line-height: 2.3rem;
  text-align: center;
  @media screen and (max-width: 1120px) {
    width: ${RemtoVw(16, 2.3)};
    height: ${RemtoVw(16, 2.3)};
  }
`;

export default function SiteBlock(props: SiteBlockProps) {
  const { blockId, type } = props;
  const { colorSet, font, data } = SiteBlockByType({ blockId, type });
  const alldata = useAppSelector((state) => selectBlocks(state));
  const NavTitles: (string | null)[] = [];
  alldata.forEach((res) => {
    if (res.data.navTitle) return NavTitles.push(res.data.navTitle);
  });

  return (
    <NavBarContainer font={font} colorSet={colorSet}>
      <LogoBox style>
        {data.image?.src ? (
          <LogoImg src={data.image.src} alt={data.image.alt ?? ''} />
        ) : (
          <DefaultLogo>
            <Box1 colorSet={colorSet}></Box1>
            <Box2 colorSet={colorSet}></Box2>
          </DefaultLogo>
        )}
        <LogoTitle>{data.logoText?.value}</LogoTitle>
      </LogoBox>

      <Nav>{NavTitle(NavTitles)}</Nav>
    </NavBarContainer>
  );
}
