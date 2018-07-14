import React, { Component } from 'react';
import SimpleStorageContract from '../build/contracts/SimpleStorage.json';
import getWeb3 from './utils/getWeb3';

import './css/oswald.css';
import './css/open-sans.css';
import './css/pure-min.css';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            storageValue: 0,
            newStorageValue: '',
            contractInstance: '',
            web3: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.setStorageValue = this.setStorageValue.bind(this);
    }

    componentWillMount() {
        // Get network provider and web3 instance.
        // See utils/getWeb3 for more info.

        getWeb3
            .then((results) => {
                this.setState({
                    web3: results.web3
                });

                // Instantiate contract once web3 provided.
                this.instantiateContract();
            })
            .catch(() => {
                console.log('Error finding web3.');
            });
    }

    instantiateContract() {
        /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */
        const contract = require('truffle-contract');

        var simpleStorage = contract(SimpleStorageContract);
        simpleStorage.setProvider(this.state.web3.currentProvider);

        this.setState({
            contractInstance: simpleStorage
        });

        // Declaring this for later so we can chain functions on SimpleStorage.
    }

    handleChange(key, value) {
        this.setState({
            [key]: value
        });
    }

    setStorageValue() {
        const { contractInstance, newStorageValue } = this.state;

        var simpleStorageInstance;

        // Get accounts.
        this.state.web3.eth.getAccounts((error, accounts) => {
            contractInstance
                .deployed()
                .then((instance) => {
                    console.log(instance, accounts);
                    simpleStorageInstance = instance;

                    return simpleStorageInstance.set(newStorageValue, {
                        from: accounts[0]
                    });
                })
                .then((result) => {
                    // Get the value from the contract to prove it worked.
                    console.log(result);
                    return simpleStorageInstance.get.call(accounts[0]);
                })
                .then((result) => {
                    // Update state with the result.
                    console.log(result);
                    return this.setState({ storageValue: result.c[0] });
                });
        });
    }

    render() {
        return (
            <div className="App">
                <nav className="navbar pure-menu pure-menu-horizontal">
                    <h1 style={{ color: 'white' }}>Simple Storage DApp</h1>
                </nav>

                <main className="container">
                    <div className="pure-g">
                        <div className="pure-u-1-1">
                            <br />
                            <br />
                            <h2>Objective: </h2>
                            <p>
                                Change the stored value of the contract by
                                setting a value in the input box.
                            </p>
                            <input
                                onChange={(e) =>
                                    this.handleChange(
                                        'newStorageValue',
                                        e.target.value
                                    )
                                }
                            />
                            <button onClick={this.setStorageValue}>
                                Submit
                            </button>
                            <p>
                                The stored value is: {this.state.storageValue}
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default App;
