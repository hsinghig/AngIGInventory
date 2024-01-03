import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ExtruderSummary } from 'src/app/shared/model/extruderInsertModel';
import { ExtruderService } from 'src/app/shared/service/extruderService';
import { ExtruderHomeService } from 'src/app/shared/service/extruderhome.service';
import { SharedNavService } from 'src/app/shared/service/sharedNavService';

@Component({
  selector: 'app-extruder-home', 
  templateUrl: './home.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class HomeComponent implements OnInit{
  
  public showMenu:boolean = false;
  public showDetail: boolean = true;
  public headerStyle='pageHeaderextruderStyle';
  public headerText= 'Extruder Home Page';
  columnsToDisplay: string[] = ['extruderColorName', 'widthName', 'totalLength', 'totalWeight'];  
  public showTable$ = true;
  public dataSource:any[] = [];
  
  constructor(private extruderService: ExtruderService, private sharedNavService: SharedNavService, private router: Router, private activatedRoute: ActivatedRoute, 
    private extruderHomeService: ExtruderHomeService ) {  
    this.activatedRoute.url.subscribe(activeUrl =>{
      this.sharedNavService.raiseDataEmitterEvent(window.location.pathname);
    });

    
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
          switch(event.url){
            case '/extruder':
              this.extruderHomeService.setShowExtruderHomeObs(true);
              break;
            case '/extruder/add':
              this.extruderHomeService.setShowExtruderHomeObs(false);
              break;
            case '/extruder/reports':
              this.extruderHomeService.setShowExtruderHomeObs(false);
          }
        // handle NavigationEnd event here
        // console.log(event.url);
      }
    });
  }
  ngOnInit(): void {
    //https://stackoverflow.com/questions/57355066/how-to-implement-behavior-subject-using-service-in-angular-8
    this.extruderHomeService.getShowExtruderHomeObs().subscribe(data => this.showTable$ = data);
    this.extruderService.getExtruderSummary().subscribe(data => {
      this.dataSource = data;
    });

  }

  changeView(passedValue: string){
    switch(passedValue){
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
