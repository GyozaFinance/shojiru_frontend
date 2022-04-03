import { useContext } from "react";
import { dashBoardContext } from "../contexts/dashboard-context";
import PoolCard from "./PoolCard";
import hotfamrs from "../icons/hot_farms.svg";
import StackingManager from "./stacking-manager";
import useAuth from "../hooks/useAuth";
import PoolHeader from "./Poolheader";
import { TailSpin } from "react-loader-spinner";
import { GradientText, SmallText } from "../utils/styled";

import styled from "styled-components";

export const RoundedGradientMask = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 1.5rem;
    padding: 3px;
    background: linear-gradient(87.63deg, #fc0707 -45.93%, #ffe600 96.4%);
    -webkit-mask: linear-gradient(#0b1d4d 0 0) content-box,
      linear-gradient(#0b1d4d 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`;
const PoolInfos = styled.ul`
  display: flex;
  flex-wrap: wrap;
  > * {
    width: 50%;
    &:nth-child(2n-1) {
      text-align: left;
    }
    &:nth-child(2n) {
      text-align: right;
    }
  }
`;
const HotPools = () => {
  const { poolList } = useContext(dashBoardContext);
  const { active } = useAuth();

  return (
    <div className="fixedSmallContainer mx-auto">
      <h2 className="flex p-4">
        <img src={hotfamrs} alt="unicorn" />
      </h2>
      <ul
        id="hotPools"
        className="mx-auto flex flex-wrap fixedContainer justify-center"
      >
        {poolList
          .filter(({ vault }) =>
            [
              // Pool vault address (show on pools.js)
              "0xE714F8245976440f67d92BFC63c50692B6d2D5D0",
            ].includes(vault.address)
          )
          .map((pool) => {
            const { pair, apy, userDeposited, website, tvl, stakedTokenName } =
              pool;
            return (
              <li className="w-full md:w-1/3 p-4">
                <div className="relative rounded-3xl overflow-hidden">
                  <RoundedGradientMask className="rounded-3xl" />
                  <div className="content box p-2 relative ">
                    <PoolHeader pool={pool} />
                    <PoolInfos className="poolsInfo flex flex-wrap w-full text-lighter">
                      <li>
                        <SmallText className="block">
                          {website !== undefined && website}
                        </SmallText>
                        <span className="tracking-wider text-sml">
                          {pair.map((token, index) => {
                            return `${token}${index !== 1 ? "-" : ""} `;
                          })}
                        </span>
                      </li>
                      <li className="flex flex-wrap justify-end">
                        <span className="block text-xs w-full">APY</span>
                        <strong>
                          <GradientText>
                            {apy !== null ? (
                              `${apy} %`
                            ) : (
                              <span className="relative block ml-4">
                                <TailSpin
                                  width={10}
                                  height={10}
                                  className="relative"
                                />
                              </span>
                            )}
                          </GradientText>
                        </strong>
                      </li>
                      <li>
                        <SmallText className="block">Deposited</SmallText>
                        {active &&
                          (userDeposited !== null ? (
                            `${userDeposited} ${
                              stakedTokenName ? stakedTokenName : ""
                            }`
                          ) : (
                            <span className="relative block pt-2 ml-4">
                              <TailSpin
                                width={10}
                                height={10}
                                className="relative"
                              />
                            </span>
                          ))}
                        {!active && (
                          <SmallText>
                            <GradientText>Disconnected</GradientText>
                          </SmallText>
                        )}
                      </li>
                      <li className="flex flex-wrap justify-end">
                        <SmallText className="block w-full">TVL</SmallText>
                        <span>
                          {tvl !== null ? (
                            `${tvl}$`
                          ) : (
                            <span className="relative">
                              <TailSpin
                                width={10}
                                height={10}
                                className="relative"
                              />
                            </span>
                          )}
                        </span>
                      </li>
                    </PoolInfos>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
export default HotPools;
