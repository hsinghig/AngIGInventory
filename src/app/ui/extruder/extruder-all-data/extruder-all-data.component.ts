import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ExtruderModel } from 'src/app/shared/model/extruder.model';
import { ExtruderService } from 'src/app/shared/service/extruderService';

@Component({
  selector: 'app-extruder-all-data',
  templateUrl: './extruder-all-data.component.html',
  styleUrl: './extruder-all-data.component.scss'
})
export class ExtruderAllDataComponent implements AfterViewInit{
  headerColor = '#84A98C';
  colorList = ['#84A98C', '#3C4A3F', '#9EAFA2', '#6CABA8'];
  columnsToDisplay: string[] = [
    'rollnumber', 'name', 'colorname', 'widthname','length', 'weight', 'fullname', 'createdDate', 'comment'
  ]; 
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  @ViewChild('extruderTblSortWithObject') extruderTblSortWithObject = new MatSort();
  constructor(private extruderService: ExtruderService ) {     
   
  }

  ngAfterViewInit(): void {
    this.extruderService.getExtruderData().subscribe(data => {     
      this.dataSource = new MatTableDataSource(data);
      this.setSortAccessors();
    });
  }

  setSortAccessors(){
    this.extruderTblSortWithObject.disableClear = true;
    this.dataSource.sort = this.extruderTblSortWithObject;
    this.dataSource.sortingDataAccessor = (row:ExtruderModel, columnName:string) : any => {
      var columnValue = this.getColumnValue(columnName, row); 
      return columnValue;
    }
  }

  getColumnValue(columnNamePassed: string, row:ExtruderModel){
    var columnValue = '';
    switch(columnNamePassed){
      case 'colorname':
        columnValue = row.extruderDetail.colorname;
        break;
      case 'name':
        columnValue = row.extruderDetail.name;
        break;       
      case 'fullname':
        columnValue = row.extruderDetail.fullname;
        break;
    }
    return columnValue;
  }


  changeColor(){
    var colorRandomIndex = this.baseRandom(0, this.colorList.length-1);
    this.headerColor = this.colorList[colorRandomIndex];
  }

  baseRandom(lower:number, upper:number) {
    return lower + Math.floor(Math.random() * (upper - lower + 1));
  }

}
