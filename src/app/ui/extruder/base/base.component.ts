import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ExtruderHomeService } from 'src/app/shared/service/extruderhome.service';

@Component({
  selector: 'app-extruder-base',
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss'
})
export class BaseComponent {
  constructor(private router:Router, private extruderHomeService: ExtruderHomeService){
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        switch (event.url) {
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
}
