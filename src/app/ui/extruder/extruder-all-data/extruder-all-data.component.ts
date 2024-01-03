import { Component } from '@angular/core';
import { ExtruderAllDataModel } from 'src/app/shared/model/extruderInsertModel';
import { ExtruderService } from 'src/app/shared/service/extruderService';

@Component({
  selector: 'app-extruder-all-data',
  templateUrl: './extruder-all-data.component.html',
  styleUrl: './extruder-all-data.component.scss'
})
export class ExtruderAllDataComponent {
  headerColor = '#84A98C';
  colorList = ['#84A98C', '#3C4A3F', '#9EAFA2', '#6CABA8'];
  columnsToDisplay: string[] = [
    'rollnumber', 'name', 'colorname', 'widthname','length', 'weight', 'fullname', 'createdDate', 'comment'
  ]; 
  dataSource: ExtruderAllDataModel[] = [];

  constructor(private extruderService: ExtruderService ) {     
    this.extruderService.getExtruderData().subscribe(data => {     
      this.dataSource = data;
    });
  }
  changeColor(){
    var colorRandomIndex = this.baseRandom(0, this.colorList.length-1);
    this.headerColor = this.colorList[colorRandomIndex];
  }

  baseRandom(lower:number, upper:number) {
    return lower + Math.floor(Math.random() * (upper - lower + 1));
  }

}
