import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LaminationRoutingModule } from './lamination-routing.module';
import { HomeComponent } from './home/home.component';
import { ReportsComponent } from './reports/reports.component';
import { AddLaminationComponent } from './add-lamination/add-lamination.component';
import { CoreModule } from 'src/app/core/core.module';
import { ChildlaminationComponent } from './childlamination/childlamination.component';
import { DemoMaterialModule } from 'src/app/core/demo-material.module';
import { DisplaylaminationComponent } from './shared/displaylamination/displaylamination.component';
import { LaminationDetailExpandComponent } from './shared/lamination-detail-expand/lamination-detail-expand.component';
import { LaminationdetailComponent } from './shared/laminationdetail/laminationdetail.component';
import { BaseComponent } from './base/base.component';


@NgModule({
  declarations: [HomeComponent, BaseComponent, DisplaylaminationComponent,
     LaminationDetailExpandComponent, 
     LaminationdetailComponent,  ChildlaminationComponent, ReportsComponent, AddLaminationComponent],
  imports: [
    CommonModule,
    LaminationRoutingModule,
    CoreModule,
    DemoMaterialModule
  ]
})
export class LaminationModule { }
