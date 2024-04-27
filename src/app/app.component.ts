import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LoaderService } from './shared/service/loader.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent { 
  showBroadcast:boolean = false;
  broadcastMessage: string = ', This is the broadcast messageThis is the broadcast messageThis is the broadcast messageThis is the broadcast messageThis is the broadcast message';
  errorMessage = '';
  showLoader$ = this.loaderService.loadingAction$;  
  constructor(private loaderService:LoaderService) {  } 
}

//extruderColorList$: Observable<ColorModel[]> | undefined;
 //this.navigatedURL= this.sharedNavService.getMessage();
    // this.extruderColorList$ = this.extruderService.getExtruderColors().pipe(
    //   tap(x => {
    //     console.log('In component');
    //     console.log(x);
    //   }),
    //   catchError(err => {
    //     this.errorMessage = err;
    //     return EMPTY;
    //   })
    // )