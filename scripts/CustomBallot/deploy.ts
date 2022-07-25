/* eslint-disable node/no-missing-import */
import { ethers } from "ethers";
import * as customBallot from "../../artifacts/contracts/CustomBallot.sol/CustomBallot.json";
import * as myToken from "../../artifacts/contracts/Token.sol/MyToken.json";
import "dotenv/config";

// This key is already public on Herong's Tutorial Examples - v1.03, by Dr. Herong Yang
// Do never expose your keys like this
const EXPOSED_KEY =
  "8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f";

function convertStringArrayToBytes32(strings: string[]): string[] {
  return strings.map((string) => ethers.utils.formatBytes32String(string));
}

async function main() {
  const wallet =
    process.env.MNEMONIC && process.env.MNEMONIC.length > 0
      ? ethers.Wallet.fromMnemonic(process.env.MNEMONIC)
      : new ethers.Wallet(process.env.PRIVATE_KEY ?? EXPOSED_KEY);

  const provider = ethers.providers.getDefaultProvider("ropsten");
  console.log(provider.estimateGas);
  const signer = wallet.connect(provider);
  const balanceBN = await signer.getBalance();
  const balance = parseFloat(ethers.utils.formatEther(balanceBN));
  console.log(`Balance: ${balance}`);
  if (balance < 0.01) {
    throw new Error("Not enough balance");
  }

  console.log("Deploying Token contract...");
  const tokenContractFactory = new ethers.ContractFactory(
    myToken.abi,
    myToken.bytecode,
    signer
  );
  const tokenContract = await tokenContractFactory.deploy();
  await tokenContract.deployed();
  console.log("Token deployed");
  console.log(`Token contract deployed at ${tokenContract.address}`);

  console.log("Deploying CustomBallot contract...");
  console.log("Proposals: ");
  const proposals = process.argv.slice(2);
  if (proposals.length < 2) {
    throw new Error("At least 2 proposals are required");
  }

  proposals.forEach((proposal) => {
    console.log(`  - ${proposal}`);
  });

  const ballotContractFactory = new ethers.ContractFactory(
    customBallot.abi,
    customBallot.bytecode,
    signer
  );

  const ballotContract = await ballotContractFactory.deploy(
    convertStringArrayToBytes32(proposals),
    tokenContract.address
  );
  await ballotContract.deployed();
  console.log("Ballot contract deployed");
  console.log(`Ballot contract deployed at ${ballotContract.address}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
