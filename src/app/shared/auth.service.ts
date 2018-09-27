import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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
  constructor(private http: HttpClient, private router: Router) { }

  onLogin(userData: userLoginDetails) {
    console.log(userData);
    return this.http.post('http://dev-product-catalogue.pantheonsite.io/api/product-catalogue/user/login',
      userData
    ).subscribe(
      (data: any) => {
        localStorage.setItem('token', data.token);
        this.token = data.token;
        this.router.navigate(['']);
      },
      (error) => console.log(error)
    );
  }

  onLogout() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRF-Token': localStorage.getItem('token')});
    //console.log(this.headers.get('X-CSRF-Token'));
    return this.http.post('http://dev-product-catalogue.pantheonsite.io/api/product-catalogue/user/logout',
      "",
      {headers: headers}
    ).subscribe(
      (data: any) => {
        localStorage.removeItem('token');
        console.log(localStorage.getItem('token'));
        this.router.navigate(['']);
      },
      (error) => console.log(error)
    );
  }

  isAuthenticated() {
    return localStorage.getItem('token');
  }
}
