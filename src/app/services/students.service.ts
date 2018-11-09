import { Injectable } from '@angular/core';
import { Students} from '../data/mock-data';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StudentsService {

  constructor() { }

  getStudents(): Observable<any[]> {
    return Observable.of(Students).delay(100);
  }
  getColumns(): string[] {
    return ["firstName", "lastName", "dob", "college", "branch", "university", "city", "address"]
  }


}
