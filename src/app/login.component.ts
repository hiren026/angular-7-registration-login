import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './app.service';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({templateUrl: './login.component.html'})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _loginService: LoginService
  ) { }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: [''],
          password: ['']
      });

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

        // stop here if form is invalid

        this.loading = true;
        this._loginService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
        data => {
            this.router.navigate([this.returnUrl]);
        },
        error => {
            this.loading = false;
        });
  }

}
