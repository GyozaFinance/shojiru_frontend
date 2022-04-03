import { BigNumber } from "ethers";
import { useContext } from "react";
import { TailSpin } from "react-loader-spinner";

import { dashBoardContext } from "../contexts/dashboard-context";
import useAuth from "../hooks/useAuth";
import { approve } from "../utils/approve";
import { ActionButton } from "../utils/styled";
import PoolHeader from "./Poolheader";
import StackingManager from "./stacking-manager";

const PoolCard = ({ pool }) => {
  const { vault, allowance, apy, userDeposited, userInfo } = pool;

  const { active, login } = useAuth();
  const { contract, ERC20Name } = useContext(dashBoardContext);
  return (
    <li className="w-full md:w-1/2 p-4">
      <div className="box rounded-3xl p-8">
        <PoolHeader pool={pool} />
        <div className="flex flex-wrap">
          <ul className="mt-8 infos w-full sm:w-8/12 playFair">
            <li className="flex text-bold text-black">
              Apy:{" "}
              {apy !== null ? (
                `${apy} %`
              ) : (
                <span className="relative block pt-2 ml-4">
                  <TailSpin width={10} height={10} className="mt-4 relative" />
                </span>
              )}
            </li>
            {active && userInfo && (
              <li className="flex">
                Deposit: {`${userDeposited} ${ERC20Name ? ERC20Name : ""}`}
              </li>
            )}
          </ul>
          <div className="buttons w-full sm:w-4/12 mt-8 flex justify-end w-full">
            {!active && (
              <ActionButton className="block mx-auto" onClick={() => login()}>
                Connect wallet
              </ActionButton>
            )}
            {allowance !== null && allowance.eq(BigNumber.from(0)) && (
              <ActionButton
                onClick={async () => {
                  if (!active) {
                    await login();
                    approve(contract, vault);
                  } else {
                    approve(contract, vault);
                  }
                }}
              >
                Approve Contract
              </ActionButton>
            )}
            {active && allowance > 0 && <StackingManager pool={pool} />}
          </div>
        </div>
      </div>
    </li>
  );
};
export default PoolCard;
