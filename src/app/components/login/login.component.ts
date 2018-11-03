import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;

  form = new FormGroup(
    {
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required)
    },
    { updateOn: 'submit' }
  );

  constructor(private router: Router) { }

  ngOnInit() {

  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.doSubmit();
  }


  protected doSubmit() {
    const { email, password, rememberMe } = this.form.value;


    if (email === 'institution@clusterit.com' && password === 'institution') {
      this.router.navigate(['./studentSearch']);
    } else if (email === 'graduates@clusterit.com' && password === 'graduates') {
      this.router.navigate(['./graduates']);
    } else if (email === 'recruiters@clusterit.com' && password === 'recruiters') {
      this.router.navigate(['./recruiters']);
    } else {
      this.router.navigate(['./home']);
    }

    // this.router.navigateByUrl('/studentSearch');
  }

}
