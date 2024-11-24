import React from "react";
import styled, { css } from "styled-components";

const buttonVariants = css`
  ${(props) =>
    props.variant === "primary" &&
    css`
      border: none;
      font-size: 16px;
      font-weight: 400;
      color: #ffffff;
      line-height: 18px;
      background-color: #0072bc;
    `}
  ${(props) =>
    props.variant === "form" &&
    css`
      border: none;
      font-size: 16px;
      font-weight: 400;
      color: #ffffff;
      line-height: 18px;
      background-color: #0072bc;
      padding: 10px 40px;
     
    `}
 ${(props) =>
    props.variant === "formClear" &&
    css`
    border: none;
      font-size: 16px;
      font-weight: 400;
      color: #000;
      line-height: 18px;
      background-color: #ffffff;
    
    `}
  ${(props) =>
    props.variant === "secondary" &&
    css`
      border: 1px solid #a8a8a8;
      font-size: 16px;
      font-weight: 400;
      color: #0072bc;
      line-height: 18px;
      background-color: #ffffff;
    `}
  ${(props) =>
    props.variant === "filter" &&
    css`
      border: 1px solid #ecf6fc;
      font-size: 16px;
      font-weight: 400;
      color: #0072bc;
      line-height: 18px;
      background-color: #ecf6fc;
    `}
  ${(props) =>
    props.variant === "reset" &&
    css`
      border: 1px solid #0072bc;
      font-size: 16px;
      font-weight: 400;
      color: #0072bc;
      line-height: 18px;
      background-color: #fff;
    `}
  ${(props) =>
    props.variant === "red" &&
    css`
      border: none;
      font-size: 16px;
      font-weight: 400;
      color: #ffffff;
      padding: 10px;
      line-height: 18px;
      background-color: red;
    `}
`;

const disabledStyles = css`
  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `}
`;

const ButtonContainer = styled.button`
  padding: 10px 20px;
  text-align: center;
  font-family: "Inter", "sans-serif";
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  ${buttonVariants}
  ${disabledStyles}
`;

export const StyledButton = ({ name, variant, color, onClick, disabled }) => {
  return (
    <ButtonContainer
      variant={variant}
      color={color}
      disabled={disabled}
      onClick={onClick}
    >
      {name}
    </ButtonContainer>
  );
};
