import styled from "styled-components";
import { tokensImages } from "../utils/tokens";

export const HotAPY = styled.span`
  background: linear-gradient(87.63deg, #fc0707 -45.93%, #ffe600 96.4%);
  font-size: 0.7rem;
  padding: 0.3em 1em;
  border-radius: 10px;
  color: #000;:
`;
const PoolHeader = ({ pool }) => {
  const { pair, lock } = pool;

  return (
    <div className="flex flex-col-reverse mb-4 sm:flex-row w-full">
      <ul className="w-20 flex">
        {pair.map((t) => (
          <li className="pair rounded-full w-1/2 square">
            <span className="centerXY">
              <img src={tokensImages[t]} alt="logo" />
            </span>
          </li>
        ))}
      </ul>
      <HotAPY className="top0 right0 absolute  mt-3 mr-4 hotApy">🔥 APY</HotAPY>
    </div>
  );
};

export default PoolHeader;
