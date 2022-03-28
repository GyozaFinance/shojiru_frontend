import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from "ethers";
import { rpcList } from "./getRpcUrl";
import { networks } from "./networks";

export const injected = new InjectedConnector({
  supportedChainIds: networks.map((n) => parseInt(n.chainId, 16)),
});

export const getLibrary = (provider) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

export const accountLessProviders = networks.map(({ chainId }) => ({
  chainId,
  provider: new ethers.providers.JsonRpcProvider(
    rpcList[parseInt(chainId, 16)]
  ),
}));
