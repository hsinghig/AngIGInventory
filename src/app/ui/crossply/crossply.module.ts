import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrossplyRoutingModule } from './crossply-routing.module';
import { HomeComponent } from './home/home.component';
import { ReportsComponent } from './reports/reports.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DemoMaterialModule } from 'src/app/core/demo-material.module';
import { CoreModule } from 'src/app/core/core.module';
import { DisplayCrossplyComponent } from './shared/display-crossply/display-crossply.component';
import { CrossplyDetailComponent } from './shared/crossply-detail/crossply-detail.component';
import { CrossplyDetailExpandComponent } from './shared/crossply-detail-expand/crossply-detail-expand.component';
import { NewcrossplyaddComponent } from './newcrossplyadd/newcrossplyadd.component';
import { BaseComponent } from './base/base.component';


@NgModule({
  declarations: [HomeComponent, BaseComponent, NewcrossplyaddComponent, CrossplyDetailComponent, CrossplyDetailExpandComponent,
     DisplayCrossplyComponent, ReportsComponent],
  imports: [
    CommonModule,
    CrossplyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    DemoMaterialModule,
    CoreModule,
  ], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CrossplyModule { }
