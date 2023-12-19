import { Component, OnInit } from '@angular/core';
import { ExtruderService } from './shared/service/extruderService';
import { EMPTY, Observable, catchError, map, tap } from 'rxjs';
import { IColorModel } from './shared/model/colorModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  
  title = 'AngIGInventory';
  errorMessage = '';
  extruderColorList$: Observable<IColorModel[]> | undefined;
  constructor(private extruderService: ExtruderService) {   
  }
  ngOnInit(): void {
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
