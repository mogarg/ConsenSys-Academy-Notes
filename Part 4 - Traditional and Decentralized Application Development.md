## Decentralized App Development

- It is important to know whether using a DApp is a good option for given project.

- A DApp is a good choice if the project requires the following:
  - The system defines digital relationships
  - Application needs to by dynamic and auditable
  - Central authority is not a requirement
  - Transaction speed is not of vital importance

## Development Enviroment Setup

- Ethereum has several networks:
  - Mainnet: This is the real ethereum network, transactions actually cost ether, additionally this is the slowest option.
  - Testnets: This is used for development (typically beta tests) purposes only, ether is required for transactions but the ether is fake and therefore free.
  - Private Network: Transactions are instantly processed, and cost no ether but they are also completely isolated from other networks.
- When developing applications/ smart contracts all three of these networks would ideally be utilized fo
  - Phase 1 - Private Network
    - Rapid setup/ depoloyment/ testing
  - Phase 2 - Public Testnet
    - Closely resembles production enviroment
    - Test on a larger scale
    - Open to the public, bug bounties can be offered
  - Phase 3 - Ethereum Mainnet
    - Highest amount of risk
    - All transactions handle real value
- Ethereum has many tools used to connect to public/ private blockchains
  - Geth - instantiates connection to public/ private blockchain
    - Good for setting up personal private network with multiple nodes
  - Ganache (Truffle) - connects application to local private blockchain
    - Good for setting up early stage dev enviroments
  - Remix - connects to mainnet and simulates private blockchain
    - Good for testing smart contracts on testnets/ setting up early stage dev enviroments
  - Metamask - connects wallet to public/ private blockchain
    - Good for interacting with smart contracts deployed to testnets

### Development Workflow

1.  Create Account
2.  Fund Account - Faucets provide test ether for accounts on testnets
3.  Develop (Start of Testing Cycle)
4.  Compile - Remix/ SolC/ Truffle (framework that includes compiler)
5.  Sign & Deploy - Remix allows users to connect to Ethereum node and deploy contacts, Truffle offers complex multi-contract migration management
6.  Interact & Test (End of Testing Cycle) - Remix has functionality that allows users to transact with deployed contracts. Metamask lets users interact with deployed applications via browser extension. Truffle has a complex test automation framework baked in.

## Key Developer Tools

### Geth

- Geth is a gateway to the ethereum network, in short Geth is a node in the blockchain network it is connected to.
- The following features are included with Geth:
  - Connect to a blockchain or create one from scratch
  - Create and manage accounts
  - Fund accounts via mining or transafers from other accounts/ faucets
  - Deploy compiled contracts
  - Interact with deployed contracts
  - Although Geth is very versatile it is not the recommended way to interact with the mainnet due to its complexity.

### Parity

- Parity is an Ethereum client similar to Geth, that has a built-in DApp enviroment.
- The following features are included with Parity:

  - Most of the features that are available in Geth are also baked into Partiy, in many cases Parity offers more advanced features.
  - Multi-Signature wallets, smart contracts that can be controlled via different accounts
  - Enables creation and importing/ exporting of keys
  - Hardware and Cold-Storage electronic support
  - Name Registry support

### Mist

- Mist is a web3 browser that includes a wallet manager to create and manage user accounts.
- The following features are included with Mist:
  - Connects to the mainnet or testnet
  - Create and manage accounts
  - Fund accounts via mining or transafers from other accounts/ faucets
  - Compiled and deploy contracts
  - Interact with deployed contracts

### MetaMask

- Metamask is a Chrome/ Firefox browser extension that stores account addresses and enables private key signing.
- The following features are included with MetaMask:
  - MetaMask connects to an Ethereum gateway that can be defined by the user.
  - The extension injects the web3 object into the webpage to enable interaction with the Ethereum Gateway.
  - Creating and funding accounts is very intuitive

### Remix

- Remix is a web based solidity smart contract development IDE with an integrated debugger and testing enviroment.
- The following features are included with Remix:
  - Comes with file explorer capable of storing multiple solidity files.
  - Solidity Editor
  - Useful for accessing the blockchain state
  - Chat Support page
  - Simulate blockchain with pre-funded accounts or connect to a live network.
  - Can interact with any deployed contract.

### Truffle

- Truffle is a development framework for Ethereum.
- The following features are included with Truffle:
  - Comes with built-in smart contract compilation. linking, deployment, and binary management.
  - Built-in testing with Mocha and Chai
  - External script runner

### Ganache

- Ganache is a part of the Truffle Developer suite.
- The following features are included with Ganache:
  - Instantiates a local private blockchain that contains pre-funded accounts.
  - Allows user to run tests, inspect state, and execute commands.
  - Easily configured with MetaMask and Remix.

### Web3.js

- Web3.js is a collection of Javascript libraries that allow you to easily communicate with local or remote Ethereum nodes using the HTTP or IPC connection.
- The following features are included with Web3.js:
  - Abstracts away alot of the difficulty involved in interacting with a node via the JSON RPC
  - Web3 has all of the functionality of the node that it connects to.
  - Provides access to node functions to applications that the Web3 object is instantiated in

### IPFS and Swarm

- IPFS and Swarm are decentralized filed storage solutions for web 3.0
- Storing large amounts of data on the blockchain are impractical! IPFS and Swarm intend on addressing this issue.
- It is possible to store references to data kept in IPFS or Swarm in smart contracts as a reference to large datasets.

![Example Dev Env](/images/exampleDevEnv.png)

## Resources

### Decentralized App Development

[Why Use a Blockchain?](https://www.coindesk.com/information/why-use-a-blockchain/)

[Ethereum for web developers](https://medium.com/@mvmurthy/ethereum-for-web-developers-890be23d1d0c)

### Development Enviroment Setup

[Creating a Private Chain/Testnet](https://souptacular.gitbooks.io/ethereum-tutorials-and-tips-by-hudson/content/private-chain.html)

[Geth - Ethereum Wiki](https://github.com/ethereum/go-ethereum/wiki/geth)

### Key Developer Tools

[Web3.js - Ethereum Wiki](https://github.com/ethereum/wiki/wiki/JavaScript-API)
