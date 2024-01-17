import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LaminationHomeService } from 'src/app/shared/service/laminationhome.service';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { SharedNavService } from 'src/app/shared/service/sharedNavService';

@Component({
  selector: 'app-lamination-home', 
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  public showMenu:boolean = false;
  public showDetail: boolean = true;
  public headerStyle='pageHeaderlaminationStyle';
  public headerText= 'Lamination Home Page';
  public showTable$ = true;
  public headerTypePassed:string = 'lamination';
  public headerColor: string = '#84A98C';

  constructor(private sharedNavService: SharedNavService,
    private router:Router,  
    private laminationHomeService: LaminationHomeService,
     private activatedRoute: ActivatedRoute) {  
    this.activatedRoute.url.subscribe(activeUrl =>{
      this.sharedNavService.raiseDataEmitterEvent(window.location.pathname);
    });

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
          switch(event.url){
            case '/lamination':
              this.laminationHomeService.setShowLaminationHomeObs(true);
              break;
            case '/lamination/add':
              this.laminationHomeService.setShowLaminationHomeObs(false);
              break;
            case '/lamination/reports':
              this.laminationHomeService.setShowLaminationHomeObs(false);
          }
      }
    });
  }

  ngOnInit(){    
    this.laminationHomeService.getShowLaminationHomeObs().subscribe(data => this.showTable$ = data);
  
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
