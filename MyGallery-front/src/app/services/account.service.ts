import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../modules/User/user';

@Injectable({
  providedIn: 'root',
})
export class AccountServiceService {
  users: User[] = [];
  authenticatedUser: User | undefined;

  constructor() {
    this.users.push({
      username: 'abdo',
      password: '123',
      roles: ['ADMIN', 'USER'],
      id: 0,
      firstName: '',
      lastName: '',
      photo: '',
      email: '',
      phone: '',
      birthday: new Date(),
      country: '',
      city: '',
      address: '',
      active: true,
    });

    this.users.push({
      username: 'omar',
      password: '123',
      roles: ['USER'],
      id: 0,
      firstName: '',
      lastName: '',
      photo: '',
      email: '',
      phone: '',
      birthday: new Date(),
      country: '',
      city: '',
      address: '',
      active: true,
    });
  }

  public login(username: string, password: string): Observable<User> {
    let appUser = this.users.find((u) => u.username == username);

    if (!appUser) return throwError(() => new Error('User not Found'));

    if (appUser.password != password) {
      return throwError(
        () => new Error('username or password incorrect please try again')
      );
    }

    return of(appUser);
  }

  public authenticateUser(appUser: User): Observable<Boolean> {
    this.authenticatedUser = appUser;
    localStorage.setItem(
      'authUser',
      JSON.stringify({
        username: appUser.username,
        roles: appUser.roles,
        jwt: 'JWT_TOKEN',
      })
    );
    return of(true);
  }

  public hasRole(role: string): boolean {
    return this.authenticatedUser!.roles.includes(role);
  }

  public isAuthenticated() {
    return this.authenticatedUser != undefined;
  }
}
