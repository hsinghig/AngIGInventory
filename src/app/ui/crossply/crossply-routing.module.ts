import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReportsComponent } from './reports/reports.component';
import { CrossplyResolver } from 'src/app/shared/service/crossplyResolver.service';
import { NewcrossplyaddComponent } from './newcrossplyadd/newcrossplyadd.component';
import { BaseComponent } from './base/base.component';

const routes: Routes = [{
  path: '',
  component: BaseComponent, 
  resolve: {data: CrossplyResolver},
  children: [
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path:'reports',
      component:ReportsComponent
    },    
    {
      path:'add',
      component:NewcrossplyaddComponent
    },
    {
      path: '', redirectTo: 'home', pathMatch: 'full' 
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrossplyRoutingModule { }
