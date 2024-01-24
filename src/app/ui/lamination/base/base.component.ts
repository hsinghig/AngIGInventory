import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LaminationHomeService } from 'src/app/shared/service/laminationhome.service';

@Component({
  selector: 'app-lamination-base',
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss'
})
export class BaseComponent {
  constructor(private router:Router, private laminationHomeService: LaminationHomeService){
    console.log('In Lamination Base');
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
          switch(event.url){
            case '/lamination/home':
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
}
