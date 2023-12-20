import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DemoMaterialModule } from "./demo-material.module";
import { NavComponent } from "./nav/nav.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

@NgModule({
    declarations: [NavComponent, PageNotFoundComponent],
    imports: [CommonModule, DemoMaterialModule],
    exports: [NavComponent, PageNotFoundComponent, DemoMaterialModule]
})
export class CoreModule{}