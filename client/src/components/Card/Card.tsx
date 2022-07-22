import styled, { css } from 'styled-components';
import * as icon from '../../icons';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleCardState } from '../../reducers/SiteReducer';

export const CardHeader = styled.div<{ isOpened: boolean }>`
  background: #ffffff;
  border: 1px solid #efefef;
  border-radius: ${(props) =>
    props.isOpened === true ? '12px 12px 0 0' : '12px'};
  position: relative;
  width: 100%;
  height: 60px;
  display: flex;
  padding: 0px 24px;
  box-sizing: border-box;
  & * {
    user-select: none;
    user-drag: none;
  }
`;

const CardContainer = styled.div`
  width: 100%;
`;

const CardBoby = styled.div<{ isOpened: boolean }>`
  background: #ffffff;
  border: 1px solid #efefef;
  border-top: none;
  padding: 24px;
  box-sizing: border-box;
  border-radius: 0 0 12px 12px;
  div:first-child {
    margin-top: 0px;
  }
`;

const HeaderIcon = styled.img<{ pinned: boolean }>`
  width: 22px;
  height: 22px;
  margin: auto 0;
  &:hover {
    cursor: ${(props) => (props.pinned ? 'not-allowed' : 'grab')};
  }
  &:active {
    cursor: ${(props) => (props.pinned ? 'not-allowed' : 'grabbing')};
  }
`;

const TitleBox = styled.div`
  font-weight: 600;
  font-size: 18px;
  display: flex;
  margin-left: 20px;
`;

const Title = styled.span`
  margin: auto 0;
  margin-left: 16px;
  padding-top: 2px;
`;

const TitleIcon = styled.img`
  width: 24px;
  height: 24px;
  margin: auto 0;
`;
const Trash = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  padding: 10px;
  right: 64px;
  top: 9px;
  transition: opacity 0.3s;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;
const Down = styled.img<{ isOpened: boolean }>`
  width: 20px;
  height: 20px;
  position: absolute;
  padding: 10px;
  right: 22px;
  top: 9px;
  transition: transform 0.4s;
  &:hover {
    cursor: pointer;
  }
  ${(props) =>
    props.isOpened &&
    css`
      transform: rotate(180deg);
    `}
`;

interface Cardprops {
  title: string;
  children: any;
  pinned?: boolean;
  icon?: string;
  onRemove: (event: React.MouseEvent<HTMLElement>) => void;
  isCardOpened?: boolean;
  blockId?: string;
}

export const Card = (props: Cardprops) => {
  const dispatch = useDispatch();
  const isCardOpened = props.isCardOpened ?? false;
  return (
    <CardContainer>
      <CardHeader isOpened={isCardOpened}>
        <HeaderIcon
          pinned={props.pinned ? true : false}
          src={props.pinned ? icon.Pin : icon.Movable}
          alt=''
        />
        <TitleBox>
          <TitleIcon src={props.icon} alt='' />
          <Title>{props.title}</Title>
        </TitleBox>
        <Trash src={icon.Trash} alt='' onClick={props.onRemove} />
        <Down
          src={icon.Down}
          alt=''
          isOpened={isCardOpened}
          onClick={() => {
            dispatch(toggleCardState(props.blockId ?? ''));
          }}
        />
      </CardHeader>
      {isCardOpened && (
        <CardBoby isOpened={isCardOpened}>{props.children}</CardBoby>
      )}
    </CardContainer>
  );
};
