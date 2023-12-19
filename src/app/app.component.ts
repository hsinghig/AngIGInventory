import { Component } from '@angular/core';
import { ExtruderService } from './shared/service/extruderService';
import { EMPTY, catchError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AngIGInventory';
  errorMessage = '';
  extruderColorList$ = this.extruderService.extruderColorList$?.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );
  constructor(private extruderService: ExtruderService) {      
  }
 
}
