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

export const Title = styled.div`
  font-weight: 600;
  font-size: 32px;
  line-height: 39px;
  align-items: center;
  text-align: center;
`;

export const Input = styled.input`
  font-size: 20px;
  font-size: 16px;
  line-height: 19px;
  width: 501px;
  height: 50px;
  border: 1px solid #ececec;
  box-sizing: border-box;
  padding: 15px 19px;
  border-radius: 5px;
`;

export const InputTitle = styled.p`
  font-size: 20px;
  line-height: 24px;
  color: #000000;
  margin-top: 16px;
  margin-bottom: 7px;
`;

export const InputDiv = styled.div`
  width: 100%;
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
  margin: 25px 0;
  transition: all 0.5s;
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
    color: blue;
  }
`;

interface InputBoxProps {
  title?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  value: string;
}

export const InputBox: React.FC<InputBoxProps> = ({
  title,
  handleChange,
  value,
  placeholder,
  type,
}) => {
  return (
    <InputDiv>
      {title && <InputTitle>{title}</InputTitle>}
      <Input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => handleChange(event)}
      />
    </InputDiv>
  );
};
