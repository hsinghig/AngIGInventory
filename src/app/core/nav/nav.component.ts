import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav', 
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  applicationTitle: string = 'IG Inventory System';

  constructor(private router:Router) {       
  }

  OnClick($event: MouseEvent){
    this.router.navigateByUrl('/dashboard/13')
  }
}
