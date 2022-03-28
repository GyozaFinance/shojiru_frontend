import { useMemo } from "react";

import { getChefContract, getTokenContract } from "../utils/contractHelpers";
import { accountLessProviders } from "../utils/injected";
import useWeb3 from "./useWeb3";



export const useTokenContract = () => {
  const web3 = useWeb3();
  return useMemo(() => getTokenContract(web3), [web3]);
};

export const useReadOnlyTokenContract = () => {
  const accountLessProvider =  accountLessProviders.find(({chainId}) => chainId === localStorage.getItem('chainId'))?.provider;
  return useMemo(() => getTokenContract(accountLessProvider), []);
};
export const useReadOnlyChefContract = () => {
  const accountLessProvider =  accountLessProviders.find(({chainId}) => chainId === localStorage.getItem('chainId'))?.provider;
  return useMemo(() => getChefContract(accountLessProvider), []);
};



export const useChefContract = () => {
  const web3 = useWeb3();
  return useMemo(() => getChefContract(web3), [web3]);
};
