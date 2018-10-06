import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { UserService } from '../../services/user/user.service';

@Component({
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  id: String;
  user: object;
  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.route.params
      .pipe(
        switchMap(data => {
          this.id = data.id;
          return this.userService.getUser(this.id);
        })
      )
      .subscribe(
        (user) => this.user = user,
        (error) => console.log(error)
      );
    // this.userService.getUser(this.id).subscribe(
    //   (user) => this.user = user,
    //   (error) => console.log(error)
    // );
  }

}
