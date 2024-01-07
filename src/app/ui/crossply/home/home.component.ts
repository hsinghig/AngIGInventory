import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedNavService } from 'src/app/shared/service/sharedNavService';

@Component({
  selector: 'app-crossply-home',  
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  showTable$: boolean = false;
  public headerStyle='pageHeadercrossPlyStyle';
  public headerText= 'Crossply Home Page';
  constructor(private sharedNavService: SharedNavService, private activatedRoute: ActivatedRoute) {  
    this.activatedRoute.url.subscribe(activeUrl =>{
      this.sharedNavService.raiseDataEmitterEvent(window.location.pathname);
    });
  }
}
