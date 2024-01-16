import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ExtruderDownloadModel, ExtruderModel } from 'src/app/shared/model/extruder.model';
import { DownloadService } from 'src/app/shared/service/downloadService';
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
  constructor(private extruderService: ExtruderService, 
    private downloadService:DownloadService, 
    private router:Router) {     
   
  }

  ngAfterViewInit(): void {
    this.extruderService.getExtruderData().subscribe(data => {  
      data.forEach(x => x.crossplyFullName = x.crossplyFirstName + " " + x.crossplyLastName);
      
      this.dataSource = new MatTableDataSource(data);
      this.setSortAccessors();
    });
  }

  setSortAccessors(){
    this.extruderTblSortWithObject.disableClear = true;
    this.dataSource.sort = this.extruderTblSortWithObject;
    this.dataSource.sortingDataAccessor = (row:ExtruderModel, columnName:string) : any => {
      const columnValue = this.getColumnValue(columnName, row); 
      return columnValue;
    }
  }

  getColumnValue(columnNamePassed: string, row:ExtruderModel){
    let columnValue:any;
    switch(columnNamePassed){
      case 'rollnumber':
        columnValue = row.extruderDetail?.rollnumber??'';
        break;
      case 'colorname':
        columnValue = row.extruderDetail.colorname;
        break;
      case 'name':
        columnValue = row.extruderDetail.name;
        break;       
      case 'fullname':
        columnValue = row.extruderDetail.fullname;
        break;
      case 'createdDate':
        columnValue = new Date(row.extruderDetail.createdDate);
        break;
      case 'widthname':
        columnValue = +row.extruderDetail.widthname;
        break;
      case 'length':
        columnValue = +row.extruderDetail.length;
        break;
      case 'weight':
        columnValue =+row.extruderDetail.weight;
        break;
      case 'comment':
        columnValue = row.extruderDetail?.comment ?? '';
        break;
    }
    return columnValue;
  }

  
  downloadExtruderFile(){
    this.extruderService.getExtruderData().subscribe(data => {
      var dataToPass:ExtruderDownloadModel[] = this.convertDataToExtruderDownloadModel(data);
      const headersToParse: string[] = ['extruderId', 'locationName', 'colorName', 'widthName', 
     'length', 'weight', 'rollNumber', 'createdDate', 'createdBy'];
      const headersToShow: string[] = ['Id', 'Location', 'Color', 'Width', 'Length', 'Weight', 'RollNumber', 'Created Date', 'Created By'];
    
      this.downloadService.downloadFile(dataToPass, 'extruderData', headersToShow, headersToParse);
    })
  }

  convertDataToExtruderDownloadModel(data: any[]): ExtruderDownloadModel[]{
    const itemList: ExtruderDownloadModel[] = [];
    data.forEach(x => {
      var model:ExtruderDownloadModel = {
        extruderId: x.extruderDetail.id,
        locationName: x.extruderDetail.name,
        colorName: x.extruderDetail.colorname,
        widthName: x.extruderDetail.widthname,
        length : x.extruderDetail.length,
        weight: x.extruderDetail.weight,
        rollNumber: x.extruderDetail.rollnumber,
        createdDate: x.createdDateDisplayDateEST,
        createdBy: x.extruderDetail.firstname + " " + x.extruderDetail.lastname
      }
      itemList.push(model);
    });
    console.log('print item list : ', itemList);
    return itemList;
  }

  takeMeToAdd(){    
    this.router.navigateByUrl('/extruder/add');
  }

  changeColor(){
    const colorRandomIndex = this.baseRandom(0, this.colorList.length-1);
    this.headerColor = this.colorList[colorRandomIndex];
  }

  baseRandom(lower:number, upper:number) {
    return lower + Math.floor(Math.random() * (upper - lower + 1));
  }

}
