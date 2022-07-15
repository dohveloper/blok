import styled from 'styled-components';
import * as icon from '../../icons';
import React, { useState } from 'react';

export const CardHeader = styled.div<{ dropClicked: boolean }>`
  background: #ffffff;
  border: 1px solid #efefef;
  border-radius: ${(props) =>
    props.dropClicked === true ? '12px 12px 0 0' : '12px'};
  position: relative;
  width: 100%;
  height: 64px;
  display: flex;
  padding: 8px 16px;
  box-sizing: border-box;
`;

const CardContainer = styled.div`
  width: 440px;
`;

const CardBoby = styled.div`
  background: #ffffff;
  border: 1px solid #efefef;
  padding: 24px;
  box-sizing: border-box;
  border-radius: 0 0 12px 12px;
  div:first-child {
    margin-top: 0px;
  }
`;

const Movable = styled.img`
  width: 12px;
  height: 20px;
  margin-right: 15px;
  padding: 8px 10px 8px 4px;
  margin: auto 0;
`;

const TitleBox = styled.div`
  font-weight: 600;
  font-size: 20px;
  display: flex;
  margin-left: 4px;
`;

const Title = styled.span`
  margin: auto 0;
  margin-left: 17px;
  padding-top: 2px;
`;

const TitleIcon = styled.img`
  width: 28px;
  height: 28px;
  margin: auto 0;
`;
const Trash = styled.img`
  width: 22px;
  height: 22px;
  position: absolute;
  padding: 10px;
  right: 70px;
  top: 10px;
`;
const Down = styled.img`
  width: 20px;
  height: 12.5px;
  position: absolute;
  padding: 10px;
  right: 22px;
  top: 14px;
`;
type title = 'Footer' | 'Navbar' | 'Profile' | 'Hero' | 'Feature';

interface Cardprops {
  title: title;
  children: any;
}

function Icon(title: title) {
  switch (title) {
    case 'Footer':
      return icon.Footer;
    case 'Navbar':
      return icon.Navbar;
    case 'Profile':
      return icon.User;
    case 'Hero':
      return icon.Hero;
    default:
      return icon.Feature;
  }
}

export const Card = (props: Cardprops) => {
  const [dropClicked, setDropClicked] = useState<boolean>(false);
  return (
    <CardContainer>
      <CardHeader dropClicked={dropClicked}>
        <Movable src={icon.Movable} alt='' />
        <TitleBox>
          <TitleIcon src={Icon(props.title)} alt='' />
          <Title>{props.title}</Title>
        </TitleBox>
        <Trash src={icon.Trash} alt='' />
        <Down
          src={icon.Down}
          alt=''
          onClick={() => {
            setDropClicked((res) => {
              return !res;
            });
          }}
        />
      </CardHeader>
      {dropClicked && <CardBoby>{props.children}</CardBoby>}
    </CardContainer>
  );
};
