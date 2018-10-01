import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any = [];
  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      (users) => this.users = users,
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
