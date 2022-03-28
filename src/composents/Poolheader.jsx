import { useContext } from "react";
import { dashBoardContext } from "../contexts/dashboard-context";
import eth from "../images/eth.png";
import eterna from "../images/eterna.jpg";
import bnb from "../images/bnb.svg";

const PoolHeader = ({ pool }) => {
  const { pair, lock } = pool;
  const { refetch } = useContext(dashBoardContext);
  return (
    <header className="flex flex-col-reverse mb-4 sm:flex-row">
      <ul className="w-28 flex">
        <p className="hidden">{refetch}</p>
        {pair.map((t) => (
          <li className="pair rounded-full w-1/2 square">
            <span className="centerXY">
              <img
                src={t === "ETH" ? eth : t === "BNB" ? bnb : eterna}
                alt="logo"
              />
            </span>
          </li>
        ))}
      </ul>
      <span className="lock text-sm flex-1 text-right mb-4 sm:mb-0">
        <span className="bg-black px-4 py-1 rounded-full text-sm">
          {!lock && "Not locked"}
          {lock && `Lock-time: ${lock} days`}
        </span>
      </span>
    </header>
  );
};

export default PoolHeader;
