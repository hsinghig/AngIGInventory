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
import { RollNumberSelectDialogComponent } from "./roll-number-select-dialog/roll-number-select-dialog.component";
import { BannerbuttonsComponent } from "./bannerbuttons/bannerbuttons.component";
import { LoaderComponent } from "./loader/loader.component";
import { SaveDialogComponent } from "./savedialog/savedialog.component";

@NgModule({
    declarations: [NavComponent, SaveDialogComponent, LoaderComponent, BannerbuttonsComponent, PageNotFoundComponent, RollNumberSelectDialogComponent, DisplayTableComponent, FooterComponent, BreadcrumbComponent, PageHeaderComponent],
    imports: [CommonModule, DemoMaterialModule, ReactiveFormsModule, FormsModule, RouterModule],
    exports: [NavComponent, SaveDialogComponent, LoaderComponent, BannerbuttonsComponent, PageHeaderComponent, RollNumberSelectDialogComponent, DisplayTableComponent, FooterComponent, PageNotFoundComponent, BreadcrumbComponent, DemoMaterialModule ,ReactiveFormsModule, FormsModule]
})
export class CoreModule{}