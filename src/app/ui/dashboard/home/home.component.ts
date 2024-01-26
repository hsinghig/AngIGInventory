import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedNavService } from 'src/app/shared/service/sharedNavService';

@Component({
  selector: 'app-dashboard-home', 
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {  
  public currentDate = new Date();
  public nextDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth()+1, 1);
  constructor(private sharedNavService: SharedNavService, private activatedRoute: ActivatedRoute) {  
    this.activatedRoute.url.subscribe(activeUrl =>{
      this.sharedNavService.raiseDataEmitterEvent(window.location.pathname);
    });
  }
}
