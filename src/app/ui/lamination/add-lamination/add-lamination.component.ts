import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedNavService } from 'src/app/shared/service/sharedNavService';

@Component({
  selector: 'app-add-lamination', 
  templateUrl: './add-lamination.component.html',
  styleUrl: './add-lamination.component.scss'
})
export class AddLaminationComponent {
  constructor(private sharedNavService: SharedNavService, private activatedRoute: ActivatedRoute) {  
    this.activatedRoute.url.subscribe(activeUrl =>{
      this.sharedNavService.raiseDataEmitterEvent(window.location.pathname);
    });
  }
}
