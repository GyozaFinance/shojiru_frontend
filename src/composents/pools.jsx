import { BigNumber } from "ethers";
import React, { useContext, useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { dashBoardContext } from "../contexts/dashboard-context";
import { web3Context } from "../contexts/web3-modal-context";
import useAuth from "../hooks/useAuth";
import useWeb3 from "../hooks/useWeb3";
import { approve } from "../utils/approve";

import { BlueButton } from "../utils/styled";

import StackingManager from "./stacking-manager";

import ProgressBar from "./ProgressBar";
import PoolHeader from "./Poolheader";

const Pools = () => {
  const { contract, ERC20Name } = useContext(dashBoardContext);

  const { active, account, login, logout, web3 } = useAuth();

  const { poolList } = useContext(dashBoardContext);

  return (
    <ul
      id="pools"
      className="mx-auto flex flex-wrap fixedContainer justify-center"
    >
      {/*<strong className="warning block w-full text-md w-full text-center">
        ⚠️ If you unstake before the lock period, you pay 50% of your tokens. ⚠️
  </strong>*/}
      {poolList.map((pool) => {
        const {
          pair,
          lock,
          vault,
          allowance,
          apy,
          userDeposited,
          userInfo,
          progress,
        } = pool;

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
                        <TailSpin
                          width={10}
                          height={10}
                          className="mt-4 relative"
                        />
                      </span>
                    )}
                  </li>
                  {active && userInfo && (
                    <li className="flex">
                      Deposit:{" "}
                      {`${userDeposited} ${ERC20Name ? ERC20Name : ""}`}
                    </li>
                  )}
                </ul>
                <div className="buttons w-full sm:w-4/12 mt-8 flex justify-end w-full">
                  {!active && (
                    <BlueButton
                      className="block mx-auto"
                      onClick={() => login()}
                    >
                      Connect wallet
                    </BlueButton>
                  )}
                  {allowance !== null && allowance.eq(BigNumber.from(0)) && (
                    <BlueButton
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
                    </BlueButton>
                  )}
                  {active && allowance > 0 && <StackingManager pool={pool} />}
                </div>
                {progress !== null && (
                  <React.StrictMode>
                    <strong className="mt-4">Your lock progression: </strong>
                    <ProgressBar progress={pool.progress} bgcolor={"#0060f8"} />
                  </React.StrictMode>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Pools;
