import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _regUrl = 'http://localhost:3000/user/signup';
  private _loginUrl = 'http://localhost:3000/user/signin';
  private _logoutUrl = 'http://localhost:3000/user/signout';
  constructor(private http: HttpClient, private route: Router) {}
  registerUser(user: object) {
    return this.http.post(this._regUrl, user, { responseType: 'text' });
  }
  LoginUser(user: object) {
    return this.http.post(this._loginUrl, user, { responseType: 'text' });
  }
  LogoutUser() {
    this.http.get(this._logoutUrl);
    localStorage.removeItem('userInfo');
    this.route.navigate(['signin']);
  }
  public isAuthenticated(): boolean {
    let userData = localStorage.getItem('userInfo');
    if (userData && JSON.parse(userData)) {
      return true;
    }
    return false;
  }
  public setUserInfo(user: any) {
    localStorage.setItem('userInfo', JSON.stringify(user));
  }
  public validate(user: object) {
    return this.http.post(this._loginUrl, user).toPromise();
  }
}
