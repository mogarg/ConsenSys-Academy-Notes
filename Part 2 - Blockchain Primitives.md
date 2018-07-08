## Cryptographic Hash Functions

- A hash function is designed to take input data of any size and generate an output of fixed size that cannot be reversed such that the original input is revealed. It should also be noted that the hashing function can be run many times against the same input and always create the same output.
- Hash functions are:
  1.  Fast
  2.  Deterministic
  3.  Infeasible to reverse
  4.  Uni-driectional
  5.  Collision resistant

### Applications of Hash Functions

- Verify data integrity (i.e. checksums, password hashing)

  - Any permutation to the original data will produce an completely different output hash

- Proof of Work

  - Used as a mechanism for preventing service abuse
  - Hard to find a given hash
  - Easy to verify that work has been done
  - Reduce spam, each transaction incurs a cost which makes it infeasible for spamming.

- Data Verification
  - Hash tables
  - P2P Networks
  - Pseudorandom number generator

### Public Key Cryptography

- Random data is input into a Key Generation Algorithm, then two sets of keys are generated, public and private. The same random data will genearte the same output.
- Public keys are shared while private keys are kept secret by the key owner.
- Public Keys are used for two things:
  - Encryption: Messages are encytped with the public key, but can only be decrypted with the private key corresponding to that public key.
  - Authentication: A public key can verify ownership of private keys such as digital signatures to sign transactions.
    - For Example:
    1.  Alice (signer) hashes a document with her private key generating a signed document
    2.  She can then publish the original document, the signed document, and the public key to a blockchain for anyone to verify she is the original owner of the document.
    3.  To verify Alice was the original owner, the verifier can hash the original document then decrypt the signed document with public key. Then compare the output hash of the hashed original document and the decrypted signed document.

## Merkle Tree

- A merkle tree is a binary tree data structure that are derived from a set of data. Every leaf of the tree is a cryptographic hash of a point in the dataset. Every node is the hash of its two child elements.
- The benefit of this dataset is that it is cryptographically secure, changing any leaf or node will fundamentally alter the root of the tree.
- Particia Trees are space optimized merkle trees,they allow for stored key/ value pairs where the keys are used to traverse the tree and find values stored at the leaves of the tree. This makes it easy to insert or delete data.
- In the case of Ethereum Particia trees are used to store the balance of accounts where the keys are addresses and the values are account declarations which list the balance, nonce, code, and storage for each account.

### In-Depth

- A Merkle tree consists of chunks of data, the root hash, and the branch consisting of all hashes going up along the path from the chunk of the root.

