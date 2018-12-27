import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

import { LoginService } from './app.service';

@Component({
  templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private _loginService: LoginService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        username: [''],
        password: ['']
    });
  }

  model: any = {};

  //onSubmit() {
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model))
    //this._loginService.set(this.model.uname,this.model);
  //  console.log(this._loginService.get(this.model.uname));
  //}

  onSubmit() {
        this.submitted = true;
        this.loading = true;
        this._loginService.register(this.registerForm.value)
            .subscribe(
                data => {
                    //this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    //this.alertService.error(error);
                    this.loading = false;
                });
    }

}
