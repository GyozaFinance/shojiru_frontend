import { BigNumber, ethers } from "ethers";
import React, { useContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useChefContract, useTokenContract } from "../hooks/useContract";
import useWeb3 from "../hooks/useWeb3";
import {
  getCakeVaultContract,
  getChefContract,
} from "../utils/contractHelpers";
import { pools } from "../utils/pools";
import { web3Context } from "./web3-modal-context";
import { v4 as uuid } from "uuid";
const dashBoardContext = React.createContext({ contract: null, chef: null });

const DashBoardProvider = ({ children }) => {
  const { Provider } = dashBoardContext;
  const contract = useTokenContract();

  const library = useWeb3();
  const { active, account, web3 } = useAuth();
  const [ERC20Name, setERC20Name] = useState(null);

  const [ERC20Balance, setERC20Balance] = useState(null);
  const [allowance, setAllowance] = useState(null);
  const [apy, setApy] = useState(null);
  const [totalDeposited, setTotalDeposited] = useState(null);
  const [interval, setIntervalKey] = useState(0);

  const [poolList, setPoolList] = useState([]);

  const { selectedNetwork } = useContext(web3Context);
  const [refetch, setRefetch] = useState(null);
  const poolDetails = () => {
    const newList = poolList;

    newList
      //.filter((p) => p.chainId === selectedNetwork.chainId)
      .map((basePool, index) => {
        const pool = basePool;

        pool.chef = getChefContract(library, pool.chef.address);

        pool.vault = getCakeVaultContract(library, pool.vault.address);

        const { chef, vault, pair, lock } = pool;

        if (account) {
          vault
            .userInfo(account)
            .then(async (userInfo) => {
              pool.userInfo = userInfo;
              const withdrawFeePeriod = (
                await vault.withdrawFeePeriod()
              ).toNumber();

              const pricePerFullShare = await vault.getPricePerFullShare();

              const now = Math.round(new Date().getTime() / 1000);

              const start = userInfo.lastDepositedTime.toNumber();
              const end = userInfo.lastDepositedTime
                .add(withdrawFeePeriod)
                .toNumber();

              const purcent = (1 - (end - now) / (end - start)) * 100;
              const progress = Math.round(purcent * 100) / 100;

              if (start === 0) pool.progress = null;
              else pool.progress = progress;

              const div = ethers.BigNumber.from(10).pow(18);

              pool.userDeposited =
                userInfo.shares
                  .mul(pricePerFullShare)
                  .div(div)
                  .div(div)
                  .toString() ?? 0;
              pool.withdrawAmount = userInfo.shares.div(div).toString() ?? 0;
              return contract.allowance(account, vault.address);
            })
            .then((allowance) => {
              pool.allowance = allowance;
              newList[index] = pool;
              setPoolList(newList);
              setRefetch(new Date().getTime());
            });
        }
        chef
          .poolInfo(0)
          .then((poolInfo) => {
            pool.poolInfo = poolInfo;
            return vault.getPricePerFullShare();
          })
          .then((pricePerFullShare) => {
            pool.pricePerFullShare = pricePerFullShare;
            return chef.rewardsPerBlock();
          })

          .then((rewardsPerBlock) => {
            const deposited = pool.poolInfo.currentDepositAmount.eq(
              BigNumber.from(0)
            )
              ? BigNumber.from(1)
              : pool.poolInfo.currentDepositAmount;

            pool.apy = Math.round((rewardsPerBlock * 10518975) / deposited);

            newList[index] = pool;
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
      .map(({ chef: chefAddress, vault: vaultAddress, pair, lock }) => {
        const chef = getChefContract(
          library,
          //web3 ? web3.getSigner() : accoutLessLibrary,
          chefAddress
        );

        const vault = getCakeVaultContract(
          library,
          //web3 ? web3.getSigner() : accoutLessLibrary,
          vaultAddress
        );
        return {
          id: uuid(),
          chef,
          vault,
          allowance: null,
          poolInfo: null,
          pricePerFullShare: null,
          userInfo: null,
          apy: null,
          progress: null,
          lock,
          pair,
        };
      });
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
      }}
    >
      {children}
    </Provider>
  );
};

export { dashBoardContext, DashBoardProvider };
