/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from "react";
import { web3Context } from "../contexts/web3-modal-context";



const useWeb3Modal = () => {
  return useContext(web3Context)
};

export default useWeb3Modal;
