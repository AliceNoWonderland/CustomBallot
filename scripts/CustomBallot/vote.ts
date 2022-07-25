/* eslint-disable node/no-missing-import */
import { ethers, Contract } from "ethers";
import "dotenv/config";
import * as customBallot from "../../artifacts/contracts/CustomBallot.sol/CustomBallot.json";
import { CustomBallot } from "../../typechain/CustomBallot";

// This key is already public on Herong's Tutorial Examples - v1.03, by Dr. Herong Yang
// Do never expose your keys like this
const EXPOSED_KEY =
  "8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f";

async function main() {
  const wallet =
    process.env.MNEMONIC && process.env.MNEMONIC.length > 0
      ? ethers.Wallet.fromMnemonic(process.env.MNEMONIC)
      : new ethers.Wallet(process.env.PRIVATE_KEY ?? EXPOSED_KEY);

  console.log(`Using address ${wallet.address}`);

  const provider = ethers.providers.getDefaultProvider("ropsten");
  const signer = wallet.connect(provider);
  const balanceBN = await signer.getBalance();
  const balance = parseFloat(ethers.utils.formatEther(balanceBN));
  console.log(`Balance: ${balance}`);
  if (balance < 0.01) {
    throw new Error("Not enough balance");
  }

  if (process.argv.length < 3) {
    throw new Error("Missing Ballot address");
  }
  const ballotAddress = process.argv[2];

  if (process.argv.length < 4) {
    throw new Error("Missing proposal number");
  }
  const proposal = process.argv[3];

  if (process.argv.length < 5) {
    throw new Error("Missing vote number");
  }
  const voteNumber = process.argv[4];

  const ballotContract: CustomBallot = new Contract(
    ballotAddress,
    customBallot.abi,
    signer
  ) as CustomBallot;

  const proposalName = ethers.utils.parseBytes32String(
    (await ballotContract.proposals(Number(proposal))).name
  );

  console.log(`You are giving proposal - ${proposalName}: ${voteNumber} votes`);

  const voteTx = await ballotContract.vote(1, 5);

  console.log("Calculating......");
  await voteTx.wait();
  console.log(`Vote transaction completed at ${voteTx.hash}`);

  const remainVotingPower = await ballotContract.votingPower();
  console.log(`You have ${remainVotingPower} remaining votes`);

  console.log("Calculating winning proposal....");

  const winnerNm = await ballotContract.winnerName();
  const winnerProposal = await ballotContract.winningProposal();
  const winningVotes = (await ballotContract.proposals(winnerProposal))
    .voteCount;

  console.log(
    `Winning proposal right now is ${winnerNm} by ${winningVotes} votes`
  );
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
