import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  id: String;
  user: object;
  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.userService.getUser(this.id).subscribe(
      (user) => this.user = user,
      (error) => console.log(error)
    );
  }

}
