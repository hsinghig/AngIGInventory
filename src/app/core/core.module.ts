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
import { CrossplyRollNumberSelectDialogComponent } from "./crossply-roll-number-select-dialog/crossply-roll-number-select-dialog.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { BroadcastComponent } from "./broadcast/broadcast.component";

@NgModule({
    declarations: [NavComponent, BroadcastComponent, CalendarComponent, CrossplyRollNumberSelectDialogComponent, SaveDialogComponent, LoaderComponent, BannerbuttonsComponent, PageNotFoundComponent, RollNumberSelectDialogComponent, DisplayTableComponent, FooterComponent, BreadcrumbComponent, PageHeaderComponent],
    imports: [CommonModule, DemoMaterialModule, ReactiveFormsModule, FormsModule, RouterModule],
    exports: [NavComponent, BroadcastComponent, CalendarComponent, CrossplyRollNumberSelectDialogComponent, SaveDialogComponent, LoaderComponent, BannerbuttonsComponent, PageHeaderComponent, RollNumberSelectDialogComponent, DisplayTableComponent, FooterComponent, PageNotFoundComponent, BreadcrumbComponent, DemoMaterialModule ,ReactiveFormsModule, FormsModule]
})
export class CoreModule{}