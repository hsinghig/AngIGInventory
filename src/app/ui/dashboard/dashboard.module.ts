import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { ReportsComponent } from './reports/reports.component';
import { SummaryComponent } from './summary/summary.component';
import { CoreModule } from 'src/app/core/core.module';
import { DemoMaterialModule } from 'src/app/core/demo-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseComponent } from './base/base.component';


@NgModule({
  declarations: [HomeComponent, BaseComponent, ReportsComponent, 
    SummaryComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CoreModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule { }
