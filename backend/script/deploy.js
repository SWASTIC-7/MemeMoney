const hre = require("hardhat");

async function main() {
  const MemeTokenFactory = await hre.ethers.getContractFactory("MemeTokenFactory");
  const factory = await MemeTokenFactory.deploy();

  await factory.waitForDeployment();

  console.log(`Factory deployed to: ${factory.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
