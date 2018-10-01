import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { MatButtonModule, MatCardModule, MatToolbarModule, MatDialog, MatDialogRef } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import  { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductAddEditComponent } from './product-add-edit/product-add-edit.component';
import { ConfirmationDialog } from './confirmation-dialog';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AuthGuardService } from './auth-guard.service';

const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'products/:id/view', component: ProductDetailComponent},
  {path: 'products/add', component: ProductAddEditComponent, data: {
    isEditMode: false
  }, canActivate:[AuthGuardService]},
  {path: 'products/:id/edit', component: ProductAddEditComponent, data: {
    isEditMode: true
  }, canActivate:[AuthGuardService]},
  {path: 'users', component: UsersComponent},
  {path: 'users/:id/view', component: UserDetailComponent},
  {path: 'users/add', component: UserAddEditComponent, data: {
    isEditMode: false
  }, canActivate:[AuthGuardService]},
  {path: 'users/:id/edit', component: UserAddEditComponent, data: {
    isEditMode: true
  }, canActivate:[AuthGuardService]},
  {path: 'my-profile', component: UserAddEditComponent, data: {
    isEditMode: true,
    ownProfile: true
  }}
];

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProductsComponent,
    ProductDetailComponent,
    ProductAddEditComponent,
    ConfirmationDialog,
    UsersComponent,
    UserDetailComponent,
    UserAddEditComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4600'],
        blacklistedRoutes: ['localhost:4600/auth/']
      }
    })
  ],
  providers: [JwtHelperService],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialog]
})
export class AppModule { }
