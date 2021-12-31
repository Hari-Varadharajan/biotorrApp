import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private auth: AuthService) {}
  registeredUserData = { username: '', password: '' };
  ngOnInit(): void {}
  registerUser() {
    //console.log(this.registeredUserData);
    this.auth.registerUser(this.registeredUserData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}
