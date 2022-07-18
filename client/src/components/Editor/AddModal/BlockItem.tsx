import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  width: 100%;
  min-height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.12);
  border-radius: 16px;
  transition: background 0.2s;
  &:hover {
    cursor: pointer;
    background: #efefef;
  }
  &:active {
    box-shadow: none;
    transform: scale(0.99);
  }
  user-select: none;
  & img {
    user-drag: none;
  }
`;
const Icon = styled.img`
  width: 64px;
  height: 64px;
`;
const Label = styled.p`
  font-weight: 700;
  font-size: 18px;
  margin: 16px 0 0 0;
`;

interface BlockItemProps {
  icon: string;
  label: string;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}
export default function BlockItem(props: BlockItemProps) {
  const { icon, label, onClick } = props;
  return (
    <Card onClick={onClick}>
      <Icon src={icon} alt={icon} />
      <Label>{label}</Label>
    </Card>
  );
}
