## Inheritance

- Inheritance in Solidity is similar to Python.
- A contract that inherits code from another contract is deployed as a single contract. The derived contract inherits the functions and the state of the parent contract.
- Contracts can inherit multiple contracts
- Functions can also be overriden by specifying the same function name, inputs and outputs
- Inheritance order matters! The base contract must be stated first followed by the next "most base like" contract.
- Function modifier and event names must also be unqiue.

### Abstract Contracts

- Contracts that lack function implmentation are called Abastract Contracts.
- They will not compile but can be used as base contracts for other contracts.

### Interface Contracts

- Similar to Abstract Contracts but do not have any functions implemented.
- Cannot inherit from any other contracts
- Does not contain:
  - Constructor
  - Variables
  - Structs
  - Enums

## Libraries

- A contract that does not have any storage and cannot hold ether is called a library.
- Libraries are helpful because they allow developers to reference trusted functions rather than having to write functions for every task.
- Libraries cannot have any payable or fallback functions nor can they inherit from any other contracts (although they can be linked to other libraries)
- Libraries also dont have an event log, but they can dispatch events.

## Resources

### Contract-Contract Interaction

[Difference between CALL, CALLCODE and DELEGATECALL](https://ethereum.stackexchange.com/questions/3667/difference-between-call-callcode-and-delegatecall)

[Interactions Between Contracts](https://dappsforbeginners.wordpress.com/tutorials/interactions-between-contracts/)

### Inheritance

[Inheritance in Solidity](https://ethereumdev.io/inheritance-in-solidity/)

### Libraries

[Library Driven Development in Solidity](https://blog.aragon.one/library-driven-development-in-solidity-2bebcaf88736)
