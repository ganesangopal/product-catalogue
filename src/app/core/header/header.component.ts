import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: any;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.authService.isAuthenticated());
    this.currentUser = this.authService.getCurrentUser();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
