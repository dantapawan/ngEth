import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  roleSelectedOption = '';
  selectedRole: any;
  roles: Array<any>;

  constructor() { }

  ngOnInit() {
    this.roles = [
      { id: '', name: 'Select Your Role'},
      { id: 1, name: 'Graduates' },
      { id: 2, name: 'Recruiters' },
      { id: 3, name: 'Institutions' }
    ];
    this.selectedRole = '';
  }

  onRoleSlected(value: any) {
    if (value === 'Graduates') {
      this.roleSelectedOption = 'Graduates';
    } else if (value === 'Recruiters') {
      this.roleSelectedOption = 'Recruiters';
    } else if (value === 'Institutions') {
      this.roleSelectedOption = 'Institutions';
    }
  }
}
