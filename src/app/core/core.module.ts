import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DemoMaterialModule } from "./demo-material.module";
import { NavComponent } from "./nav/nav.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FooterComponent } from "./footer/footer.component";
import { PageHeaderComponent } from "./page-header/page-header.component";
import { RouterModule } from "@angular/router";
import { DisplayTableComponent } from "./display-table/display-table.component";

@NgModule({
    declarations: [NavComponent, PageNotFoundComponent, DisplayTableComponent, FooterComponent, BreadcrumbComponent, PageHeaderComponent],
    imports: [CommonModule, DemoMaterialModule, ReactiveFormsModule, FormsModule, RouterModule],
    exports: [NavComponent, PageHeaderComponent, DisplayTableComponent, FooterComponent, PageNotFoundComponent, BreadcrumbComponent, DemoMaterialModule ,ReactiveFormsModule, FormsModule]
})
export class CoreModule{}