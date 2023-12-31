import { Component, Input } from '@angular/core';
import { ExtruderSummary } from 'src/app/shared/model/extruderInsertModel';

@Component({
  selector: 'app-extruder-summary',
  templateUrl: './extruder-summary.component.html',
  styleUrl: './extruder-summary.component.scss'
})
export class ExtruderSummaryComponent {
  color = 'green';
  colorList = ['green', 'yellow', 'blue', 'red', 'orange']
  @Input() columnsToDisplay: string[] = [];
  @Input() dataSource: ExtruderSummary[] = [];
  @Input() columnNames: string[] = [];

  changeColor(){
    var colorRandomIndex = this.baseRandom(0, this.colorList.length-1);
    this.color = this.colorList[colorRandomIndex];
  }

  baseRandom(lower:number, upper:number) {
    return lower + Math.floor(Math.random() * (upper - lower + 1));
  }
}

