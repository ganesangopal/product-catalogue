import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { UsersComponent } from "./users.component";
import { UserDetailComponent } from "./user-detail/user-detail.component";
import { UserAddEditComponent } from "./user-add-edit/user-add-edit.component";
import { AuthGuardService } from "../auth-guard.service";
import { RoleGuardService } from '../role-guard.service';
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";

const routes: Routes = [
    { path: '', component: UsersComponent, canActivate: [AuthGuardService], children: [
        {path: ':id/view', component: UserDetailComponent},
        {path: 'add', component: UserAddEditComponent, data: {
          isEditMode: false
        }, canActivate:[RoleGuardService]},
        {path: ':id/edit', component: UserAddEditComponent, data: {
          isEditMode: true
        }, canActivate:[RoleGuardService]},
        { path: 'my-profile', component: UserAddEditComponent, data: {
            isEditMode: true,
            ownProfile: true
        }}
    ]}
];

@NgModule({
    declarations: [
        UsersComponent,
        UserDetailComponent,
        UserAddEditComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class UserRoutingModule { }