import { Injectable } from '@angular/core';
import * as TruffleContract from 'truffle-contract';
import { resolve, reject } from 'q';

var Web3 = require('web3');
var Tx = require('ethereumjs-tx');
var coder = require('web3/lib/solidity/coder');
var CryptoJS = require('crypto-js');



declare let require: any;
declare let window: any;
declare const Buffer;
let ipfsFileStorage = require('../../../contracts/IPFSFileStorage.json')
let InputDataDecoder = require('ethereum-input-data-decoder');
//let decoder = new InputDataDecoder(ipfsFileStorage);


@Injectable()
export class EthService {

  private _account: string = null;
  private _web3Provider: null;
  private _web3: any;
  private _contractAddress = '0x230e256190df62fc556b84c9db65ca24f6b91d62';
  private _ipfsFileStorageContract: any;
  private _defaultAcct = '0x97BA81c5aBac558c8BE1e8615300530a7492cF8A';
  private _privateKey = '85afc86cfbcf1245bbb50a6cd24cbb4a42c9c231c729ba26b80eb11bd50ffcdd';
  private _decoder: any;

  constructor() {
    this._web3Provider = new Web3.providers.HttpProvider('https://ropsten.infura.io/RbLkBm9kjrdxyP9brVBZ');
    this._web3 = new Web3(this._web3Provider);
    this._ipfsFileStorageContract = this._web3.eth.contract(ipfsFileStorage.abi).at(this._contractAddress);
    this._web3.eth.defaultAccount = this._defaultAcct;
    this._decoder = new InputDataDecoder(ipfsFileStorage.abi);
  }


  storeIpfsCode(ipfsHashCode: string): Promise<any> {
    return new Promise((resolve, reject) => {
      var functionName = 'set';
      var types = ['string'];
      var args = [ipfsHashCode];
      var fullName = functionName + '(' + types.join() + ')';
      var signature = CryptoJS.SHA3(fullName, { outputLength: 256 }).toString(CryptoJS.enc.Hex).slice(0, 8);
      var dataHex = signature + coder.encodeParams(types, args);
      var data = '0x' + dataHex;

      var nonce = this._web3.toHex(this._web3.eth.getTransactionCount(this._web3.eth.defaultAccount))
      var gasPrice = this._web3.toHex(this._web3.eth.gasPrice);
      var gasLimitHex = this._web3.toHex(300000);
      var rawTx = { 'nonce': nonce, 'gasPrice': gasPrice, 'gasLimit': gasLimitHex, 'from': this._web3.eth.defaultAccount, 'to': this._contractAddress, 'data': data}
      var tx = new Tx(rawTx);
      tx.sign(Buffer.from(this._privateKey, 'hex'));
      var serializedTx = '0x' + tx.serialize().toString('hex');
      return this._web3.eth.sendRawTransaction(serializedTx, function(err, txHash){
        if (err) {
          console.log(err);
          return reject(err);
        } else {
          console.log(txHash);
          return resolve(txHash);
        }
      });
    });

  }

  getTransactionDetails(txnHash: string): Promise<any>  {
    return new Promise(resolve => {
      var transaction = this._web3.eth.getTransaction(txnHash);
      resolve(transaction);
    });
  }

  getTransactionInputData(txnHash: string) {
    return new Promise((resolve, reject) => {
      this.getTransactionDetails(txnHash).then((transaction) => {
        const data = this._decoder.decodeData(transaction.input);
        console.log('TX input data ', data.inputs[0]);
        return resolve(data.inputs[0]);
      }, function(error) {
        console.log('Error getting TX input data ', error);
        return reject(error);
      });
    });
  }

}

