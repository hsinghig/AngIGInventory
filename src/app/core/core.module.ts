import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DemoMaterialModule } from "./demo-material.module";
import { NavComponent } from "./nav/nav.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FooterComponent } from "./footer/footer.component";
import { PageHeaderComponent } from "./page-header/page-header.component";

@NgModule({
    declarations: [NavComponent, PageNotFoundComponent, FooterComponent, BreadcrumbComponent, PageHeaderComponent],
    imports: [CommonModule, DemoMaterialModule, ReactiveFormsModule, FormsModule],
    exports: [NavComponent, PageHeaderComponent, FooterComponent, PageNotFoundComponent, BreadcrumbComponent, DemoMaterialModule ,ReactiveFormsModule, FormsModule]
})
export class CoreModule{}