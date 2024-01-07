import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrossplyRoutingModule } from './crossply-routing.module';
import { HomeComponent } from './home/home.component';
import { ReportsComponent } from './reports/reports.component';
import { AddCrossplyComponent } from './add-crossply/add-crossply.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DemoMaterialModule } from 'src/app/core/demo-material.module';
import { CoreModule } from 'src/app/core/core.module';


@NgModule({
  declarations: [HomeComponent, ReportsComponent, AddCrossplyComponent],
  imports: [
    CommonModule,
    CrossplyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    DemoMaterialModule,
    CoreModule
  ], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CrossplyModule { }
