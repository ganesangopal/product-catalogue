import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../shared/auth.service';
import { UserService } from '../services/user/user.service';
import { switchMap } from 'rxjs/operators';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {

  users: any = this.userService.users;
  filteredUsers: any = [];
  constructor(
    private userService: UserService, 
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    console.log('constructor called');
  }

  ngOnInit() {
    console.log('on init called');
    // this.route.params
    //   .pipe(
    //     switchMap((param) => this.userService.getUsers())
    //   )
    //   .subscribe(
    //     (users) => {
    //       console.log('users', users);
    //       this.users = users;
    //       this.userService.setUsers(this.users);
    //     },
    //     (error) => console.log(error)  
    //   );
    this.userService.getUsers().subscribe(
      (users) => {
        this.users = users;
        this.userService.setUsers(this.users);
      },
      (error) => console.log(error)
    );
  }

  ngAfterViewInit() {
    console.log('this view called');
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
      (users) => {
        this.users = users;
        this.userService.setUsers(this.users);
      },
      (error) => console.log(error)
    );
  }

  isAdmin() {
    return this.authService.hasAdminRole();
  }

  filterUsers(element) {
    var users = this.userService.users;
    this.filteredUsers = users.filter((user) => {
      return user.userName.indexOf(element.target.value) !== -1
    });
    if (this.filteredUsers && element.target.value) {
      this.users = this.filteredUsers;
    } else {
      this.refreshUsersList();
    }
  }
}