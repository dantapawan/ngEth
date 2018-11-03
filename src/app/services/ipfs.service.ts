import { Injectable } from '@angular/core';


declare var require: any;
declare const Buffer;

const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });


@Injectable()
export class IpfsService {

  constructor() {
  }

  uploadFileToIPFS = (fileObj) => {
    let hashResult = this.convertToByteArray(fileObj).then(function (result) {
      return new Promise((resolve, reject) => {
        ipfs.files.add(Buffer.from(result), (error, result) => {
          if (error) {
            console.log(error);
            reject(error);
          } else {
            console.log('hashCode', result[0].hash);
            resolve(result[0].hash);
          }
        });
      });
    });
    return hashResult;
  }


  convertToByteArray(file): Promise<any> {
    var reader = new FileReader();
    var future = new Promise((resolve, reject) => {
      reader.addEventListener("load", function () {
        resolve(reader.result);
      }, false);

      reader.addEventListener("error", function (event) {
        reject(event);
      }, false);

      reader.readAsArrayBuffer(file);
    });
    return future;
  }
}

