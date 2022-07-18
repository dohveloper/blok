import React from 'react';

export const createButtonSylte = (
  styles?: React.CSSProperties
): React.CSSProperties => ({
  padding: 20,
  borderRadius: 5,
  border: 'none',
  cursor: 'pointer',
  fontSize: 25,
  fontWeight: 700,
  background: '#BABABA',
  color: '#fff',
  margin: 10,
  ...styles,
});

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  styles?: React.CSSProperties;
  handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const buttonStyles = createButtonSylte(props.styles);
  return (
    <button
      style={buttonStyles}
      onClick={(event) => props.handleClick(event)}
      {...props}
    >
      {props.children}
    </button>
  );
};
