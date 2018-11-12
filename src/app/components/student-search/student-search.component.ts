import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-search',
  templateUrl: './student-search.component.html',
  styleUrls: ['./student-search.component.css']
})
export class StudentSearchComponent implements OnInit {
  _students: Observable<any[]>;
  _columns: string[];
  _firstName: string;

  form = new FormGroup(
    {
      firstName: new FormControl('', [Validators.email, Validators.required]),
      lastName: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      branch: new FormControl('', Validators.required),
      collage: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required)
    },
    { updateOn: 'submit' }
  );

  constructor(private _studentService: StudentsService
      , private _router: Router) { }

  ngOnInit() {
    this._columns = this._studentService.getColumns();
    this._students = this._studentService.getStudents();
  }

  public selectedStudent(student: any) {
    this._router.navigate(['ipfs', {_firstName: student.firstName, _lastName: student.lastName, _dob: student.dob, _college: student.college
                          , _university: student.university, _branch: student.branch,_collage: student.collage,_address: student.address}]);


  }

  public onSubmit() {

  }



}
