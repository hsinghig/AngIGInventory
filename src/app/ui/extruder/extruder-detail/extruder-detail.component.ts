import { Component, Input } from '@angular/core';
import { ExtruderDetail, ExtruderSummary } from 'src/app/shared/model/extruderInsertModel';

@Component({
  selector: 'app-extruder-detail',
  templateUrl: './extruder-detail.component.html',
  styleUrl: './extruder-detail.component.scss'
})
export class ExtruderDetailComponent {

  columnsToDisplay: string[] = [
    'rollnumber', 'name', 'colorname', 'widthname','length', 'weight', 'fullname', 'createdDate', 'comment'
  ];
  @Input() dataSource: ExtruderDetail[] = [];

  getTotalWeight(){
    return this.dataSource.map(t => t.weight).reduce((acc, value) => acc + value, 0);
  }

  getTotalLength(){
    return this.dataSource.map(t => t.length).reduce((acc, value) => acc + value, 0);
  }
}
