import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ObjectId } from 'mongoose';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user_id!: ObjectId;
  private _regUrl = '/user/signup';
  private _loginUrl = '/user/signin';
  private _logoutUrl = '/user/signout';
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
  public setUserId(user_id: ObjectId) {
    this.user_id = user_id;
  }
  public getUserId() {
    return this.user_id;
  }
}
