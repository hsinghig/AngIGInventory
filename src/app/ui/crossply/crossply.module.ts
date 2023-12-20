import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrossplyRoutingModule } from './crossply-routing.module';
import { HomeComponent } from './home/home.component';
import { ReportsComponent } from './reports/reports.component';
import { AddCrossplyComponent } from './add-crossply/add-crossply.component';


@NgModule({
  declarations: [HomeComponent, ReportsComponent, AddCrossplyComponent],
  imports: [
    CommonModule,
    CrossplyRoutingModule
  ]
})
export class CrossplyModule { }
