import { Contract } from "@ethersproject/contracts";
import {  accountLessProviders } from "./injected";
import tokenAbi from '../config/abi/token.json';
import chefAbi from '../config/abi/chef.json';
import vaultAbi from '../config/abi/vault.json'
import lpAbi from '../config/abi/lp.json';
import routerAbi from '../config/abi/swap-router.json';
import yoMasterchefAbi from '../config/abi/yo-masterchef.json';
export const getContract = (address, abi, web3) => {
  const provider = web3 ?? accountLessProviders.find(({chainId}) => chainId === localStorage.getItem('chainId'))?.provider;

  return new Contract(address, abi, provider);
};


export const WETH = "0xD102cE6A4dB07D247fcc28F366A623Df0938CA9E";
export const USDT = "0xeFAeeE334F0Fd1712f9a8cc375f427D9Cdd40d73"

export const getTokenContract = (web3) => {

  return getContract(
    "0x457b7b28f0D5FDaeFD2a4670a96A35237E3eeb85",
    tokenAbi,
    web3
  );
};


export const getUniSwapRouterContract = (web3) => {
  return getContract(
    "0xb9239af0697c8efb42cba3568424b06753c6da71",
    routerAbi,
    web3
  )
}

export const getLP = (web3) => {
  return getContract(
    "0x8959f2F2F412dAD20F81CBd1C84cfb9A7b095c1d",
    lpAbi,
    web3
  )
}
export const getYOMasterChef = (web3) => {
  return getContract(
    "0xdA4D2F68366272baA146a401b8903f9c1B2967eA",
    yoMasterchefAbi,
    web3
  )

} 

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

export const getPoolToken = (web3,address,abi) =>  {
  return getContract(address,abi,web3);
}