import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { LoginService } from './app.service';
import { User } from './user';

@Component({templateUrl: './home.component.html'})

export class HomeComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  constructor(private _loginService: LoginService) {
    this.currentUserSubscription = this._loginService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  /*deleteUser(id: number) {
    this._loginService.delete(id).pipe(first()).subscribe(() => {
        this.loadAllUsers()
    });
  }*/

  private loadAllUsers() {
    this.users = JSON.parse(localStorage.getItem('users'));
  }

}
