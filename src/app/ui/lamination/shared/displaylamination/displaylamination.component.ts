import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
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
  @Input() headerColor = '#84A98C';
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
}

