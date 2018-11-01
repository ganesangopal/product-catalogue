import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from '../shared/shared.module';
import { Routes, RouterModule } from "@angular/router";

import { ProductsComponent } from "./products.component";
import { ProductAddEditComponent } from "./product-add-edit/product-add-edit.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { AuthGuardService } from "../auth-guard.service";
import { RoleGuardService } from '../role-guard.service';

const routes: Routes = [
    {
        path: '', component: ProductsComponent, canActivate:[AuthGuardService], children: [
            { path: ':id/view', component: ProductDetailComponent },
            { path: 'add', component: ProductAddEditComponent, data: {
                isEditMode: false
            }, canActivate:[RoleGuardService]},
            { path: ':id/edit', component: ProductAddEditComponent, data: {
                isEditMode: true
            }, canActivate:[RoleGuardService], canDeactivate: [AuthGuardService] }
        ]
    }
];


@NgModule({
    declarations: [
        ProductsComponent,
        ProductAddEditComponent,
        ProductDetailComponent
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
export class ProductRoutingModule { }