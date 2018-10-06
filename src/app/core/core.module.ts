import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { AppRoutingModule } from "../app-routing.module";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { HomeComponent } from "./home/home.component";

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        AppRoutingModule
    ],
    exports: [
        AppRoutingModule,
        HeaderComponent
    ]
})
export class CoreModule { }