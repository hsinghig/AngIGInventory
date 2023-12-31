import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExtruderRoutingModule } from './extruder-routing.module';
import { HomeComponent } from './home/home.component';
import { AddExtruderComponent } from './add-extruder/add-extruder.component';
import { ReportsComponent } from './reports/reports.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from 'src/app/core/demo-material.module';
import { ExtruderDetailComponent } from './extruder-detail/extruder-detail.component';
import { ExtruderSummaryComponent } from './extruder-summary/extruder-summary.component';


@NgModule({
  declarations: [
    HomeComponent,
    AddExtruderComponent,
    ExtruderDetailComponent,
    ExtruderSummaryComponent,
    ReportsComponent
  ],
  imports: [
    CommonModule,
    ExtruderRoutingModule,
    ReactiveFormsModule,
    FormsModule, 
    DemoMaterialModule
  ]
})
export class ExtruderModule { }
