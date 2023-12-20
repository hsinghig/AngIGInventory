import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DemoMaterialModule } from "./demo-material.module";
import { NavComponent } from "./nav/nav.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";

@NgModule({
    declarations: [NavComponent, PageNotFoundComponent, BreadcrumbComponent],
    imports: [CommonModule, DemoMaterialModule],
    exports: [NavComponent, PageNotFoundComponent, BreadcrumbComponent, DemoMaterialModule]
})
export class CoreModule{}