## Writing Tests

-   Testing using the Truffle framework can be done with Javascript and Solidity
-   By testing in Solidity there are a number of advantages including being able to test Contract-to-Contract interactions.
    -   [A drawback here is being able to test whether a function throws without breaking the test...](https://truffleframework.com/tutorials/testing-for-throws-in-solidity-tests)

### Unit Testing

-   Tests allow us to verify the contract is behaviing as expected.
-   When writing tests, it is important to consider the full range of inputs possible as well as any edge cases.
-   Testing is not about bug finding but rather a way of defining correct behavior and ensuring that the contract executes accordingly.

## Smart Contract Best Practices

-   Contrary to most Software Engineering enviroments smart contracts are hard to change and have a high cost of failure.
    -   The best approach is to move slowly and carefully

### Keep in mind...

-   Bugs are inevitable, so prepare for them.
    -   Leverage Circuit Breaker design pattern
    -   Manage the amount at risk with rate limits or caps
    -   Setup effective upgrade path for bug fixes and updates.
-   Roll out with caution
    -   Take advantage of bug bounties and testing tools
    -   Get contracts audited by 3rd parties
-   When possible opt for less complexity, as this usually leads to less bugs.
-   Use audited / hardened code whenever possible.
-   Write code that is human readable
-   Only use the blockchain when necessary.

### Understand the enviroment

-   Be cautious when calling external contracts
-   Contract functions are public and can be called in ways that arent intended.

### Tradeoffs between Engineering and Security

-   In general short lived contracts should favor security
-   Rigidity vs Upgradability
    -   Upgradability is great from an engineering perspective but amplifies the amount of vulnerabilities in code.
    -   Contracts that have a defined lifespan and are relatively simple, upgradability is likely not a conecern.
-   Monolithic vs Modular
    -   Self contained contracts make reviewing the contract much easier.
    -   Modular code is typically easier to maintain from and engineering standpoint.
-   Code Duplication vs Reuse
    -   Whenever possible use hardened, proven code rather than rolling your own.

## Security In-Depth

-   When writing smart contracts there are known design patterns that are recommended...

### External Calls

-   Be very careful when making calls to other contracts as they can expose you to several unexpected risks or errors. If this is unavoidable the following should be done:

#### Make an untrusted contract

-   Name varibales and contract interfaces in a way that makes it clear that interacting with them is potentially unsafe i.e. makeWithdrawl() and makeUntrustedWithdrwal().

#### Avoid state changes after external calls

-   Regardless if you are making a raw or contract call assume a security risk is being exposed on execution. Malicious code can be executed by any contracts it calls i.e. Contract A calls Contract B, Contract B is clean but it calls Contract C which contains malicious code, therefore Contract A is at risk.
-   Malicious code can force race conditions by altering control flow of the contract.
-   If a call to an untrusted external contract is made, avoid state changes after the call. This pattern is known as the [checks-effects-interactions pattern](http://solidity.readthedocs.io/en/develop/security-considerations.html?highlight=check%20effects#use-the-checks-effects-interactions-pattern)

#### Understand the trade-offs between .send(), .transfer(), and call.value()

-   .send() and .transfer() are considered safe against [reentrancy](https://consensys.github.io/smart-contract-best-practices/known_attacks/#reentrancy), or attacks where a function can be called multiple times before the first invocation has been finished.

-   Although .send() and .transfer() prevent reentrancy they are incompatiable with any contract whose fallback function requires more than 2,300 gas. This is because the contract is given a gas limit of 2,300 when these functions are called.
    -   This can be remedied by using a [push and pull](https://consensys.github.io/smart-contract-best-practices/recommendations/#favor-pull-over-push-for-external-calls) mechanism.

#### Handle errors in external calls

-   Low-level methods such as .call(), .callcode(), .delegatecall(), and .send() will not return false in the case an exception is thrown. It is important to handle this explicitly.

#### Favor pull over push for external calls

-   External contract calls can fail accidently or deliberatly, to mitigate risk it is important to isolate each external call such that it can be initiated by the recipient of the call. In the case of payments this would allow users to withdraw funds rather than having funds pushed to them automatically.
-   Avoid using multiple .send() calls in a single transaction.

### On-Chain Data is Public Data!

-   Certain applications require that private data is not exposed during a specific amount of time i.e. Rock-Paper-Scissors. It is important not to publish this information before the appropiate time.
-   In the case of RPS, a hash of the players move is submitted to the contract but not the blockchain, then when the time is right, the players reveal their moves. If the move the player submitted to the contract does not match their revealed move the answer is thrown out and the player is disqualified.

### To be continued...

## Resources

### Writing Tests

[Testing For Throws in Truffle Solidity Tests](https://truffleframework.com/tutorials/testing-for-throws-in-solidity-tests)

### Tradeoffs between Engineering and Security

[Ethereum Smart Contract Security Best Practices](https://consensys.github.io/smart-contract-best-practices/)

[Common Bugs/Attacks and Best Practices](https://sunnya97.gitbooks.io/a-beginner-s-guide-to-ethereum-and-dapp-developme/smart-contract-best-practices.html)
