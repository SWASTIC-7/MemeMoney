require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    localhost: {},
    hardhat: {},
    // optional: for testnet deployment
    hederaTestnet: {
      url: "https://testnet.hashio.io/api", // Hedera JSON-RPC
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
