import styled from 'styled-components';
import { RemtoVw } from '../../../../utils/cssconvert';
import { useAppSelector } from '../../../../reducers';
import { selectBlockById } from '../../../../reducers/SiteReducer';
import { SiteBlockProps } from '../../blockValidator';
export default function SiteBlock(props: SiteBlockProps) {
  const { blockId } = props;
  const { data } = useAppSelector((state) => selectBlockById(state, blockId));
  const colorSet = useAppSelector((state) => state.site.colorSet);
  const font = useAppSelector((state) => state.site.font);

  const NavBarContainer = styled.div`
    background-color: ${colorSet.background};
    font-family: ${font};
    color: ${colorSet.surface};
    font-family: 'Roboto';
    background-color: #ffffff;
    display: flex;
    align-items: center;
    height: 3.8rem;
    padding: 1.2rem 1.6rem;
    @media screen and (max-width: 1120px) {
      height: ${RemtoVw(16, 3.8)};
      padding: ${RemtoVw(16, 1.2)} ${RemtoVw(16, 1.6)};
    }
  `;

  const LogoBox = styled.div`
    display: flex;
  `;
  const LogoImg = styled.img`
    width: 2rem;
    height: 2rem;
    @media screen and (max-width: 1120px) {
      width: ${RemtoVw(16, 2)};
      height: ${RemtoVw(16, 2)};
    }
  `;
  const LogoTitle = styled.div`
    font-weight: 900;
    font-size: 2rem;
    margin-left: 0.75rem;
    font-family: ${font};
    @media screen and (max-width: 1120px) {
      font-size: ${RemtoVw(16, 2)};
      margin-left: ${RemtoVw(16, 0.75)};
    }
  `;

  return (
    <NavBarContainer>
      <LogoBox>
        <LogoImg src={data.logoImage?.src} alt={data.logoImage?.alt} />
        <LogoTitle>{data.logoText?.value}</LogoTitle>
      </LogoBox>
      {data.navTitle}
    </NavBarContainer>
  );
}
