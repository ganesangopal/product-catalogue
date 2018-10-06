import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import  { HttpClientModule } from '@angular/common/http';

import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './core/home/home.component';

const appRoutes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'products', loadChildren: './products/products.module#ProductsModule'},
    {path: 'users', loadChildren: './users/users.module#UsersModule'}
];

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
      RouterModule.forRoot(appRoutes),
      HttpClientModule,
      CommonModule,
      SharedModule
    ],  
    exports: [
        RouterModule,
        CommonModule,
        SharedModule
    ]
})
export class AppRoutingModule { };