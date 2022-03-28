import { networks } from "./networks";

export const rpcList = {
  //97: networks.find(n => n.chainId === "0x61").rpcUrls[0],
  1:  networks.find(n => n.chainId === "0x1").rpcUrls[0],
  56:  networks.find(n => n.chainId === "0x38").rpcUrls[0],
}
