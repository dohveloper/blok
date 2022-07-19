import styled from 'styled-components';
import { RemtoVw } from '../../../../utils/cssconvert';
export default function SiteBlock(props: any) {
  const NavBarContainer = styled.div`
    background-color: ${props.colorSet.background};
    font-family: ${props.font};
    color: ${props.colorSet.surface};
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
    color: #000000;
    @media screen and (max-width: 1120px) {
      font-size: ${RemtoVw(16, 2)};
      margin-left: ${RemtoVw(16, 0.75)};
    }
  `;

  return (
    <NavBarContainer>
      <LogoBox>
        <LogoImg
          src={props.data.logoImage.src}
          alt={props.data.logoText.value}
        />
        <LogoTitle>{props.data.navTitle}</LogoTitle>
      </LogoBox>
      {props.data.logoText.value}
    </NavBarContainer>
  );
}
