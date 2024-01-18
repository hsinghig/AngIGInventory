import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ExtruderDownloadModel, ExtruderModel } from 'src/app/shared/model/extruder.model';
import { DownloadService } from 'src/app/shared/service/downloadService';
import { ExtruderService } from 'src/app/shared/service/extruderService';
import { LoaderService } from 'src/app/shared/service/loader.service';

@Component({
  selector: 'app-extruder-all-data',
  templateUrl: './extruder-all-data.component.html',
  styleUrl: './extruder-all-data.component.scss'
})
export class ExtruderAllDataComponent implements OnInit, AfterViewInit{
  @Input() headerColor = '#84A98C'; 
  columnsToDisplay: string[] = [
    'rollnumber', 'name', 'colorname', 'widthname','length', 'weight', 'fullname', 'createdDate', 'comment'
  ]; 
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  @ViewChild('extruderTblSortWithObject') extruderTblSortWithObject = new MatSort();
  constructor(private extruderService: ExtruderService, 
    private loaderService: LoaderService, 
    private router:Router) {     
   
  }

  ngOnInit(): void {
    this.loaderService.showLoader();
  }

  ngAfterViewInit(): void {
    this.extruderService.getExtruderData().subscribe(data => {  
      this.loaderService.hideLoader();
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
}
