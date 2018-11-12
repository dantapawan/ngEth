import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-recruiters',
  templateUrl: './recruiters.component.html',
  styleUrls: ['./recruiters.component.css']
})
export class RecruitersComponent implements OnInit {

   _imgSrc = '';
   _txnInputData = '';

  constructor() { }

  ngOnInit() {

  }

 public downloadfile() {
      this._imgSrc = 'https://ipfs.io/ipfs/' + this._txnInputData;
  }



}
