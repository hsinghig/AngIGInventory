import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ExtruderHomeService } from 'src/app/shared/service/extruderhome.service';
import { SharedNavService } from 'src/app/shared/service/sharedNavService';

@Component({
  selector: 'app-extruder-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public showMenu: boolean = false;
  public showDetail: boolean = true;
  public headerStyle = 'pageHeaderextruderStyle';
  public headerText = 'Extruder Home Page';
  public showTable$ = true;
  public headerTypePassed: string = 'extruder';
  public headerColor: string = '#84A98C';

  constructor( private sharedNavService: SharedNavService, private router: Router, private activatedRoute: ActivatedRoute,
    private extruderHomeService: ExtruderHomeService) {
    this.activatedRoute.url.subscribe(activeUrl => {
      this.sharedNavService.raiseDataEmitterEvent(window.location.pathname);
    });    
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        switch (event.url) {
          case '/extruder/home':
            this.extruderHomeService.setShowExtruderHomeObs(true);
            break;
          case '/extruder/add':
            this.extruderHomeService.setShowExtruderHomeObs(false);
            break;
          case '/extruder/reports':
            this.extruderHomeService.setShowExtruderHomeObs(false);
        }      
      }
    });
  }
  ngOnInit(): void {
    //https://stackoverflow.com/questions/57355066/how-to-implement-behavior-subject-using-service-in-angular-8
    this.extruderHomeService.getShowExtruderHomeObs().subscribe(data => this.showTable$ = data);

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
