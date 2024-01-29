import { AfterViewChecked, AfterViewInit, Component, Input, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { crossplyModel } from 'src/app/shared/model/crossply.model';
import { CrossplyService } from 'src/app/shared/service/crossplyService';
import { DownloadService } from 'src/app/shared/service/downloadService';

@Component({
  selector: 'app-display-crossply',
  templateUrl: './display-crossply.component.html',
  styleUrl: './display-crossply.component.scss'
})
export class DisplayCrossplyComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() headerColor = '#84A98C'; 
  sub$: Subscription | undefined;
  myData: crossplyModel[] = [];
  dataSourceData: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  displayedColumns = ['crossplyId', 'crossplyLocation',
    'crossplyColor', 'crossplyWidth',
    'crossplyLength', 'crossplyWeight',
    'crossplyRollNumber', 'crossplyFullName',
    'crossplyCreatedDate', 'crossplyComment'];

  @ViewChild('crossplyTblSort') crossplyTblSort = new MatSort();

  constructor(private crossplyService: CrossplyService,
    private activatedRoute: ActivatedRoute,
    private downloadService: DownloadService,
    private router: Router) { }


  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.sub$ = this.crossplyService.getCrossplyAllData$.subscribe(data => {
      console.log('data fetched crossply display-crossply', data);     
        data.forEach((x: any) => x.crossplyFullName = x.crossplyFirstName + " " + x.crossplyLastName);
        this.dataSourceData = new MatTableDataSource(data);
        this.setSortAccessors();     
    });
  }

  setSortAccessors() {
    this.crossplyTblSort.disableClear = true;
    this.dataSourceData.sort = this.crossplyTblSort;
    this.dataSourceData.sortingDataAccessor = (row: crossplyModel, columnName: string): any => {
      const columnValue = this.getColumnValue(columnName, row);
      return columnValue;
    }
  }

  getColumnValue(columnNamePassed: string, row: crossplyModel) {
    let columnValue: any;
    switch (columnNamePassed) {
      case 'crossplyId':
        columnValue = row.crossplyId;
        break;
      case 'crossplyLocation':
        columnValue = row.crossplyLocation;
        break;
      case 'crossplyColor':
        columnValue = row.crossplyColor;
        break;
      case 'crossplyWidth':
        columnValue = row.crossplyWidth;
        break;
      case 'crossplyLength':
        columnValue = +row.crossplyLength;
        break;
      case 'crossplyWeight':
        columnValue = +row.crossplyWeight;
        break;
      case 'crossplyComment':
        columnValue = row.crossplyComment;
        break;
      case 'crossplyCreatedDate':
        columnValue = new Date(row.crossplyCreatedDate);
        break;
      case 'crossplyRollNumber':
        columnValue = row.crossplyRollNumber;
        break;
      case 'crossplyFullName':
        columnValue = row.crossplyFullName;
        break;
    }
    return columnValue;
  }

  ngOnDestroy(): void {
    this.sub$?.unsubscribe();
  }
}

