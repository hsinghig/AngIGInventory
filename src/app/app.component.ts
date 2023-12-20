import { Component, OnInit } from '@angular/core';
import { ExtruderService } from './shared/service/extruderService';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { IColorModel } from './shared/model/colorModel';
import { SharedNavService } from './shared/service/sharedNavService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{ 
  errorMessage = '';
  extruderColorList$: Observable<IColorModel[]> | undefined;
  constructor(private sharedNavService: SharedNavService, private extruderService: ExtruderService) {   
    
  }
  ngOnInit(): void {   
    //this.navigatedURL= this.sharedNavService.getMessage();
    this.extruderColorList$ = this.extruderService.getExtruderColors().pipe(
      tap(x => {
        console.log('In component');
        console.log(x);
      }),
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    )
  }
 
}
