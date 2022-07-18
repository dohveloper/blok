import React from 'react';
import styled, { keyframes } from 'styled-components';

const CardHeaderLoding = styled.div`
  border: 1px solid #efefef;
  border-radius: 12px;
  width: 100%;
  height: 60px;
  box-sizing: border-box;
`;
const placeholderShimmer = keyframes`
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
`;
const GradientAnimation = styled.div`
  width: 100%;
  animation-duration: 1.25s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: ${placeholderShimmer};
  animation-timing-function: linear;
  background: #ededf8;
  background: linear-gradient(
    to bottom right,
    #edeef2 4%,
    #f5f6f8 18%,
    #edeef2 33%
  );
  background-size: 1000px 1000px;
  height: 100%;
  position: relative;
`;
export default function CardLoading() {
  return (
    <CardHeaderLoding>
      <GradientAnimation />
    </CardHeaderLoding>
  );
}
