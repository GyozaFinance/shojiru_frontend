import styled from "styled-components";

export const ActionButton = styled.button`
  background: linear-gradient(
    270.8deg,
    #00b712 -4.71%,
    #00c868 44.63%,
    #8fff00 103.61%
  );
  cursor: pointer;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem 1rem;
  font-size: 1rem;
  font-weight: 700;

  &:hover {
    background-color: #000;
  }
`;
export const GreenButton = styled.button`
  background: linear-gradient(
    270.8deg,
    #00b712 -4.71%,
    #00c868 44.63%,
    #8fff00 103.61%
  );
  cursor: pointer;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 1rem;
  font-size: 1rem;
  font-weight: 700;

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

export const SmallText = styled.span`
  font-size: 0.7rem;
  font-weight: 300;
`;

export const GradientText = styled.span`
  background: linear-gradient(87.63deg, #fc0707 -45.93%, #ffe600 96.4%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;
