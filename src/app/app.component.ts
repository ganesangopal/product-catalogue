import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'product-catalogue';
  currentUser: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    //console.log(this.authService.isAuthenticated());
    //this.currentUser = this.authService.getCurrentUser();
  }

  // isAuthenticated() {
  //   return this.authService.isAuthenticated();
  // }

  // onLogout() {
  //   localStorage.removeItem('token');
  //   this.router.navigate(['/login']);
  // }
}
