import { rpcList } from "../utils/getRpcUrl";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import React, { useEffect, useMemo, useState } from "react";
import { ethers } from "ethers";
import { networks } from "../utils/networks";
import { toast } from "react-toastify";
import { setupNetwork } from "../utils/wallet";

const web3Context = React.createContext({ instance: null });
const Web3ModalProvider = ({ children }) => {
  const { Provider } = web3Context;

  const [provider, setProvider] = useState(null);

  const localChainId = localStorage.getItem("chainId");
  const [selectedNetwork, setSelectedNetwork] = useState(
    localChainId
      ? networks.find(({ chainId }) => chainId === localChainId)
      : networks[0]
  );
  useEffect(() => {
    localStorage.setItem("chainId", selectedNetwork.chainId);
  }, [selectedNetwork]);

  const [account, setAccount] = useState(null);
  const [modalProvider, setModalProvider] = useState(null);

  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: "8fe0bcba1f454ea6ac61789b944d03c1",
        rpc: rpcList,
      },
    },
  };

  const web3Modal = new Web3Modal({
    disableInjectedProvider: false,
    //network: "mainnet",
    cacheProvider: false,
    providerOptions,
    theme: "dark",
  });

  const connectWallet = async () => {
    const modalProvider = await web3Modal.connect();

    setModalProvider(modalProvider);
    const provider = new ethers.providers.Web3Provider(modalProvider);
    changeNetwork(`0x28`);
    setProvider(provider);
    return modalProvider;
  };

  const changeNetwork = async (networkId) => {
    const network = networks.find((n) => n.chainId === networkId);
    if (!network) {
      toast.error(`An error has ocured`);
      throw new Error(`An error has ocured`);
    }
    const provider = window.ethereum;

    if (provider) {
      if (networkId === "0x1") {
        await provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: networkId }],
        });
      } else {
        setupNetwork(network);
      }
    }
    setSelectedNetwork(network);
    setupNetwork(network);
  };

  const activate = async () => {
    const modalProvider = await connectWallet();

    // Subscribe to accounts change
    modalProvider.on("accountsChanged", (accounts) => {
      connectWallet();
    });

    // Subscribe to chainId change
    modalProvider.on("chainChanged", (chainId) => {
      connectWallet();
    });

    // Subscribe to provider disconnection
    modalProvider.on("disconnect", (error) => {
      if (modalProvider.close) modalProvider.close();
      setAccount(null);
      setProvider(null);
      setModalProvider(null);
    });
  };
  const deactivate = async () => {
    if (modalProvider.close) modalProvider.close();

    setProvider(null);
    setModalProvider(null);
  };
  const active = useMemo(() => {
    return !!provider;
  }, [provider]);

  useEffect(() => {
    if (!provider) {
      setAccount(null);
      return;
    }
    const signer = provider.getSigner();

    return signer.getAddress().then((address) => {
      setAccount(address);
    });
  }, [provider]);

  return (
    <Provider
      value={{
        account,
        activate,
        deactivate,
        active,
        library: provider,
        changeNetwork,
        selectedNetwork,
      }}
    >
      {children}
    </Provider>
  );
};

export { web3Context, Web3ModalProvider };
