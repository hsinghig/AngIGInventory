import { Component, Input } from '@angular/core';
import { ExtruderService } from 'src/app/shared/service/extruderService';

@Component({
  selector: 'app-extruder-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
@Input() extruderId:number = 0;
constructor(private extruderService:ExtruderService){

}
  

}