* If we want to verify a transaction we simply take the hash of that node as well as its adjacent node, this would be repeated until the root is reached. If the root hash is different from that which was derived, then the transaction has been tampered with. ![MerkleTree-Verification](/images//merkletree-verification.png)

- Bitcoin uses Merkle trees but they do not contain enough information to provide light clients knowledge about the current state (eg. digital asset holdings, name registrations, the status of financial contracts, etc). To get this information a light client would have to authenticate every single transaction in the chain.
  ![BitcoinMerkleTree](/images/bitcoinMerkleTree.jpg)

* Ethereum gets around this limitation by providing three tyoes if trees for three object types (Transactions, Receipts, State) which provides the light client with far more information.
  ![EthereumMerkleTree](/images/ethereumMerkleTree.png)

### Resources

[Ever Wonder How Merkle Trees Work?](https://media.consensys.net/ever-wonder-how-merkle-trees-work-c2f8b7100ed3)

[Partricia Tree - Ethereum Docs](https://github.com/ethereum/wiki/wiki/Patricia-Tree)

[Merkling in Ethereum](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum/)

## Blockchain Structure

- Blockchains accomplish several key features:

  - Maintain state in a peer to peer network
  - Coordinate state updates such that:
  - A majortity of participants agree the updates are legitimate
  - Consensus on the new system state is reached.

- Updates are broken into sets or blocks. These blocks are summarized by the Merkle tree root. Blocks are made in series of one another and reference previous blocks.

- A block includes:
  - A list of transactions, and a Merkle tree based on the list
- Hash of previous block
- Nonce which is used in POW, this value is incremented as a miner performs POW to find the block hash that matches the target block. Once the correct block hash is found the nonce is broadcasted across the network such that other miners can validate the winning miners POW.

### Resources

[Blockchain Demo](https://anders.com/blockchain/)

## Smart Contracts

- Smart Contracts should have the following characteristics

  1.  Trustless: No 3rd party or intermediaries should have exclusive access
  2.  Trackable: Transactions are traceable and easily audited
  3.  Irreversible: Transactions are final, security is priority.
  4.  Self-Executing: Reduces costs, and increases efficiency.

- Blockchains offer an ideal platform for Smart Contracts because a smart contract can live on a blockchain and achieve all of the goals listed above.

## Nodes

- Nodes are implemented in Peer to Peer Networks, they participate by running the corresponding software.

- Nodes are the gateway to the blockchain network, in the Ethereum network a users device that is Web3 Capable communicates with the Node over an RPC protocol, the node then connects to the blockchain network using a P2P protocol.

![P2P Network](/images/p2pnetwork.png)

- There are 3 ways in which a node can participate with the network.
  - Light Client: Contains a shallow copy of the blockchain
  - Full Node: Maintains a full copy of the blockchain, verify the correct block award has been distributed, ensures the correct data format is being maintained, checks that no double spending has occured, and validates that transactions have the correct signature.
  - Miners: Perform all of the same actions as Full Nodes but they also veirfy transactions through Proof-of-Work.

### In-Depth

- Light Client Protocols are designed for low-resource enviroments (i.e. Smartphones, Embedded Devices, etc) that cannot maintain a full node but need a high level of assurance regarding the current state. This is acccomplished by downloading bockheaders and verifying a small portion of the blockchain using a distributed hash table as a database for trie nodes.

- Partially light clients swap the database for GET requests such that no information is actually stored.

- Light clients utilize a Patricia Merkle Tree data structure where each node is the hash of its children, and each set of key/ value pairs map to a unique root hash. This is incredibly powerful because only the children of each node are needed to prove a root hashes validity.

- Merkle Trees are also highly scalable, even if the entire state tree is several gigabytes in size a light client would only need a few kilobytes of data to prove the state tree's validity.

- A Simplified Payment Verification proof of a node in a Partirica Tree consists of a complete subset of tree nodes that were processed in order to access it. "In a simple implementation of a Patricia tree, retrieving the value associated with a particular key requires descending the hash tree, constantly looking up nodes in the database by their hashes, until you eventually reach the final leaf node; a simple algorithm for producing an SPV proof is to simply run this naive algorithm, and record all of the database lookups that were made. SPV verification consists of running the naive lookup algorithm but pointing it to a custom database populated only with the nodes in the SPV proof; if there is a "node not found" error, then the proof is invalid."

- Light client protocols can be implemented to perform four different functions:
  - A light client wants to know the state of an account (nonce, balance, code or storage index) at a particular time. The light client can simply recursively download trie nodes from the state root until it gets to the desired value.
  - A light client wants to check that a transaction was confirmed. The light client can simply ask the network for the index and block number of that transaction, and recursively download transaction trie nodes to check for availability.
  - Light clients want to collectively validate a block. Each light client C[i] chooses one transaction index i with transaction T[i] (with corresponding receipt R[i]).
  - Light clients want to "watch" for events that are logged.

## Blockchain Forks

- A blockchain fork is when a block splits into two concurrent chains.
  - This can be either intentional such as the case when network nodes are performing software updates or unintentional in the case where miners produce are competing for Proof-of-Work verification.
    - In the case of unintentional forks caused by miners this is typically caused by two miners discovering the correct block hash and broadcast it to the network simultaneously. The result is that other nodes may recieve notification from one of the miners quicker than the other resulting in two different histories and thus two different chains. As part of the protocol the longest chain is considered the "valid chain", at some point one of the chains will outgrow the other. As a general rule, users should wait for 6 block confirmations because it is almost guarenteed that the longest chain will be identified by that point.
  - Forks also occur when there is disagreement between communities in the same blockchain network. If one group implements new rules while another does not the group will split into two sepereate blockchains.
    - Hard Forks
      - This happens if the upgrade causes nodes to reject blocks verified with nodes using the older version of software. To prevent this nodes must simaltanously upgrade to the new software version.
      - Hard forks are generally used when there is consensus about software changes being made.
    - Soft Forks
      - Blocks verified by nodes running older software are compatiable with nodes running latest version of software. Both rulesets exist on the same chain.

### Resources

[Light client protocol - Ethereum Docs](https://github.com/ethereum/wiki/wiki/Light-client-protocol)
[A Short Guide to Bitcoin Forks](https://www.coindesk.com/short-guide-bitcoin-forks-explained/)
