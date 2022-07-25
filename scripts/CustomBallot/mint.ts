/* eslint-disable node/no-missing-import */
import { ethers, Contract } from "ethers";
import * as myToken from "../../artifacts/contracts/Token.sol/MyToken.json";
import "dotenv/config";
import { MyToken } from "../../typechain/MyToken";

// This key is already public on Herong's Tutorial Examples - v1.03, by Dr. Herong Yang
// Do never expose your keys like this
const EXPOSED_KEY =
  "8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f";

async function main() {
  const wallet =
    process.env.MNEMONIC && process.env.MNEMONIC.length > 0
      ? ethers.Wallet.fromMnemonic(process.env.MNEMONIC)
      : new ethers.Wallet(process.env.PRIVATE_KEY ?? EXPOSED_KEY);

  const provider = ethers.providers.getDefaultProvider("ropsten");
  const signer = wallet.connect(provider);
  const balanceBN = await signer.getBalance();
  const balance = parseFloat(ethers.utils.formatEther(balanceBN));
  console.log(`Balance: ${balance}`);
  if (balance < 0.01) {
    throw new Error("Not enough balance");
  }

  if (process.argv.length < 3) {
    throw new Error("Missing Token address");
  }
  const tokenAddress = process.argv[2];

  if (process.argv.length < 4) {
    throw new Error("Missing voter address");
  }
  const voterAddress = process.argv[3];

  const tokenContract: MyToken = new Contract(
    tokenAddress,
    myToken.abi,
    signer
  ) as MyToken;

  const mintAmount = process.argv[4] ? process.argv[4] : "10";
  console.log(`Preparing to mint ${mintAmount} to user - ${voterAddress}`);

  const mintTx = await tokenContract.mint(
    voterAddress,
    ethers.utils.parseEther(mintAmount)
  );
  console.log("Awaiting for confirmation.....");
  await mintTx.wait();
  console.log(`Transaction completed. Hash: ${mintTx.hash}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
