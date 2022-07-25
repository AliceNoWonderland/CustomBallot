deploy.ts
To deploy: 1 MyToken contract 2 CustomBallot contract use my token contract'address
<pre><code>yarn ts-node scripts/CustomBallot/deploy.ts pizza salad desert fasting tacobell
yarn run v1.22.19
warning ../../../package.json: No license field
$ /Users/alicehe/Documents/08-Tokenized-Votes/Project/node_modules/.bin/ts-node scripts/CustomBallot/deploy.ts pizza salad desert fasting tacobell
Wallet address: 0x58921d96CB5024d4a0c8eD88B0464febE3C17f97
[Function (anonymous)]
Balance: 3
Deploying Token contract...
Token deployed
Token contract deployed at 0x2c9f01D0BBE95b366d9f8B8B2A8d71F07889579a
Deploying CustomBallot contract...
Proposals: 
  - pizza
  - salad
  - desert
  - fasting
  - tacobell
Ballot contract deployed
Ballot contract deployed at 0x84134A792f596cbDdf70D4Fcb54525Eb340cFA30</code></pre>


mint.ts
To mint tokens for accounts
<pre><code>% yarn ts-node scripts/CustomBallot/mint.ts 0x2c9f01D0BBE95b366d9f8B8B2A8d71F07889579a 0x58921d96CB5024d4a0c8eD88B0464febE3C17f97 100
yarn run v1.22.19
warning ../../../package.json: No license field
$ /Users/alicehe/Documents/08-Tokenized-Votes/Project/node_modules/.bin/ts-node scripts/CustomBallot/mint.ts 0x2c9f01D0BBE95b366d9f8B8B2A8d71F07889579a 0x58921d96CB5024d4a0c8eD88B0464febE3C17f97 100
Balance: 4.992618558465553
Preparing to mint 100 to user - 0x58921d96CB5024d4a0c8eD88B0464febE3C17f97
Awaiting for confirmation.....
Transaction completed. Hash: 0x43253bdc46b78fd4494336ee4e8a245a696904e2851002b2ca02761d786e20fb
✨  Done in 24.00s.

alicehe@alicehe-11WM /Users/alicehe/Documents/08-Tokenized-Votes/Project [master]
% yarn ts-node scripts/CustomBallot/mint.ts 0x2c9f01D0BBE95b366d9f8B8B2A8d71F07889579a 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
yarn run v1.22.19
warning ../../../package.json: No license field
$ /Users/alicehe/Documents/08-Tokenized-Votes/Project/node_modules/.bin/ts-node scripts/CustomBallot/mint.ts 0x2c9f01D0BBE95b366d9f8B8B2A8d71F07889579a 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Balance: 4.992435429464699
Preparing to mint 10 to user - 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Awaiting for confirmation.....
Transaction completed. Hash: 0x9d092baf27758cbf941b9af681bc07d16c906952fe7b2b62be06af141ac29fc4
✨  Done in 27.38s.

alicehe@alicehe-11WM /Users/alicehe/Documents/08-Tokenized-Votes/Project [master]
% yarn ts-node scripts/CustomBallot/mint.ts 0x2c9f01D0BBE95b366d9f8B8B2A8d71F07889579a 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 50
yarn run v1.22.19
warning ../../../package.json: No license field
$ /Users/alicehe/Documents/08-Tokenized-Votes/Project/node_modules/.bin/ts-node scripts/CustomBallot/mint.ts 0x2c9f01D0BBE95b366d9f8B8B2A8d71F07889579a 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 50
Balance: 4.992298974464062
Preparing to mint 50 to user - 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
Awaiting for confirmation.....
Transaction completed. Hash: 0x7df5fff1fb52f5d43524204e07f2a1fe6acb6ba6c4f847b5e810b53944d9b0f0
✨  Done in 47.24s.</code></pre>

delegate.ts 
To delegate to account itself to activate voting rights
% yarn ts-node scripts/CustomBallot/delegate.ts 0x2c9f01D0BBE95b366d9f8B8B2A8d71F07889579a 0x58921d96CB5024d4a0c8eD88B0464febE3C17f97
yarn run v1.22.19
warning ../../../package.json: No license field
$ /Users/alicehe/Documents/08-Tokenized-Votes/Project/node_modules/.bin/ts-node scripts/CustomBallot/delegate.ts 0x2c9f01D0BBE95b366d9f8B8B2A8d71F07889579a 0x58921d96CB5024d4a0c8eD88B0464febE3C17f97
Balance: 4.991718069461351
Activating voting power
========= NOTICE =========
Request-Rate Exceeded  (this message will not be repeated)

The default API keys for each service are provided as a highly-throttled,
community resource for low-traffic projects and early prototyping.

While your application will continue to function, we highly recommended
signing up for your own API keys to improve performance, increase your
request rate/limit and enable other perks, such as metrics and advanced APIs.

For more details: https://docs.ethers.io/api-keys/
==========================
Transaction completed at 0xcaa75daad3481e52643396401cda3eb6dca4c9440872c37750aa743db0ee3423
Vote power activated for 0x58921d96CB5024d4a0c8eD88B0464febE3C17f97
Address - 0x58921d96CB5024d4a0c8eD88B0464febE3C17f97 has total of 100 vote power and has used 0 votes so far
✨  Done in 20.57s.</code></pre>


vote.ts 
To vote on proposals use their index number and give votes
Note: This script for some reason seems to fail, can you take a look and help me understand what went wrong ??
<pre><code>
yarn ts-node ./scripts/CustomBallot/vote.ts 0x84134A792f596cbDdf70D4Fcb54525Eb340cFA30 1 5
yarn run v1.22.19
warning ../../../package.json: No license field
$ /Users/alicehe/Documents/08-Tokenized-Votes/Project/node_modules/.bin/ts-node ./scripts/CustomBallot/vote.ts 0x84134A792f596cbDdf70D4Fcb54525Eb340cFA30 1 5
Using address 0x58921d96CB5024d4a0c8eD88B0464febE3C17f97
Balance: 4.991300623959403
You are giving proposal - salad: 5 votes
Voting power is 0
Calculating......
You have 0 remaining votes
Calculating winning proposal....
Winning proposal right now is 0x70697a7a61000000000000000000000000000000000000000000000000000000 by 0 votes
✨  Done in 4.89s.</code></pre>