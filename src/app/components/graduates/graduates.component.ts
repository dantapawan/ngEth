import { Component, OnInit } from '@angular/core';
// import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-graduates',
  templateUrl: './graduates.component.html',
  styleUrls: ['./graduates.component.css']
})
export class GraduatesComponent implements OnInit {


  _imgSrc = '';
  _txnInputData = '';

 constructor() { }

 ngOnInit() {

 }

public downloadfile() {
     this._imgSrc = 'https://ipfs.io/ipfs/' + this._txnInputData;
}

}













  // firstName: any;
  // middleName: any;
  // lastName: any;
  // branch: any;
  // college: any;
  // address: any;
  // university: any;



  // constructor() {

  //   this.firstName = 'firstnamedummy';
  //   this.middleName = 'lastnamedummy';
  //   this.lastName = 'lastNamedummy';
  //   this.branch = 'branchdummy';
  //   this.college = 'collegedummy';
  //   this.address = 'addressdummy';
  //   this.university = 'universitydummy';

  // }






