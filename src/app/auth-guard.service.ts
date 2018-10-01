import { Injectable } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      var currentUser = this.authService.getCurrentUser();
      if (currentUser.roles.indexOf('administrator') !== -1) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }

}
