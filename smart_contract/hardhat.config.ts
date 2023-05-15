import { HardhatUserConfig } from "hardhat/config";
// import "@nomicfoundation/hardhat-toolbox";
import '@nomiclabs/hardhat-waffle';

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    sepolia: {
      url: 'https://sepolia.infura.io/v3/6c8150d3e556412db9ecefb289b956a9',
      accounts: [
          '7ba48ebaedd32003ce1b307d7671a55563775e8708c2d0510907ad92bb4761cb'
      ]
    }
  }
};

export default config;
