import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedNavService } from 'src/app/shared/service/sharedNavService';

@Component({
  selector: 'app-lamination-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
  public headerText:string = 'Lamination Home Page';
  public headerTypePassed:string = 'lamination';
  constructor(private sharedNavService: SharedNavService, private activatedRoute: ActivatedRoute) {  
    this.activatedRoute.url.subscribe(activeUrl =>{
      this.sharedNavService.raiseDataEmitterEvent(window.location.pathname);
    });
  }
  OnColorSelected(data: any){
    console.log('Color passed from child :', data);
  }
}
