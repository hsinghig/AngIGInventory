import { Component, OnInit } from '@angular/core';
import { ExtruderService } from './shared/service/extruderService';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { IColorModel } from './shared/model/colorModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
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

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}