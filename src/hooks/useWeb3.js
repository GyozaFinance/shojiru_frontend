import { useContext } from "react";
import { web3Context } from "../contexts/web3-modal-context";
import {  accountLessProviders } from "../utils/injected";
import useAuth from "./useAuth";

/**
 * Provides a web3 instance using the provider provided by useWallet
 * with a fallback of an httpProver
 * Recreate web3 instance only if the provider change
 */
const useWeb3 = () => {
  const { web3: library } = useAuth();
  
  const {selectedNetwork } = useContext(web3Context)

  const accountLessProvider =  accountLessProviders.find(({chainId}) => chainId === selectedNetwork.chainId)?.provider;
  
  return library ? library?.getSigner() : accountLessProvider;
};

export default useWeb3;
