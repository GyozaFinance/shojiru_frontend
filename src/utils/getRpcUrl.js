import { networks } from "./networks";

export const rpcList = {
  40: networks.find(n => n.chainId === "0x28").rpcUrls[0],
}
