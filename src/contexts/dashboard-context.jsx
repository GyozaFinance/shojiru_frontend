import { BigNumber, ethers } from "ethers";
import React, { useContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import {
  useChefContract,
  useReadOnlyUniswapRouterContract,
  useTokenContract,
} from "../hooks/useContract";
import useWeb3 from "../hooks/useWeb3";
import {
  getCakeVaultContract,
  getChefContract,
  getContract,
  getPoolToken,
  getUniSwapRouterContract,
  getYOMasterChef,
  USDT,
  WETH,
} from "../utils/contractHelpers";
import { pools } from "../utils/pools";
import { web3Context } from "./web3-modal-context";
import { v4 as uuid } from "uuid";

import erc20Abi from "../config/abi/erc20.json";
const dashBoardContext = React.createContext({
  contract: null,
  chef: null,
  globalTVL: 0,
});

const formatAmount = (amount) => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const DashBoardProvider = ({ children }) => {
  const { Provider } = dashBoardContext;
  const contract = useTokenContract();

  const library = useWeb3();

  const { active, account, web3 } = useAuth();

  const [ERC20Name, setERC20Name] = useState(null);

  const [ERC20Balance, setERC20Balance] = useState(null);
  const [allowance, setAllowance] = useState(null);
  const [apy, setApy] = useState(null);
  const [globalTVL, setGlobalTVL] = useState(0);
  const [totalDeposited, setTotalDeposited] = useState(null);
  const [interval, setIntervalKey] = useState(0);

  const [poolList, setPoolList] = useState([]);

  const { selectedNetwork } = useContext(web3Context);
  const [refetch, setRefetch] = useState(null);
  const poolDetails = () => {
    const newList = poolList;

    let TOTALTVL = 0;
    newList.map((basePool, index) => {
      const pool = basePool;

      pool.chef = getChefContract(library, pool.chef.address);

      pool.vault = getCakeVaultContract(library, pool.vault.address);
      pool.stakedToken = getPoolToken(
        library,
        pool.tokenInfos.address,
        pool.tokenInfos.abi
      );

      const { chef, vault, poolIndex, stakedToken } = pool;

      if (account) {
        vault
          .userInfo(account)
          .then(async (userInfo) => {
            pool.userInfo = userInfo;
            return vault.balanceOf(account);
          })
          .then((userDeposited) => {
            const pow = BigNumber.from(10).pow(18);
            pool.userDeposited =
              userDeposited.stake.mul(1000).div(pow).toNumber() / 1000;
            return stakedToken.balanceOf(account);
          })
          .then((userTokenBalance) => {
            const pow = BigNumber.from(10).pow(18);
            pool.userTokenBalance =
              userTokenBalance.mul(1000).div(pow).toNumber() / 1000;
            return stakedToken.allowance(account, vault.address);
          })
          .then((allowance) => {
            pool.allowance = allowance;
            newList[index] = pool;
            setPoolList(newList);
            setRefetch(new Date().getTime());
          });
      }

      chef
        .poolInfo(poolIndex)
        .then(async (poolInfo) => {
          pool.poolInfo = poolInfo;
          pool.stakedTokenName = await stakedToken.name();
          pool.apy = apy;

          const router = getUniSwapRouterContract(library);

          const token0Address = await stakedToken.token0();

          const token1Address = await stakedToken.token1();
          const token0 = getContract(token0Address, erc20Abi, library);

          const yoMasterchef = getYOMasterChef(library);

          const tokenAddress =
            (await token0.name()) === "TLOS" ? token1Address : token0Address;

          const secondTokenOfTheLP = getContract(
            tokenAddress,
            erc20Abi,
            library
          );
          const WETHContract = getContract(WETH, erc20Abi, library);

          const telosBalance = await WETHContract.balanceOf(
            stakedToken.address
          );
          const Total = await vault.totalStake();
          const LpTotalSupply = await stakedToken.totalSupply();
          const pow = BigNumber.from(10).pow(18);
          const tvl =
            telosBalance
              .mul(BigNumber.from(2))
              .mul(Total)
              .div(LpTotalSupply)
              .mul(1000)
              .div(pow)
              .toNumber() / 1000;
          pool.tvl = tvl;

          const yoPoolInfo = await yoMasterchef.poolInfo(0);
          const tokenBalanceOf = await secondTokenOfTheLP.balanceOf(
            stakedToken.address
          );

          const shijiruBalanceOF = await contract.balanceOf(yoPoolInfo.strat);

          const factorA = BigNumber.from("25364728697305861980160");
          const factorB = BigNumber.from("86400000000000000000000");
          const dailyStackingReward =
            (factorA.mul(10000).div(tokenBalanceOf).toNumber() / 10000) * 2;

          const dailyShojiruReward =
            factorB.mul(10000).div(shijiruBalanceOF).toNumber() / 10000;

          let sweetAPY = dailyStackingReward;

          for (const i of Array(364)) {
            sweetAPY += sweetAPY * dailyShojiruReward + dailyStackingReward;
          }

          pool.apy = Math.round(sweetAPY * 10000) / 100;
          return;
        })

        .then(() => {
          newList[index] = pool;
          TOTALTVL += pool.tvl;
          setGlobalTVL(TOTALTVL);
          setRefetch(new Date().getTime());
          setPoolList(newList);
        });
    });
  };
  useEffect(() => {
    if (interval) {
      clearInterval(interval);
    }

    setIntervalKey(
      setInterval(() => {
        if (active) {
          contract.symbol().then(setERC20Name);
          contract
            .decimals()
            .then((decimals) => {
              return decimals;
            })
            .then((decimals) => {
              contract.balanceOf(account).then((balance) => {
                const div = ethers.BigNumber.from(10);
                setERC20Balance(balance.div(div.pow(decimals)).toString());
              });
            });
        }

        if (
          poolList.length ===
          pools.filter((p) => p.chainId === selectedNetwork.chainId).length
        ) {
          poolDetails();
        }
      }, 5000)
    );
  }, [account, active, poolList]);

  useEffect(() => {
    const newList = pools
      .filter((p) => p.chainId === selectedNetwork.chainId)
      .map(
        ({
          chef: chefAddress,
          vault: vaultAddress,
          pair,
          lock,
          website,
          poolIndex,
          tokenInfos,
        }) => {
          const chef = getChefContract(library, chefAddress);

          const vault = getCakeVaultContract(library, vaultAddress);
          const stakedToken = getPoolToken(
            library,
            tokenInfos.address,
            tokenInfos.abi
          );
          return {
            id: uuid(),
            chef,
            vault,
            allowance: null,
            poolInfo: null,
            pricePerFullShare: null,
            userTokenBalance: null,
            userDeposited: null,
            stakedTokenName: null,
            userInfo: null,
            apy: null,
            progress: null,
            tvl: null,
            lock,
            poolIndex,
            website,
            pair,
            stakedToken,
            tokenInfos,
          };
        }
      );
    setPoolList(newList);
    poolDetails();
  }, [selectedNetwork, account]);

  return (
    <Provider
      value={{
        contract,
        ERC20Balance,
        ERC20Name,
        allowance,
        apy,
        totalDeposited,
        poolList,
        refetch,
        globalTVL,
      }}
    >
      {children}
    </Provider>
  );
};

export { dashBoardContext, DashBoardProvider };
