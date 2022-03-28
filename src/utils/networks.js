export const networks = [
  {
    chainId: `0x1`,
    chainName: "Ethereum mainnet",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.infura.io/v3/07ca7140a9254c979b8d17d4dcd48ab4"],
    blockExplorerUrls: ["https://etherscan.io/"],
  },
  /*{
    chainId: `0x61`,
    chainName:"Testnet Binance smart chain",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18
    },
    rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
    blockExplorerUrls: ["https://testnet.bscscan.com/"],
  },*/
  {
    chainId: "0x38",
    chainName: "Binance smart chain",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18
    },
    rpcUrls: ["https://bsc-dataseed.binance.org"],
    blockExplorerUrls: ["https://bscscan.com"]
  }
]