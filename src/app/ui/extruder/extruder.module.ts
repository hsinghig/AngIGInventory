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
import { CoreModule } from 'src/app/core/core.module';
import { ExtruderAllDataComponent } from './extruder-all-data/extruder-all-data.component';
import { ExtruderSummaryButtonComponent } from './extruder-summary-button/extruder-summary-button.component';


@NgModule({
  declarations: [
    HomeComponent,
    AddExtruderComponent,
    ExtruderDetailComponent,
    ExtruderSummaryComponent,
    ExtruderAllDataComponent,
    ReportsComponent,
    ExtruderSummaryButtonComponent, 
  ],
  imports: [
    CommonModule,
    ExtruderRoutingModule,
    ReactiveFormsModule,
    FormsModule, 
    DemoMaterialModule, 
    CoreModule
  ]
})
export class ExtruderModule { }
