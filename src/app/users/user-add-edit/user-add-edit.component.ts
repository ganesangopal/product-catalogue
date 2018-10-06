import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { AuthService } from '../../shared/auth.service';
import { UserService } from '../../services/user/user.service';

@Component({
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css']
})
export class UserAddEditComponent implements OnInit {

  isEditMode: boolean = false;
  ownProfile: boolean = false;
  userId: String;
  userForm: FormGroup;
  submitted: boolean = false;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.isEditMode = this.route.snapshot.data.isEditMode;
    this.ownProfile = this.route.snapshot.data.ownProfile;
    if (this.ownProfile) {
      var currentUser = this.authService.getCurrentUser();
      this.userId = currentUser._id;
    } else {
      this.userId = this.route.snapshot.params.id;
    }
    console.log(this.isEditMode);
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', [Validators.required, this.validateUsername.bind(this)]],
      emailAddress: ['', [Validators.required, Validators.email]],
      password: ['', this.validatePassword.bind(this)]
    });
    if (this.isEditMode) {
      this.userService.getUser(this.userId).subscribe(
        (data) => this.userForm.patchValue({
          firstName: data['firstName'],
          lastName: data['lastName'],
          userName: data['userName'],
          emailAddress: data['emailAddress']
        }),
        (error) => console.log(error)
      );
    }
  }

  validatePassword(control: FormControl): {[key:string]: any} {
    if (!this.isEditMode && !control.value) {
      return {required:true};
    } else {
      return null;
    }
  }

  validateUsername(control: FormControl): {[key: string]: any} {
    if (control.value) {
      var userName = this.userService.users.find((user) => user.userName === control.value);
      if (userName) {
        return {userExists: true}
      }
    }
    return null;
  }

  onCancel() {
    if (this.userForm.touched && this.userForm.dirty) {
      if (confirm('Are you sure you want to leave this page? Your changes will not be saved.')) {
        this.router.navigate(['/users']);
      }
    } else {
      this.router.navigate(['/users']);
    }
  }

  onSubmit() {
    this.submitted = true;
    //this.productForm.valid
    if (this.userForm.valid) {
      if (!this.isEditMode) {
        this.userService.createUser(this.userForm.value)
        .subscribe(
          (data) => {
            this.userService.setUsers(this.userForm.value);
            console.log('successfully created user');
          },
          (error) => console.log(error),
          () => this.router.navigate(['/users'])
        );
      } else {
        this.userService.updateUser(this.userId, this.userForm.value).subscribe(
          (data) => {
            this.userService.setUsers(this.userForm.value);
            console.log('successfully updated user');
          },
          (error) => console.log(error),
          () => this.router.navigate(['/users'])
        );
      }
    }
  }
}
