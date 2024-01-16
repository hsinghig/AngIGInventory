import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { laminationModel } from 'src/app/shared/model/lamination.model';
import { DownloadService } from 'src/app/shared/service/downloadService';
import { LaminationService } from 'src/app/shared/service/laminationService';

@Component({
  selector: 'app-display-lamination',
  templateUrl: './displaylamination.component.html',
  styleUrl: './displaylamination.component.scss'
})
export class DisplaylaminationComponent implements AfterViewInit{
  headerColor = '#84A98C';
  colorList = ['#84A98C', '#3C4A3F', '#9EAFA2', '#6CABA8'];

  dataSourceData: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  displayedColumns = ['laminationId', 'laminationLocationName',
    'laminationColorName', 'laminationLength',
    'laminationWeight', 'referenceNumber','laminationFullName',
     'laminationCreatedDate'];

  @ViewChild('laminationTblSort') laminationTblSort = new MatSort();

  constructor(private laminationService: LaminationService,
    private downloadService: DownloadService,
    private router: Router) { }

  ngAfterViewInit(): void {
    this.laminationService.getLaminationAllData().subscribe(data => {     
      for(const element of data){
        element.laminationFullName = element.laminationFirstName + ' ' + element.laminationLastName;
      }
   
      this.dataSourceData = new MatTableDataSource(data);
      this.setSortAccessors();
    });
  }

  setSortAccessors() {
    this.laminationTblSort.disableClear = true;
    this.dataSourceData.sort = this.laminationTblSort;
    this.dataSourceData.sortingDataAccessor = (row: laminationModel, columnName: string): any => {
      const columnValue = this.getColumnValue(columnName, row);
      return columnValue;
    }
  }

  getColumnValue(columnNamePassed: string, row: any) {
    let columnValue: any;
    switch (columnNamePassed) {
      case 'laminationId':
        columnValue = row.laminationId;
        break;
      case 'laminationLocationName':
        columnValue = row.laminationLocationName;
        break;
      case 'laminationColorName':
        columnValue = row.laminationColorName;
        break;
      case 'laminationLength':
        columnValue = +row.laminationLength;
        break;     
      case 'laminationWeight':
        columnValue = +row.laminationWeight;
        break;
      
      case 'laminationCreatedDate':
        columnValue = new Date(row.laminationCreatedDate);
        break;
      case 'referenceNumber':
        columnValue = row.referenceNumber;
        break;
      case 'laminationFullName':
        columnValue = row.laminationFullName;
        break;
    }
    return columnValue;
  }

  downloadLaminationFile() {
    this.laminationService.getLaminationAllData().subscribe(data => {
      for(const element of data){
        element.laminationFullName = element.laminationFirstName + ' ' + element.laminationLastName;
      }
     
      const headersToParse: string[] = ['laminationId', 'laminationLocationName', 'laminationColorName', 
        'laminationLength', 'laminationWeight', 'referenceNumber', 'laminationCreatedDate', 'laminationFullName'];
      const headersToShow: string[] = ['Id', 'Location', 'Color', 'Length', 'Weight', 'Reference Number',
        'Created Date', 'Created By'];
      this.downloadService.downloadFile(data, 'laminationData', headersToShow, headersToParse);
    });
  }



  takeMeToAdd() {   
    this.router.navigateByUrl('/lamination/add');
  }

  changeColor() {
    const colorRandomIndex = this.baseRandom(0, this.colorList.length - 1);
    this.headerColor = this.colorList[colorRandomIndex];
  }
  baseRandom(lower: number, upper: number) {
    return lower + Math.floor(Math.random() * (upper - lower + 1));
  }
}

