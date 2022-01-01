import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}
  user: any;
  registeredUserData = {
    username: '',
    password: '',
    Cpassword: '',
    organization: '',
    email: '',
    designation: '',
  };
  ngOnInit(): void {}
  registerUser() {
    //console.log(this.registeredUserData);
    this.auth.registerUser(this.registeredUserData).subscribe(
      (res) => {
        this.user = {
          username: this.registeredUserData.username,
          password: this.registeredUserData.password,
        };
        this.auth.validate(this.user).then((res) => {
          this.user = res;
          this.auth.setUserId(this.user.user_id);
          this.auth.setUserInfo({ user: this.user.username });
          this.router.navigate(['dashboard']);
        });
      },
      (err) => console.log(err)
    );
  }
}
