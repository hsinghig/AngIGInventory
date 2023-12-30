import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HOME_PAGE_CARDS, ICardModel } from 'src/app/shared/model/cardModel';
import { SharedNavService } from 'src/app/shared/service/sharedNavService';

@Component({
  selector: 'app-home-start',  
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss'
})
export class StartComponent {
  public cardList: ICardModel[] = HOME_PAGE_CARDS;
  constructor(private sharedNavService: SharedNavService, private activatedRoute: ActivatedRoute) {  
    this.activatedRoute.url.subscribe(activeUrl =>{
      this.sharedNavService.raiseDataEmitterEvent(window.location.pathname);
    });
  }
}
