import styled from "styled-components";

export const BlueButton = styled.button`
  position: relative;

  padding: 10px 16px;
  border: 0;

  font-size: 14px;
  width: 100%;
  max-width: 15rem;
  font-weight: 500;
  color: #fff;
  background-color: #0060f8;
  cursor: pointer;
  outline: none;
  border-radius: 30px;
  transition: background-color 0.2s ease 0s;
  font-weight: bold;
  transition: all 500ms;
  &:hover {
    background-color: #000;
  }
`;

export const TransparentButton = styled.button`
  position: relative;

  padding: 10px 16px;
  border: 0;
  font-size: 14px;
  width: 100%;
  color: #666;
  font-weight: 500;
  border: 1px solid #000;
  cursor: pointer;
  outline: none;
  border-radius: 30px;
  transition: background-color 0.2s ease 0s;
  font-weight: bold;
  transition: all 500ms;
  max-width: 15rem;
  &:hover {
    color: #fff;
    background-color: #000;
    border-color: transparent;
  }
`;
