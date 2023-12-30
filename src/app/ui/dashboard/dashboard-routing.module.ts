import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SummaryComponent } from './summary/summary.component';
import { HomeComponent } from './home/home.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [{
  path: '',
  component:HomeComponent, 
  children: [
    {
      path:'reports',
      component:ReportsComponent
    },
    {
      path:'summary',
      component:SummaryComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
