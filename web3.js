import Web3 from 'web3';

const web3Provider = new Web3.providers.HttpProvider('https://ropsten.infura.io/RbLkBm9kjrdxyP9brVBZ');
//const web3Provider = new Web3.providers.HttpProvider("http://localhost:8545");
//const web3Provider = new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws/v3/ff18c636fc40454fa94331defd2a5248');
let web3 = new Web3(web3Provider);

export default web3;