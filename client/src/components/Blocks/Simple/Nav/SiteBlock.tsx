import styled from 'styled-components';
import { RemtoVw } from '../../../../utils/cssconvert';
import { SiteBlockByType } from '../../../../reducers/HostReducer';
import { useAppSelector } from '../../../../reducers';
import {
  selectBlockById,
  selectBlocks,
} from '../../../../reducers/SiteReducer';
import { SiteBlockProps } from '../../blockValidator';

const NavBarContainer = styled.div<{ font: any; colorSet: any }>`
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
    padding: ${RemtoVw(16, 1.2)} ${RemtoVw(16, 1.6)};
  }
`;

const LogoBox = styled.div<{ style: any }>`
  display: flex;
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
  font-weight: 900;
  font-size: 2rem;
  margin-left: 0.75rem;

  @media screen and (max-width: 1120px) {
    font-size: ${RemtoVw(16, 2)};
    margin-left: ${RemtoVw(16, 0.75)};
  }
`;
const NavTitleses = styled.div`
  font-size: 1rem;
  margin-left: 0.75rem;
  @media screen and (max-width: 1120px) {
    font-size: ${RemtoVw(16, 2)};
    margin-left: ${RemtoVw(16, 0.75)};
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
  margin-right: 1rem;
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
      <LogoBox style={true}>
        {data.image?.src ? (
          <LogoImg src={data.image.src} alt={data.image.alt ?? ''} />
        ) : (
          <ImgDiv style={{ marginRight: '20px' }}>logo</ImgDiv>
        )}
        <LogoTitle>{data.logoText?.value}</LogoTitle>
      </LogoBox>

      <Nav>{NavTitle(NavTitles)}</Nav>
    </NavBarContainer>
  );
}
