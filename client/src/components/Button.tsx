import React from "react";
import styled, { css } from "styled-components";
import { darken, lighten } from "polished";

interface IProps {
  theme: any;
  color: string;
  size: string;
  fullWidth: boolean;
  rounding: boolean;
  outline: boolean;
  onClick: () => void;
  className: string;
  type: "button" | "submit" | "reset";
  disabled: boolean;
}

const colorStyles = css`
  ${(props: IProps) => {
    const selected = props.theme.palette[props.color];
    const bgcolor = props.color;
    return css`
      color: ${bgcolor === "white" ? "black" : "white"};
      border: ${bgcolor === "white" ? "1px solid #D9D9D9" : "1px solid white"};
      background-color: ${selected};
      &:hover {
        background: ${lighten(0.1, selected)};
      }
      &:active {
        background: ${darken(0.1, selected)};
      }

      ${(props: IProps) =>
        props.outline &&
        css`
          color: ${selected};
          background: none;
          border: 1px solid ${selected};
          &:hover {
            background: ${selected};
            color: white;
          }
        `}
    `;
  }}
`;

const sizeStyles = css`
  ${(props: IProps) =>
    props.size === "large" &&
    css`
      height: 3rem;

      font-size: 1rem;
    `}

  ${(props: IProps) =>
    props.size === "medium" &&
    css`
      height: 2.25rem;
      font-size: 0.8rem;
    `}

  ${(props: IProps) =>
    props.size === "small" &&
    css`
      height: 1.75rem;
      font-size: 0.7rem;
    `}
`;

const fullWidthStyle = css`
  ${(props: IProps) =>
    props.fullWidth &&
    css`
      width: 100%;
      justify-content: center;
      & + & {
        margin-left: 0;
        margin-top: 0.5rem;
      }
    `}
`;

const borderStyle = css`
  ${(props: IProps) =>
    props.rounding &&
    css`
      border-radius: 50px;
    `}
`;

const StyledButton = styled.button`
  /* 공통 스타일 */
  display: inline-flex;
  align-items: center;
  color: white;
  outline: none;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  padding: 0 1rem;

  /* 크기 */
  ${sizeStyles}

  /* 색상 */
  ${colorStyles}

  /* 둥근 스타일 */
  ${borderStyle}
  
  
  /* 기타 */
  & + & {
    margin-left: 0.5rem;
  }

  /* fullWidth */
  ${fullWidthStyle}
`;

type ButtonProps = {
  children: React.ReactNode;
  color: string;
  size: string;
  fullWidth: boolean;
  rounding: boolean;
  outline: boolean;
  onClick: () => void;
  className: string;
  type: "button" | "submit" | "reset";
  disabled: boolean;
};

Button.defaultProps = {
  color: "black",
  size: "small",
  fullWidth: false,
  rounding: false,
  outline: false,
  onClick: () => {
    console.log("click");
  },
  className: "",
  type: "button",
  disabled: false,
};

export default function Button({
  children,
  color,
  size,
  fullWidth,
  rounding,
  outline,
  className,
  type,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <StyledButton
      color={color}
      size={size}
      fullWidth={fullWidth}
      rounding={rounding}
      outline={outline}
      type={type}
      className={className}
      disabled={disabled}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}

// *** 버튼 컴포넌트 사용 예시 - 추후 삭제 예정 ***
const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 3rem;

  .buttonGroup {
    margin-top: 15px;
  }
`;

export function ButtonContainer() {
  return (
    <ButtonBox>
      <div className="buttonGroup">
        <Button color="black" size="small" outline>
          Button
        </Button>
        <Button color="black" size="small">
          Button
        </Button>
        <Button color="gray" size="small">
          Button
        </Button>
        <Button color="white" size="small">
          Button
        </Button>
      </div>
      <div className="buttonGroup">
        <Button color="black" size="small" rounding outline>
          Button
        </Button>
        <Button color="black" size="small" rounding>
          Button
        </Button>
        <Button color="gray" size="small" rounding>
          Button
        </Button>
        <Button color="white" size="small" rounding>
          Button
        </Button>
      </div>
      <div className="buttonGroup">
        <Button color="black" size="medium" outline rounding>
          Button
        </Button>
        <Button color="black" size="medium" rounding>
          Button
        </Button>
        <Button color="gray" size="medium" rounding>
          Button
        </Button>
        <Button color="white" size="medium" rounding>
          Button
        </Button>
      </div>
      <div className="buttonGroup">
        <Button color="black" size="medium" outline>
          Button
        </Button>
        <Button color="black" size="medium">
          Button
        </Button>
        <Button color="gray" size="medium">
          Button
        </Button>
        <Button color="white" size="medium">
          Button
        </Button>
      </div>
      <div className="buttonGroup">
        <Button color="black" size="large" outline rounding>
          Button
        </Button>
        <Button color="black" size="large" rounding>
          Button
        </Button>
        <Button color="gray" size="large" rounding>
          Button
        </Button>
        <Button color="white" size="large" rounding>
          Button
        </Button>
      </div>
      <div className="buttonGroup">
        <Button color="black" size="large" outline>
          Button
        </Button>
        <Button color="black" size="large">
          Button
        </Button>
        <Button color="gray" size="large">
          Button
        </Button>
        <Button color="white" size="large">
          Button
        </Button>
      </div>
      <div className="buttonGroup">
        <Button color="black" size="large" outline fullWidth>
          와이드한 버튼
        </Button>
        <Button color="black" size="large" fullWidth>
          와이드한 버튼
        </Button>
      </div>
    </ButtonBox>
  );
}
