import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      errLink: boolean;
      errMsg: string;
    };
    this.errMsg = state?.errMsg;
    this.errLink = state?.errLink;
  }
  LoginUserData: any = {};
  errMsg: string = 'Username or Password is incorrect';
  errLink: boolean = false;
  ngOnInit(): void {}
  LoginUser() {
    this.auth
      .validate(this.LoginUserData)
      .then((res) => {
        this.auth.setUserInfo({ user: this.LoginUserData.username });
        this.router.navigate(['dashboard']);
      })
      .catch((err) => {
        this.errMsg = 'Username or password is incorrect';
        this.errLink = true;
      });
  }
}
