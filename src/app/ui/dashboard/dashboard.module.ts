import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { ReportsComponent } from './reports/reports.component';
import { SummaryComponent } from './summary/summary.component';
import { CoreModule } from 'src/app/core/core.module';


@NgModule({
  declarations: [HomeComponent, ReportsComponent, SummaryComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CoreModule
  ]
})
export class DashboardModule { }
