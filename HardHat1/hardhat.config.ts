import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.9",

  networks: {
    hardhat: {
      initialBaseFeePerGas: 0,
      blockGasLimit: 18800000,
    },
    ganache: {
      url: "http://localhost:8545",
      gasLimit: 18800000,
      gasPrice: 0,
    },
 
    mufi10: {
      url: "http://localhost:8646",
      chainId: 109117102105010,
      gasPrice: 1000,
      gasLimit: 18800000,
      accounts: ['573da9988486d422994b8a0a597017020513d041b4b1315f50883af3007f3496'],
    }
  }

};

export default config;
