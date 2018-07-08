## Data Types and Variables

- Features of Solidity include:

  - Statically Typed Language
  - Compiled Language
  - Elementary Types (value)
    - Boolean, Integer, Address, Byte Arrays, Enums
  - Complex Types (reference)
    - Arrays, Structs
  - Mappings

### Value Types

#### Address

- Address is a 20 byte value with member functions, which include:
  - Balance - Queries the balance of the address
  - Transfer - Transfers Ether (in units of Wei) to the address
  - Send - A low level counterpart to transfer (recommended to use transfer instead of send)
  - Call - Can be used to call other contracts. It returns true if the function terminated successfully or false if an exception was encountered.
    - Uses .gas() or .value() modifiers to specify them
  - Callcode - Use delegatecall() instead.
  - Delegatecall - Delegates a function call to the specified address, maintaining all aspects of the calling address (storage, balance, etc.)

#### Byte Array

- Byte arrays are arrays of bytes.
- Fixed size byte arrays are defined with byte followed by a number (1 - 32), `byte[4] variableName`
  - `.length` returns the length of the byte array
  - It is cheaper to use dynamic arrays
- Dynamicaly sized byte arrays are defined by bytes equivalent to `byte[]`

#### Enums

- Enumerations is a user defined type
  - Enums are explicitly convertible to integer types
  - Require a least one member, cannont be empty

#### Function

- Function type is used to pass parameters to other functions or return functions
  - This type is not to be confused with function declarations.
  - Can be internal or external
    - Internal - Can only be called from their contract, included library, or inherited functions.
    - External - Consist of an address and function signature.

### Reference Types

#### Arrays

- Defined as either a fixed or dynamic size and can be allocated to storage or memory.
  - Storage arrays can be any data type
  - Memory arrays can be anything but a mapping
- Arrays have two methods, `.length`, and `.push()`
- Creating arrays of variable length in memory require using the `new` keyword
  - `uint[] memory a = new uint[] (<variable length>)`
  - Once an array is defined it is a fixed size but the variable length can be determined at runtime.

#### Structs

- A way to define new type
- struct can contain data types of different kinds, but cannot contain other structs.
- Struct values stored as local vairables in functions are not copied, they are passed by reference.

### Mappings

- Declared by `mapping(_KeyType => _ValueType)`
- `_KeyType` can be any type but mapping, dynamic array, contract, enum or struct
- `_ValueType` can be any type
- Mappings are essentially hashtable

  - Every `_KeyType` is initialized to a `_ValueType` when it is defined, by default all keys match some value.
  - As a result, mappings have no length
  - Key data is not stored in the mapping, instead its keccack256 hash is.
  - When the mapping is invoked the `_KeyType` is assigned to some `_ValueType`.

    - In the following example the `counters` mapping will take the `msg.senders` as a `_KeyType` and map that address to each of the new addresses (`_ValueType`) created whenever a new Counter contract is created:

      ```
      contract CounterFactory {

          mapping(address => address) counters;

          function createCounter() public {
              if (counters[msg.sender] == 0) {
                  counters[msg.sender] = new Counter(msg.sender);
              }
          }

          function increment() public {
              require (counters[msg.sender] != 0);
              Counter(counters[msg.sender]).increment(msg.sender);
          }

          function getCount(address account) public constant returns (uint) {
              if (counters[account] != 0) {
                  return (Counter(counters[account]).getCount());
              }
          }
      }
      ```

    ```

    ```

- A mapping declared public will create a getter requiring the `_KeyType` as a parameter and return the `_ValueType`.

### Units

- Solidity recognizes wei, finney, szabo, and ether as units of ether

### Global Variables

- Commonly used variables include:
  - `msg.value` (uint): number of wei sent with a message
  - `msg.sender` (address): sender of the message (current call)
  - `msg. gas` (uint): remaining gas

## Functions

- When defining a function we also define the parameters and the funcitons accessibility.
  - There are 4 accessibility modifiers:
    1.  Public - Has no restrictions
    2.  External - Only accessible from outside the contract
    3.  Private - Only accessible from this contract.
    4.  Internal - Can be accessed by this contract or any derivative contract
- If a function returns a value it must be declared in the function signature

### Constant Function

- Constant Function is a function that does not alter state
  - Function will not emit events, creat other contracts, selfdestruct, send ether, call any function not marked pure or view, use low-level calls, or use inline assembly that contains opcodes

### Pure Function

