import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedNavService } from 'src/app/shared/service/sharedNavService';

@Component({
  selector: 'app-add-extruder',
  templateUrl: './add-extruder.component.html',
  styleUrl: './add-extruder.component.scss'
})
export class AddExtruderComponent {
  constructor(private sharedNavService: SharedNavService, private activatedRoute: ActivatedRoute) {  
    this.activatedRoute.url.subscribe(activeUrl =>{
      this.sharedNavService.raiseDataEmitterEvent(window.location.pathname);
    });
  }
}
