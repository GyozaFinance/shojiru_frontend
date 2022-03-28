import { Contract } from "@ethersproject/contracts";
import {  accountLessProviders } from "./injected";
import tokenAbi from '../config/abi/token.json';
import chefAbi from '../config/abi/chef.json';
import vaultAbi from '../config/abi/vault.json'
import lpAbi from '../config/abi/lp.json';
import routerAbi from '../config/abi/swap-router.json';
export const getContract = (address, abi, web3) => {
  const provider = web3 ?? accountLessProviders.find(({chainId}) => chainId === localStorage.getItem('chainId'))?.provider;

  return new Contract(address, abi, provider);
};


export const WETH = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
export const USDT = "0xe9e7cea3dedca5984780bafc599bd69add087d56"

export const getTokenContract = (web3) => {

  return getContract(
    "0xe1747a23C44f445062078e3C528c9F4c28C50a51",
    tokenAbi,
    web3
  );
};

export const getChefContract = (web3,address) => {
  return getContract(
    address,
    chefAbi,
    web3
  );
};

export const getCakeVaultContract = (web3,address) => {
return getContract(
    address,
    vaultAbi,
    web3
  );
}