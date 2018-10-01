import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;
  userData = {
    username: '',
    password: ''
  }
  token: string;
  sessionDetails = {
    sessionName: '',
    sessionId: ''
  }
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    //console.log(this.loginForm);
    this.userData.username = this.loginForm.value.username;
    this.userData.password = this.loginForm.value.password;
    this.authService.onLogin(this.userData).subscribe(
      (data: any) => {
        localStorage.setItem('token', data.token);
        this.router.navigate(['/products']);
      },
      (error) => console.log(error)
    );;
  }

}
