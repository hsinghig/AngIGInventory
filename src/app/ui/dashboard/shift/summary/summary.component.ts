import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MY_SHIFT_SUMMARY_DATA, ShiftSummaryModel } from 'src/app/shared/model/shiftsummaryModel';
import { SharedNavService } from 'src/app/shared/service/sharedNavService';

@Component({
  selector: 'app-dashboard-summary', 
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent  implements OnInit, AfterViewInit {
  public headerColor: string = '#84A98C';
  sub$: Subscription | undefined;
  myData: ShiftSummaryModel[] = [];
  dataSourceData: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  displayedColumns = ['dateCreated', 'comment',
     'downtimeExceedHour',
     'remedy', 'totalProductionLength', 'totalScrapLength',
    'createdBy'];

  @ViewChild('shiftSummaryTblSort') shiftSummaryTblSort = new MatSort();
  
  constructor(private sharedNavService: SharedNavService, private activatedRoute: ActivatedRoute) {  
    this.activatedRoute.url.subscribe(activeUrl =>{
      this.sharedNavService.raiseDataEmitterEvent(window.location.pathname);
    });
  }
  

ngOnInit(): void {
 
}

ngAfterViewInit(): void {
  this.dataSourceData= new MatTableDataSource(MY_SHIFT_SUMMARY_DATA);
  this.setSortAccessors();
}

setSortAccessors(){
  this.shiftSummaryTblSort.disableClear = true;
  this.dataSourceData.sort = this.shiftSummaryTblSort;
  this.dataSourceData.sortingDataAccessor = (row:ShiftSummaryModel, columnName:string) : any => {
    const columnValue = this.getColumnValue(columnName, row); 
    return columnValue;
  }
}

getColumnValue(columnNamePassed: string, row:ShiftSummaryModel){
  let columnValue:any;
  switch(columnNamePassed){
    case 'comment':
      columnValue = row.comment?? '';
      break;
    case 'dateCreated':
      columnValue = new Date(row.dateCreated);
      break;
    case 'createdBy':
      columnValue = row.createdBy;
      break;
    case 'remedy':
      columnValue = row.remedy;
      break;

    case 'totalProductionLength':
      columnValue = row.totalProductionLength;
      break;
    case 'totalScrapLength':
      columnValue = row.totalScrapLength;
      break;
    case 'downtimeExceedHour':
      columnValue = row.downtimeExceedHour;
      break;
  }
  return columnValue;
}  

}



