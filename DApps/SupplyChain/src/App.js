import React, { Component } from 'react';
import SupplyChainContract from '../build/contracts/SupplyChain.json';
import getWeb3 from './utils/getWeb3';

import './css/oswald.css';
import './css/open-sans.css';
import './css/pure-min.css';
import './App.css';

class App extends Component {
    constructor() {
        super();

        this.state = {
            inventory: [],
            contractInstance: '',
            sku: '',
            name: '',
            price: '',
            web3: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.getInventory = this.getInventory.bind(this);
        this.addItem = this.addItem.bind(this);
        this.buyItem = this.buyItem.bind(this);
        this.shipItem = this.shipItem.bind(this);
        this.receiveItem = this.receiveItem.bind(this);
    }

    componentWillMount() {
        getWeb3
            .then((results) => {
                this.setState({
                    web3: results.web3
                });

                this.instantiateContract();
            })
            .catch(() => {
                console.log('Error finding web3.');
            });
    }

    handleChange(key, value) {
        this.setState({
            [key]: value
        });
    }

    instantiateContract() {
        const contract = require('truffle-contract');
        const SupplyChain = contract(SupplyChainContract);
        SupplyChain.setProvider(this.state.web3.currentProvider);

        this.setState({ contractInstance: SupplyChain });
    }

    getInventory(event) {
        event.preventDefault();
        const { contractInstance, sku } = this.state;

        contractInstance
            .deployed()
            .then((instance) => {
                return instance.fetchItem(sku);
            })
            .then((result) => {
                const { inventory } = this.state;
                var name = result[0];
                var sku = result[1].c[0];
                var price = result[2].c[0];
                var state = result[3].c[0];
                var seller = result[4];
                var buyer = result[5];

                var item = {
                    Name: name,
                    SKU: sku,
                    Price: price,
                    State: state,
                    Seller: seller,
                    Buyer: buyer
                };

                inventory.push(item);

                console.log(inventory);

                return this.setState({
                    inventory: inventory
                });
            });
    }

    addItem(event) {
        event.preventDefault();
        const { web3, contractInstance, name, price } = this.state;

        web3.eth.getAccounts((error, accounts) => {
            const user = accounts[0];

            contractInstance.deployed().then((instance) => {
                return instance.addItem(name, price, { from: user });
            });
        });

        this.setState({
            name: '',
            price: ''
        });
    }

    buyItem(event) {
        event.preventDefault();
        const { web3, contractInstance, sku } = this.state;

        web3.eth.getAccounts((error, accounts) => {
            const user = accounts[0];

            contractInstance.deployed().then((instance) => {
                return instance.buyItem(sku, { from: user });
            });
        });
    }

    shipItem(event) {
        event.preventDefault();
        const { web3, contractInstance, sku } = this.state;

        web3.eth.getAccounts((error, accounts) => {
            const user = accounts[0];

            contractInstance.deployed().then((instance) => {
                return instance.shipItem(sku, { from: user });
            });
        });
    }

    receiveItem(event) {
        event.preventDefault();
        const { web3, contractInstance, sku } = this.state;

        web3.eth.getAccounts((error, accounts) => {
            const user = accounts[0];

            contractInstance.deployed().then((instance) => {
                return instance.receiveItem(sku, { from: user });
            });
        });
    }

    render() {
        const { inventory } = this.state;

        const displayInventory = inventory.map((elem, i) => {
            return (
                <div key={i}>
                    <p>Name: {elem.Name}</p>
                    <p>SKU: {elem.SKU}</p>
                    <p>Price: {elem.Price} wei</p>
                </div>
            );
        });

        return (
            <div className="App">
                <nav className="navbar pure-menu pure-menu-horizontal">
                    <h1 style={{ color: 'white' }}>Supply Chain DApp</h1>
                </nav>

                <main className="container">
                    <div className="pure-g">
                        <div className="pure-u-1-1">
                            <br />
                            <br />
                            <h2>Objective: </h2>
                            <p>Coming soon...</p>
                            <h3>Create a New Item</h3>
                            <form onSubmit={(e) => this.addItem(e)}>
                                <label>
                                    Item Name: <br />
                                    <input
                                        value={this.state.name}
                                        onChange={(e) =>
                                            this.handleChange(
                                                'name',
                                                e.target.value
                                            )
                                        }
                                    />
                                </label>
                                <br />
                                <label>
                                    Price (wei): <br />
                                    <input
                                        value={this.state.price}
                                        onChange={(e) =>
                                            this.handleChange(
                                                'price',
                                                e.target.value
                                            )
                                        }
                                    />
                                </label>
                                <br />
                                <input type="submit" value="Submit" />
                            </form>
                            <h3>Buy an Item</h3>
                            <form onSubmit={(e) => this.buyItem(e)}>
                                <label>
                                    Item SKU: <br />
                                    <input
                                        onChange={(e) =>
                                            this.handleChange(
                                                'sku',
                                                e.target.value
                                            )
                                        }
                                    />
                                </label>
                                <br />
                                <input type="submit" value="Submit" />
                            </form>
                            <h3>Ship Item (Seller Only)</h3>
                            <form onSubmit={(e) => this.shipItem(e)}>
                                <label>
                                    Item SKU: <br />
                                    <input
                                        onChange={(e) =>
                                            this.handleChange(
                                                'sku',
                                                e.target.value
                                            )
                                        }
                                    />
                                </label>
                                <br />
                                <input type="submit" value="Submit" />
                            </form>
                            <h3>Mark as Received (Buyer Only)</h3>
                            <form onSubmit={(e) => this.receiveItem(e)}>
                                <label>
                                    Item SKU: <br />
                                    <input
                                        onChange={(e) =>
                                            this.handleChange(
                                                'sku',
                                                e.target.value
                                            )
                                        }
                                    />
                                </label>
                                <br />
                                <input type="submit" value="Submit" />
                            </form>
                            <h3>Search for an Item</h3>
                            <form onSubmit={(e) => this.getInventory(e)}>
                                <label>
                                    Item SKU: <br />
                                    <input
                                        onChange={(e) =>
                                            this.handleChange(
                                                'sku',
                                                e.target.value
                                            )
                                        }
                                    />
                                </label>
                                <br />
                                <input type="submit" value="Submit" />
                                {displayInventory}
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default App;
