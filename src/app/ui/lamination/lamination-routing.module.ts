import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReportsComponent } from './reports/reports.component';
import { AddLaminationComponent } from './add-lamination/add-lamination.component';

const routes: Routes = [{
  path: '',
  component:HomeComponent, 
  children: [
    {
      path:'reports',
      component:ReportsComponent
    },
    {
      path:'add',
      component: AddLaminationComponent
    }
  ]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaminationRoutingModule { }
