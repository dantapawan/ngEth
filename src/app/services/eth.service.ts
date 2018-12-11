import { Injectable } from '@angular/core';
import web3 from '../../../web3';
import StudCertRegistry from '../../../contracts/StudentCertificateRegistry';
//import StudCert from '../../../contracts/StudentCertificate';

import StudCert from '../build/contracts/StudCert.json';
//import StudCertRegistry1 from '../../../build/contracts/StudCertRegistry.json';

let StudCertRegistry1 = require('../../../build/contracts/StudCertRegistry.json');



var Tx = require('ethereumjs-tx');
//var coder = require('web3/lib/solidity/coder');
var CryptoJS = require('crypto-js');



declare let require: any;
//declare const Buffer;
let ipfsFileStorage = require('../../../build/contracts/IPFSFileStorage.json');
let InputDataDecoder = require('ethereum-input-data-decoder');
let eventName = 'studContractCreated';
var _privateKey ='041578e19ef784a3cf8d6340b26261fc1c554d1942b34da2141f3b2929c75db5';
var _defaultAcct = '0x9496E4064A7f840B03238853E93051Cc6d20fF8a';
  var _contractAddress = '0x587860155ebc52176cff327702b703f12633fe0f';
  //var _contractAddress = '0x5b6cc69e6c1d3e884a9fabffab128e854a681d41';
  var ownerPrivate ='0x041578e19ef784a3cf8d6340b26261fc1c554d1942b34da2141f3b2929c75db5';


@Injectable()
export class EthService {

 
  
  //ropsten
  
  

  private _decoder: any;

  constructor() {
    web3.eth.defaultAccount = _defaultAcct;
    this._decoder = new InputDataDecoder(ipfsFileStorage.abi);
    
  }


 

 createSudentCertificate(_ipfsHashCode: string, _studentId: string, _collegeId: string
  , _firstName: string, _lastName: string, _middleName: string): Promise<any> {
  return new Promise((resolve, reject) => {
    
    var gasPrice = web3.utils.toHex(web3.eth.gasPrice);
    var gasLimitHex = web3.utils.toHex(3000000);
   
    let date = (new Date()).getTime();
   
   
    var contract = new web3.eth.Contract(StudCertRegistry1.abi, _contractAddress);
    
    var transfer = contract.methods.createStudCert('Hello' , 'F1','L1', 'M1',  'S1', 'C1', date);
    var encodedData = transfer.encodeABI();
    var gas = web3.utils.toWei('20', 'gwei')
    var tx = {
      from: web3.eth.defaultAccount,
      to: _contractAddress,
      gasPrice: web3.utils.toHex(gas),
      gasLimit: gasLimitHex,
      data: encodedData,
      value: "0x0"
    }; 

  
  web3.eth.accounts.signTransaction(tx, ownerPrivate, function(err, signed){
    if(err) {
      console.log("signTransaction err: "+err);
    }
    web3.eth.sendSignedTransaction(signed.rawTransaction, function(err, res){
      if(err) {
        console.log("sendSignedTransaction  err: "+err);
      }        
        console.log("Transaction  Successfull: "+res);
    });
});


  });

}





  storeIpfsCode(ipfsHashCode: string): Promise<any> {
    return new Promise((resolve, reject) => {
      var functionName = 'set';
      var types = ['string'];
      var args = [ipfsHashCode];
      var fullName = functionName + '(' + types.join() + ')';
      var signature = CryptoJS.SHA3(fullName, { outputLength: 256 }).toString(CryptoJS.enc.Hex).slice(0, 8);
      var dataHex = signature ;//+ coder.encodeParams(types, args);
      var data = '0x' + dataHex;

      var nonce = web3.toHex(web3.eth.getTransactionCount(web3.eth.defaultAccount))
      var gasPrice = web3.toHex(web3.eth.gasPrice);
      var gasLimitHex = web3.toHex(3000000);
      var rawTx = { 'nonce': nonce, 'gasPrice': 2408182, 'gas': gasLimitHex, 'from': web3.eth.defaultAccount, 'to': _contractAddress, 'data': data}
      var tx = new Tx(rawTx);
      tx.sign(Buffer.from(_privateKey, 'hex'));
      var serializedTx = '0x' + tx.serialize().toString('hex');
      return web3.eth.sendRawTransaction(serializedTx, function(err, txHash){
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
      var transaction = web3.eth.getTransaction(txnHash);
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

  /* createSudentCertificate(_ipfsHashCode: string, _studentId: string, _collegeId: string
    , _firstName: string, _lastName: string, _middleName: string): Promise<any> {
      var _ipfsHashCode = '45dsfret';
    return new Promise((resolve, reject) => {
      var functionName = 'CC2';
      var types = ['string', 'string', 'string', 'string', 'string', 'string', 'uint256'];
      var args = [_ipfsHashCode, _studentId, _collegeId, _firstName, _lastName, _middleName, 0];
      var fullName = functionName + '(' + types.join() + ')';
      var signature = CryptoJS.SHA3(fullName, { outputLength: 256 }).toString(CryptoJS.enc.Hex).slice(0, 8);
      var dataHex = signature;// + coder.encodeParams(types, args);
      var data = '0x' + dataHex;

      var nonce = web3.toHex(web3.eth.getTransactionCount(web3.eth.defaultAccount))
      var gasPrice = web3.toHex(web3.eth.gasPrice);
      var gasLimitHex = web3.toHex(6000000);
      var rawTx = { 'nonce': nonce, 'gasPrice': gasPrice, 'gas': gasLimitHex, 'from': web3.eth.defaultAccount, 'to': _contractAddress, 'data': data}
      var tx = new Tx(rawTx);
      tx.sign(Buffer.from(_privateKey, 'hex'));
      var serializedTx = '0x' + tx.serialize().toString('hex');
      return web3.eth.sendRawTransaction(serializedTx, function(err, txHash){
        if (err) {
          console.log(err);
          return reject(err);
        } else {
          console.log(txHash);
          web3.events.studContractCreated((err, events) => {
            if(err) {
              console.log('err --', err);
            } else{
              console.log('events --', events);
            }
            
          });
          return resolve(txHash);
        }
      });
    });

  } */








}

