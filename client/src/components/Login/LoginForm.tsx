import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  width: 645px;
  height: 698px;
`;

export const MainTitle = styled.div<{ children: React.ReactNode }>`
  text-align: center;
`;

export const Title = styled.div`
  font-weight: 600;
  font-size: 32px;
  line-height: 39px;
  align-items: center;
  text-align: center;
  @media screen and (max-width: 1120px) {
    font-size: 24px;
  }
`;

export const FindPswTitle = styled.div`
  font-weight: 600;
  font-size: 32px;
  line-height: 39px;
  margin-top: 37px;
  margin-bottom: 20px;
  align-items: center;
  text-align: center;
  @media screen and (max-width: 1120px) {
    font-size: 22px;
    font-weight: 700;
  }
`;

export const Input = styled.input<{ error: boolean }>`
  font-size: 20px;

  line-height: 19px;
  width: 100%;
  height: 50px;
  border: ${(props) => (props.error ? '1px solid red' : '1px solid #ececec')};
  box-sizing: border-box;
  padding: 15px 19px;
  border-radius: 5px;
  @media screen and (max-width: 1120px) {
    font-size: 16px;
  }
  @media screen and (max-width: 499px) {
    font-size: 12px;
  }
`;

export const InputTitle = styled.p<{ error: boolean }>`
  font-size: 18px;
  line-height: 20px;
  color: ${(props) => (props.error ? 'red' : '#000000')};

  margin: 0;
  display: flex;
  @media screen and (max-width: 1120px) {
    font-size: 16px;
  }
`;

export const InputDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  margin-bottom: 7px;
`;
export const CheckBoxContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  margin-top: 23px;
`;
export const CheckBox = styled.input`
  cursor: pointer;
  margin-right: 7px;
  + span {
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
  }
`;

export const Button = styled.button`
  border-radius: 5px;
  width: 100%;
  border: none;
  cursor: pointer;
  background: #bababa;
  color: #fff;
  margin: 10;
  height: 50px;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  display: flex;
  align-items: center;
  text-align: center;
  display: inline-block;
  margin: 20px 0;
  transition: all 0.5s;
  :disabled {
    opacity: 0.6;
    :hover {
      background: #bababa;
      color: #fff;
    }
  }

  :hover {
    background: #fff;
    color: #bababa;
  }
  @media screen and (max-width: 1120px) {
    font-size: 16px;
  }
`;

export const KakaoButton = styled.button`
  border-radius: 5px;
  width: 100%;
  border: none;
  cursor: pointer;
  background: #fff;
  color: black;
  position: relative;
  height: 50px;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  display: flex;
  align-items: center;
  text-align: center;
  display: inline-block;
  margin: 14px 0;
  transition: all 0.5s;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  :disabled {
    opacity: 0.4;
    :hover {
      background: #bababa;
      color: #fff;
    }
  }
  & img {
    top: 12px;
    position: absolute;
    left: 11px;
    width: 30px;
  }

  :hover {
    background: #fff;
    color: #bababa;
  }
`;

export const GoogleButton = styled.button`
  border-radius: 5px;
  width: 100%;
  border: none;
  cursor: pointer;
  background: #fff;
  color: black;
  height: 50px;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  display: flex;
  align-items: center;
  text-align: center;
  display: inline-block;
  margin: 14px 0;
  transition: all 0.5s;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  :disabled {
    opacity: 0.4;
    :hover {
      background: #bababa;
      color: #fff;
    }
  }
  & img {
    top: 11px;
    position: absolute;
    left: 11px;
    width: 30px;
  }

  :hover {
    background: #fff;
    color: #bababa;
  }
`;

export const FindPasswordtag = styled.a`
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  align-items: center;
  text-decoration-line: underline;
  color: #000000;
  margin-top: 12px;
  margin-left: auto;
  cursor: pointer;
  :hover {
    color: #2e5cff;
  }
`;

export const Graytext = styled.p`
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: #999999;
`;

export const Text = styled.p`
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: #000000;
  margin: 10px 0;
`;

export const ErrorSpan = styled.span`
  display: inline-block;
  margin-left: auto;
  font-weight: 700;

  font-size: 14px;
  color: red;
`;
export const LoginErrorSpan = styled.span`
  display: inline-block;
  margin-right: auto;
  font-weight: 700;
  font-size: 14px;
  color: red;

  text-decoration: none !important;
`;

export const Atag = styled.a`
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  align-items: center;
  text-decoration-line: underline;
  color: #2e5cff;
  margin-top: 12px;
  margin-left: 3px;
  cursor: pointer;
  :hover {
    text-decoration-line: none;
  }
`;
