import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './app.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  currentUser: User;

  constructor(private router: Router, private _loginService: LoginService) {
      this._loginService.currentUser.subscribe(x => this.currentUser = x);
      console.log(this.currentUser);
      console.log('app component');
   }

  logout() {
         this._loginService.logout();
         this.currentUser = null;
         this.router.navigate(['/login']);
  }
}
