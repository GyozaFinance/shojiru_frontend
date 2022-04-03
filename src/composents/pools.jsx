import { BigNumber } from "ethers";
import React, { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { dashBoardContext } from "../contexts/dashboard-context";

import useAuth from "../hooks/useAuth";

import { approve } from "../utils/approve";

import { ActionButton, GradientText, SmallText } from "../utils/styled";

import StackingManager from "./stacking-manager";

import { HotAPY } from "./Poolheader";
import { tokensImages } from "../utils/tokens";

const Pools = () => {
  const { active, login } = useAuth();

  const [showModal, setShowmodal] = useState(false);
  const [selectedPool, setSelectedpool] = useState(null);
  const { poolList } = useContext(dashBoardContext);

  return (
    <ul
      id="pools"
      className="mx-auto flex flex-wrap fixedContainer justify-center"
    >
      {poolList.map((pool) => {
        const {
          pair,
          vault,
          allowance,
          apy,
          userDeposited,
          tvl,
          stakedTokenName,
          website,
          stakedToken,
        } = pool;

        return (
          <li className="w-full p-2 relative">
            <div className="box rounded-3xl p-4 bg-blue flex flex-wrap">
              <div className="w-full flex sm:w-1/2 lg:w-1/3">
                <div>
                  <ul className="w-20 flex">
                    {pair.map((t) => (
                      <li className="pair rounded-full w-1/2 square">
                        <span className="centerXY">
                          <img src={tokensImages[t]} alt="logo" />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col justify-center flex-1">
                  <span className="tracking-wider text-md md:text-xl font-bold">
                    {pair.map((token, index) => {
                      return `${token}${index !== 1 ? "-" : ""} `;
                    })}
                    <HotAPY className="hotApy">🔥 APY</HotAPY>
                  </span>
                  <SmallText className="block">
                    {website !== undefined && website}
                  </SmallText>
                </div>
              </div>

              <div className="flex flex-col justify-center font-bold mt-8 w-1/2 sm:w-1/4 sm:mt-0 lg:w-1/6">
                <span className="block">TVL:</span>
                <span>
                  {tvl !== null ? (
                    `${tvl}$`
                  ) : (
                    <span className="relative block pt-2 ml-4">
                      <TailSpin
                        width={10}
                        height={10}
                        className="mt-4 relative"
                      />
                    </span>
                  )}
                </span>
              </div>

              <div className="flex flex-col justify-center font-bold mt-8 w-1/2 sm:w-1/4 sm:mt-0 lg:w-1/6">
                <span className="block">Apy:</span>
                <GradientText>
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
                </GradientText>
              </div>
              <div className="flex flex-col justify-center font-bold mt-8 w-1/2 lg:w-1/6 lg:mt-0">
                <span className="block">Deposited:</span>
                {active && (
                  <div>
                    {userDeposited !== null ? (
                      `${userDeposited} ${
                        stakedTokenName ? stakedTokenName : ""
                      }`
                    ) : (
                      <span className="relative block pt-2 ml-4">
                        <TailSpin
                          width={10}
                          height={10}
                          className="mt-4 relative"
                        />
                      </span>
                    )}
                  </div>
                )}
                {!active && (
                  <SmallText>
                    <GradientText>Disconnected</GradientText>
                  </SmallText>
                )}
              </div>
              <div className="w-1/2 lg:w-1/6 mt-8 lg:mt-0">
                {!active && (
                  <ActionButton
                    className="block mx-auto"
                    onClick={() => login()}
                  >
                    Connect
                  </ActionButton>
                )}
                {allowance !== null && allowance.eq(BigNumber.from(0)) && (
                  <ActionButton
                    onClick={async () => {
                      if (!active) {
                        await login();
                        approve(stakedToken, vault);
                      } else {
                        approve(stakedToken, vault);
                      }
                    }}
                  >
                    Approve Contract
                  </ActionButton>
                )}

                {active && allowance > 0 && (
                  <ActionButton
                    onClick={() => {
                      setSelectedpool(pool);
                      setShowmodal(true);
                    }}
                  >
                    Manage
                  </ActionButton>
                )}
              </div>
            </div>
          </li>
        );
      })}
      {selectedPool && (
        <StackingManager
          pool={selectedPool}
          visible={showModal}
          onClose={() => {
            setShowmodal(false);
            setSelectedpool(null);
          }}
        />
      )}
    </ul>
  );
};

export default Pools;
