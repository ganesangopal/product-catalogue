import { Injectable } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}
@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      var currentUser = this.authService.getCurrentUser();
      if (currentUser.roles.indexOf('administrator') !== -1) {
        return true;
      } else {
        this.router.navigate(['/home']);
        return false;
      }
    }
    this.router.navigate(['/home']);
    return false;
  }

}
