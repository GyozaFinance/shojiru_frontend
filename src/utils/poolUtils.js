import { ethers } from "ethers";

export const  deposit = (contract,value) => {


  return contract.deposit(
    ethers.utils.parseEther(value).toString()
  ).catch(err => console.log(err))
};

export const  withdraw = (contract,value) => {
  return contract.withdraw(
    ethers.utils.parseEther(value).toString()
  )
};