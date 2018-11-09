import { Component, OnInit, Injectable } from '@angular/core';
import { IpfsService } from '../../services/ipfs.service';
import { EthService } from '../../services/eth.service';
// tslint:disable-next-line:no-unused-expression
// import { loading-spinner } from '../loading-spinner/loading-spinner.service';

import { Observable } from 'rxjs/Rx';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs/observable/from';
// import { LoadingSpinnerService } from '../loading-spinner/loading-spinner.service';


@Component({
  selector: 'app-ipfs',
  templateUrl: './ipfs.component.html',
  styleUrls: ['./ipfs.component.css']
})


export class IpfsComponent implements OnInit {

  _fileToUpload: File;
  _fileHashCode: any;
  _txnCode: any;
  _imgSrc: string;
  _txnInputData: any;

  studentForm = new FormGroup(
		{
			firstName: new FormControl('', [ Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      middleName: new FormControl('', Validators.required),
      branch: new FormControl('', [ Validators.required]),
      college: new FormControl('', [Validators.required]),
      address: new FormControl('', Validators.required),
      university: new FormControl('', [Validators.required]),
      city: new FormControl('', Validators.required)
		},
		{ updateOn: 'submit' }
  );

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.studentForm.controls['firstName'].setValue(params._firstName);
      this.studentForm.controls['lastName'].setValue(params._lastName);
      this.studentForm.controls['branch'].setValue(params._branch);
      this.studentForm.controls['college'].setValue(params._college);
      this.studentForm.controls['university'].setValue(params._university);

    });
  }

  constructor(
    private _ipfsService: IpfsService,
    private _ethContractService: EthService,
    private route: ActivatedRoute,
    // private loading-spinnerservice: LoadingSpinnerService
    ) {

  }



  public onFileSelected(event) {
    this._fileToUpload = event.target.files[0];
    console.log(this._fileHashCode);
  }

  public upload() {
      this._ipfsService.uploadFileToIPFS(this._fileToUpload)
     .then(result => this._fileHashCode = result);
  }

  public storeIpfsCode(ipfsHashCode: string) {
    console.log('ipfs', ipfsHashCode);
    this._ethContractService.storeIpfsCode(ipfsHashCode)
    .then(result => this._txnCode = result);
  }

  public getTransactionInputData(txnCode: string) {
    this._ethContractService.getTransactionInputData(txnCode)
    .then(result => this._txnInputData = result);
  }

  public downloadfile(_txnInputData: string) {
    console.log('Image data', _txnInputData);
    this._imgSrc = ' https://ipfs.io/ipfs/' + _txnInputData;
  }

  public onSubmit() {

  }

}
