## Consensus Mechanisms

- Distributed Ledger Technologies use a variety of consensus mechanisms that allow nodes within a given network to share and agree upon state.
- By design consensus mechanisms provide an economic incentive to honest participation within a network.
- Some examples of Consensus Mechanisms include:

1.  Practical Byzantine Fault Tolerance
    - Guarentees that consensus can be reached within a network even if a minority of nodes are dishonest or absent.
2.  Proof of Work
    - Particpants only accept valid block when blockhash is less than target number
    - Miners in a network repeatedly hash the block contents and check the output to see if it matches some specific criteria.
    - When the correct block hash is found it is broadcasted throughout the entire network and the miner is awarded.
    - Blocks are mined a deterministic rate (every 15 seconds in the Ethereum Network)
3.  Proof of Stake
    - Currency holders stake some amount of the currency for the chance to validate a block.
    - The block validator is randomly selected by the network but the chance of selection is proportional to the stake.

## Mining

- In the Proof-of-Work consensus scheme, mining is the process of validating transaction blocks through hashing the block contents. This process makes it incredibly difficult to guess the correct answer but very easy to verify the correct guess has been made.
- Each time a node wins the block they suggest the next state of the system and broadcast their solution to the network. Other nodes verify that the solution is correct and update their ledgers such that the validator recieves the block reward.
- The difficulty is adjusted based on how quickly the previous block was mined.
- Each block contains a list of transactions, the hash of the most recent block, nonce, and block reward.
- The ethereum proof-of-work algorithm abides by three main rules:
  1.  Rejects invalid blocks
  2.  Requires proof of work to contain a hash less than the target block #
  3.  Longest chain is always considered to be the most up-to-date/ trusted

## Public Vs Private Blockchains

### Public

- Anyone is allowed to join as a trust-less participant, they recieve a wallet that does not contain any personal information and allows them to be pseudonymous in the network.
- Anyone can read and write data from/to the blockchain
- Transaction processors must invest financially to prevent fraud with Proof of Work or a direct incentive (i.e. cryptocurrency)
- Each transaction has a cost

### Private

- Only verified participants are allowed, bad actors can be punished.
- Typically seen in enterprise or development enviroments.
- Validators are legally accountable and are incentivized by reputational risks
- Small number of nodes can ultimately change the state of data
