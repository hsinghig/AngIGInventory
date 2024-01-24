import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { crossplyModel, crossplySummaryModel } from 'src/app/shared/model/crossply.model';
import { CrossplyService } from 'src/app/shared/service/crossplyService';
import { CrossplyHomeService } from 'src/app/shared/service/crossplyhome.service';
import { SharedNavService } from 'src/app/shared/service/sharedNavService';

@Component({
  selector: 'app-crossply-home',  
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent  implements OnInit{  
  public showMenu:boolean = false;
  public showDetail: boolean = true;
  public headerStyle='pageHeadercrossPlyStyle';
  public headerText= 'Crossply Home Page';
  public showTable$ = true;
  public headerTypePassed:string = 'crossply';
  public headerColor: string = '#84A98C';

  constructor(private sharedNavService: SharedNavService, private router: Router,
    private crossplyHomeService: CrossplyHomeService,
     private activatedRoute: ActivatedRoute) {  
    console.log('In crossply Home');
    this.activatedRoute.url.subscribe(activeUrl =>{
      this.sharedNavService.raiseDataEmitterEvent(window.location.pathname);
    });
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
          switch(event.url){
            case '/crossply/home':
              this.crossplyHomeService.setShowCrossplyHomeObs(true);
              break;
            case '/crossply/add':
              this.crossplyHomeService.setShowCrossplyHomeObs(false);
              break;
            case '/crossply/reports':
              this.crossplyHomeService.setShowCrossplyHomeObs(false);
          }
      }
    });
  }
  ngOnInit(): void {
    this.crossplyHomeService.getShowCrossplyHomeObs().subscribe(data => this.showTable$ = data);
  }
  
  OnColorSelected(data: any){
    this.headerColor = data;
  }

  onButtonToggleSelected(data:any){   
    switch(data){
      case 'menu':
        this.showDetail = true;
        this.showMenu = false;
        break;
      case 'detail':
        this.showDetail = false;
        this.showMenu = true;
        break;
    }
  }
}
