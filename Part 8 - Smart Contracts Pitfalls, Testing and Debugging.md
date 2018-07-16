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

## Resources

### Writing Tests

[Testing For Throws in Truffle Solidity Tests](https://truffleframework.com/tutorials/testing-for-throws-in-solidity-tests)

### Tradeoffs between Engineering and Security

[Ethereum Smart Contract Security Best Practices](https://consensys.github.io/smart-contract-best-practices/)

[Common Bugs/Attacks and Best Practices](https://sunnya97.gitbooks.io/a-beginner-s-guide-to-ethereum-and-dapp-developme/smart-contract-best-practices.html)
