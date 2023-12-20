import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExtruderRoutingModule } from './extruder-routing.module';
import { HomeComponent } from './home/home.component';
import { AddExtruderComponent } from './add-extruder/add-extruder.component';
import { ReportsComponent } from './reports/reports.component';


@NgModule({
  declarations: [
    HomeComponent,
    AddExtruderComponent,
    ReportsComponent
  ],
  imports: [
    CommonModule,
    ExtruderRoutingModule
  ]
})
export class ExtruderModule { }
