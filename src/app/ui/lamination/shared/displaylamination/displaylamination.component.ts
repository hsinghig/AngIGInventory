import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { laminationModel } from 'src/app/shared/model/lamination.model';
import { DownloadService } from 'src/app/shared/service/downloadService';
import { LaminationService } from 'src/app/shared/service/laminationService';
import { LoaderService } from 'src/app/shared/service/loader.service';

@Component({
  selector: 'app-display-lamination',
  templateUrl: './displaylamination.component.html',
  styleUrl: './displaylamination.component.scss'
})
export class DisplaylaminationComponent implements OnInit, AfterViewInit, OnDestroy{
  @Input() headerColor = '#84A98C';
  subLaminationService$:Subscription| undefined;
  dataSourceData: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  displayedColumns = ['laminationId', 'laminationLocationName',
    'referenceNumber','laminationFullName',
     'laminationCreatedDate', 'laminationComment'];

  @ViewChild('laminationTblSort') laminationTblSort = new MatSort();

  constructor(private laminationService: LaminationService,
    private loaderService: LoaderService,
    private router: Router) { }

  ngOnInit(): void {
    this.loaderService.showLoader();
  }
  ngAfterViewInit(): void {
    this.subLaminationService$ = this.laminationService.getLaminationAllData().subscribe(data => {    
      this.loaderService.hideLoader(); 
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
  ngOnDestroy(): void {
    this.subLaminationService$?.unsubscribe();
  }
}

