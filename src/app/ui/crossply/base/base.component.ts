import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CrossplyHomeService } from 'src/app/shared/service/crossplyhome.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss'
})
export class BaseComponent {
  constructor(private router: Router, 
    private crossplyHomeService: CrossplyHomeService){
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
}
