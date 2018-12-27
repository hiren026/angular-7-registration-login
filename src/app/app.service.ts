import { HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import {Injectable} from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from './user';

@Injectable()
export class LoginService {
  private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

  constructor() {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

    register(user: User) {
        let users : any[] = JSON.parse(localStorage.getItem('users')) || [];
        console.log(user);
        // get new user object from post body
        let newUser = user;

        // validation
        let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
        if (duplicateUser) {
            return throwError({ error: { message: 'Username "' + newUser.username + '" is already taken' } });
        }

        // save new user
        newUser.id = users.length + 1;
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // respond 200 OK
        return of(new HttpResponse({ status: 200 }));
    }

    login(username: string, password: string) {
      let users : any[] = JSON.parse(localStorage.getItem('users')) || [];
      let filteredUsers = users.filter(user => {
          return user.username === username && user.password === password;
      });

      if (filteredUsers.length) {
          // if login details are valid return 200 OK with user details and fake jwt token
          let user = filteredUsers[0];
          let body = {
              id: user.id,
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              token: 'fake-jwt-token'
          };
        localStorage.setItem('currentUser', JSON.stringify(user));

      return of(new HttpResponse({ status: 200, body: body }));
    }
  }

  logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

}
