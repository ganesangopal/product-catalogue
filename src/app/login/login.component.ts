import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../shared/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;
  userData = {
    username: '',
    password: ''
  }
  errorMessage = '';
  submitted = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    this.userData.username = this.loginForm.value.username;
    this.userData.password = this.loginForm.value.password;
    this.authService.onLogin(this.userData).subscribe(
      (data: any) => {
        localStorage.setItem('token', data.token);
        this.router.navigate(['/products']);
      },
      (error) => {
        this.errorMessage = error.error.reason;
      }
    );
  }

  onLoginGoogle() {
    this.authService.onLoginGoogle().subscribe(
      (data: any) => {
        //localStorage.setItem('token', data.token);
        this.router.navigate(['/products']);
      },
      (error) => {
        this.errorMessage = error.error.reason;
      }
    );
  }

}
