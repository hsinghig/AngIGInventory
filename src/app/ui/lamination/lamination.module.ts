import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LaminationRoutingModule } from './lamination-routing.module';
import { HomeComponent } from './home/home.component';
import { ReportsComponent } from './reports/reports.component';
import { AddLaminationComponent } from './add-lamination/add-lamination.component';
import { CoreModule } from 'src/app/core/core.module';
import { ChildlaminationComponent } from './childlamination/childlamination.component';


@NgModule({
  declarations: [HomeComponent, ChildlaminationComponent, ReportsComponent, AddLaminationComponent],
  imports: [
    CommonModule,
    LaminationRoutingModule,
    CoreModule
  ]
})
export class LaminationModule { }
