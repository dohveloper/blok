import React from "react";
import styled from "styled-components";

export const CustomTitle = styled.div`
  font-weight: 600;
  font-size: 32px;
  text-align: center;
  margin-bottom: 70px;
`;

export default function Title() {
  return <CustomTitle>My Account</CustomTitle>;
}