- Pure Function is a function that does not read or modify the state.
  - State reads include:
    - Reading from state variables
    - Accessing this.balance or <address>.balance
    - Accessing any of the members of block, tx, msg
    - Calling any function not marked pure
    - Using inline assembly that contains certain opcodes

### Payable Function

- Payable Function are functions that handle ether
  - function must be marked payable!
  - `function deposit() public payable { balance += msg.value; }`

### Exceptions

- Throwing an exception will automatically revert the state

### Function Modifiers

- Function modifiers allow for checks that can be used across functions, they can be defined with the keyword modifier

### Fallback Function

- Fallback function is an unnamed function that does not return anything, nor does it take an arguement. It is a security feature that is called if the given function identifier does not match any functions defined by the contract.

### Overloaded Function

- Functions can also be overloaded (have the same name) as long as they take different arguements.

## Storage and Memory

### Storage

- Storage and memory is analogous to the harddrive and RAM on a computer
- The contract storage is stored on the blockchain and persists across executions
- All contract state variables reside in storage
- Every contract has its own storage and variables persist between function calls.
- Storage is expensive because variables are written to every node.

### Memory

- Only perists for the duration of the function call
- When the function terminates the function in memory no longer exists
- Memory is cheaper than storage

### Call Stack

- Used to hold local variables, but is limited in the amount of information it can hold.
- This method is the cheapest

### Key Concepts

- Data location will vary depending on the variable type
- Bugs can result in poor assumptions regarding where a variable is stored
- For most types, location cannot be specified, the exceptions being Arrays and Structs
- The following are the locations for each data type:
  - Storage - State Variables
  - Memory - Function Arguements
  - Call Stack - Structs, Arrays, Mappings
- Using the `memory` keyword Arrays and Structs can be assigned to memory

## Contract Structure

- Solidity is similar to other OOP languages, contracts are similar to Java Classes
- Every contract contains the following:
  - Pragma, indicates the compiler version
  - Contract Declaration, `contract ContractExample {}`
  - State Variable Declaration
  - Events, name events so they are clearly identified as such
  - Function Modifiers
  - Functions
- It is also possible to write inline assembly (EVM Bytecode) which provides more control over the EVM stack.

## Smart Contract ABI

- The Application Binary Interface (ABI) is the standard way to interact with contracts from outside the blockchain as well as contract to contract. It provides us with a way of encoding Solidity contract calls as well as decoding the data being read from transactions.
- The ABI and bytecode are created when a solidity contract is compiled.
  ![Contract To ABI](/images/contract2ABI.png)
- An ABI is essentially a list of the contracts functions and their arguements and allows the a user to access the binary data in the contract.
- Data is encoded according to its type, as described in this specification. The encoding is not self describing and thus requires a schema in order to decode.
- The ABI is a translation for the bytecode and provides a specification for how the bytecode and web3 are supposed to communicate.

## Events and Logs

- Events can be used for three primary reason:
  - Provide a mechanism in which a Javascript callback can be called in the user interface of a DApp that listens for a given event.
    - When web3 submits a contract call as a transaction a function cannot return a value.
    - Transactions dont return values to the frontend because they are not immediately mined/ included in the blockchain.
    - Instead the transaction hash is returned.
  - Asynchronous triggers with data
    - "...When a contract wants to trigger the frontend, the contract emits an event. As, the frontend is watching for events, it can take actions, display a message, etc..."
  - Cheap form of storage
- When an event is called the arguements are stored in the transactions log, a special data structure in the blockchain.
- A log is associated with the address of the contract and remains persistent on the blockchain.
- Events and Logs are not available from inside of the contract.

## Resources

### Data Types and Variables

[Data Types - Solidity Docs](https://solidity.readthedocs.io/en/latest/types.html)

[How does Mapping in solidity work?](https://ethereum.stackexchange.com/questions/9893/how-does-mapping-in-solidity-work#)

### Functions

[Functions - Solidity Docs](https://solidity.readthedocs.io/en/v0.4.21/contracts.html#functions)

### Storage and Memory

[Storage, Memory and the Stack - Solidity Docs](https://solidity.readthedocs.io/en/v0.4.21/introduction-to-smart-contracts.html#storage-memory-and-the-stack)

### Smart Contract ABI

[Application Binary Interface Specification](https://solidity.readthedocs.io/en/v0.4.21/abi-spec.html)

### Events and Logs

[Technical Introduction to Events and Logs in Ethereum](https://media.consensys.net/technical-introduction-to-events-and-logs-in-ethereum-a074d65dd61e)

[Solidity Events - BitDegree](https://www.bitdegree.org/learn/solidity-events/)
