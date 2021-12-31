import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(private authService: AuthService, private route: Router) {}
  canActivate() {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    const navigationExtras: NavigationExtras = {
      state: { errLink: true, errMsg: 'Signin first' },
    };
    this.route.navigate(['signin'], navigationExtras);
    return false;
  }
}
