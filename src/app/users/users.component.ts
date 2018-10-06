import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../shared/auth.service';
import { UserService } from '../services/user/user.service';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any = [];
  constructor(
    private userService: UserService, 
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      (users) => {
        this.users = users;
        this.userService.setUsers(this.users);
      },
      (error) => console.log(error)
    );
  }

  deleteUser(userData) {
    if (confirm("Are you sure you want to delete user " + userData.userName)) {
      this.userService.deleteUser(userData._id).subscribe(
        (data) => this.refreshUsersList(),
        (error) => console.log(error)
      );
    }
  }

  refreshUsersList() {
    this.userService.getUsers().subscribe(
      (users) => this.users = users,
      (error) => console.log(error)
    );
  }

  isAdmin() {
    return this.authService.hasAdminRole();
  }
}
