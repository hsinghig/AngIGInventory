import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './start/start.component';

export const routes: Routes = [{
  path: '',
  component: StartComponent
}]

@NgModule({
  declarations: [StartComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class HomeModule { }
