
const hre = require("hardhat");

async function main() {
  const lockk = await hre.ethers.getContractFactory("chai"); //fetching bytecode and ABI
  const cazz = await lockk.deploy(); //creating an instance of our smart contract

  await cazz.waitForDeployment();//deploying your smart contract

  console.log("Deployed contract address:",`${cazz.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
//0x5FbDB2315678afecb367f032d93F642f64180aa3