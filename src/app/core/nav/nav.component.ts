import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NAVIGATION_CONSTANTS } from 'src/app/shared/model/navigationConstants';

@Component({
  selector: 'app-nav', 
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  applicationTitle: string = 'IG Inventory System';
  ADD = NAVIGATION_CONSTANTS.ADD;


  constructor(private router:Router) {       
  }

  public OnMenuClick($event: MouseEvent, root:string, value: string){   
    let urlToGo = '';
    if (root == ''){       
        this.router.navigateByUrl(urlToGo);
    } else {      
      if (value == ''){
          urlToGo = '/' + root ;
      } else {
        urlToGo = '/' + root + '/' + value;
      }           
      this.router.navigateByUrl(urlToGo);
    }
  }
}
