import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface userLoginDetails {
  username: string,
  password: string
}
// @Injectable({
//   providedIn: 'root'
// })
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string;
  headers: any;
  sessionDetails = {
    sessionName: '',
    sessionId: ''
  }
  constructor(
    private http: HttpClient, 
    private router: Router, 
    private jwtHelper: JwtHelperService
  ) { }

  onLogin(userData: userLoginDetails) {
    return this.http.post('/routes/login', userData);
  }

  onLoginGoogle() {
    return this.http.get('/auth/google');
  }

  getCurrentUser() {
    const token = localStorage.getItem('token');
    const userData = this.jwtHelper.decodeToken(token);
    return userData;
  }

  hasAdminRole() {
    const token = localStorage.getItem('token');
    const userData = this.jwtHelper.decodeToken(token);
    if (this.isAuthenticated() && userData.roles.indexOf('administrator') !== -1) {
      return true;
    }
    return false;
  }

  isAuthenticated() {
    return localStorage.getItem('token');
  }
}
