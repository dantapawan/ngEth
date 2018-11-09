import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-recruiters',
  templateUrl: './recruiters.component.html',
  styleUrls: ['./recruiters.component.css']
})
export class RecruitersComponent implements OnInit {

   _imgSrc: any;

  constructor() { }

  ngOnInit() {
  }

  // tslint:disable-next-line:member-ordering
  submitted = false;

  // tslint:disable-next-line:member-ordering
  form = new FormGroup(
    {
      documentHash: new FormControl('', [Validators.required])
    },
    { updateOn: 'submit' }
  );

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
  }
  // public getTransactionInputData(txnCode: string) {
  //   this._ethContractService.getTransactionInputData(txnCode)
  //   .then(result => this._txnInputData = result);
  // }

  // public downloadfile(documentHash: string) {
  //   console.log('Image data', _documentHash);
  //   this._imgSrc = 'https://ipfs.io/ipfs/' + _documentHash;
  // }



}
