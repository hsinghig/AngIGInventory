import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LaminationRoutingModule } from './lamination-routing.module';
import { HomeComponent } from './home/home.component';
import { ReportsComponent } from './reports/reports.component';
import { AddLaminationComponent } from './add-lamination/add-lamination.component';


@NgModule({
  declarations: [HomeComponent, ReportsComponent, AddLaminationComponent],
  imports: [
    CommonModule,
    LaminationRoutingModule
  ]
})
export class LaminationModule { }
