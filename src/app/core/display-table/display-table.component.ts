import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ExtruderModel } from 'src/app/shared/model/extruder.model';
import { ExtruderDetail } from 'src/app/shared/model/extruder.model';

@Component({
  selector: 'app-display-table',
  templateUrl: './display-table.component.html',
  styleUrl: './display-table.component.scss'
})
export class DisplayTableComponent implements OnInit, AfterViewInit{  
  displayedColumns:string[] = [];
  displayData: ExtruderDetail[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
 // @ViewChild('tblSortObject') tblSortObject = new MatSort();

  ngOnInit(): void {
    this.getColumnsDisplay();
    this.displayData= convertDataType(HARDCODED_DATA);
   // console.log(this.displayData);
    this.dataSource = new MatTableDataSource(this.displayData);
  }

  ngAfterViewInit(): void {     
    console.log("In ng after view init");
    // this.tblSortObject.disableClear = true;
    // this.dataSource.sort = this.tblSortObject;
    // this.dataSource.sortingDataAccessor = (row:any, columnname:string): any =>{
    //   var columnValue = this.getColumnValue(columnname, row);
    //   return columnValue;
    // }
  }
  getColumnsDisplay() {
    const itemList:ITableColumnDisplay[] = TABLE_COLUMN_LIST_SMALL;
    this.displayedColumns = itemList.map(x => x.columnDisplayName);
  //  console.log(this.displayedColumns);
  }

  getColumnValue(columnNamePassed: string, row:any){
    let columnValue:any;
    const item = TABLE_COLUMN_LIST.find( x=>x.columnDisplayName == columnNamePassed);
    if (item?.columnReturnDataType == 'string'){
      if (item.columnIsNullable){
        columnValue = row?.columnNamePassed ?? '';
      } else {
        columnValue = row.columnNamePassed;
      }      
    }
    if (item?.columnReturnDataType == 'number'){
      columnValue = +row.columnNamePassed;
    }
    if (item?.columnReturnDataType == 'date'){
      columnValue = new Date(row.columnNamePassed);
    }
    return columnValue;
  }

  getColumnValueNumber(columnValue:string){
    return +columnValue;
  }

  getColumnValueDate(columnValue: string){
    return new Date(columnValue);
  }
}

export const HARDCODED_DATA:ExtruderModel[] = 
  [
    {
        "createdDateDisplayDateEST": "12-06-2023 22:16:25",
        "createdDateDisplayDateUTC": "12-07-2023 03:16:25",
        "modifiedDateEST": "12-06-2023 22:17:34",
        "extruderDetail": {
            "id": 1,
            "locationId": 1,
            "name": "Ext A",
            "colorId": 1,
            "colorname": "black",
            "widthId": 1,
            "widthname": "87",
            "length": 300,
            "createdById": 1,
            "firstname": "hemant",
            "lastname": "singh",
            "fullname": "hemant singh",
            "email": "hsingh@impact-guard.com",
            "createdDate": "2023-12-07T03:16:25.17",
            "modifiedDate": "2023-12-07T03:17:34.753",
            "weight": 150,
            "rollnumber": null,
            "comment": null,
            "modifiedById": 1
        }
    },
    {
        "createdDateDisplayDateEST": "12-10-2023 21:03:17",
        "createdDateDisplayDateUTC": "12-11-2023 02:03:17",
        "modifiedDateEST": "12-10-2023 21:03:17",
        "extruderDetail": {
            "id": 2,
            "locationId": 1,
            "name": "Ext A",
            "colorId": 3,
            "colorname": "green",
            "widthId": 4,
            "widthname": "102",
            "length": 2345,
            "createdById": 3,
            "firstname": "nathan",
            "lastname": "kyle",
            "fullname": "nathan kyle",
            "email": "nkyle@impact-guard.com",
            "createdDate": "2023-12-11T02:03:17.567",
            "modifiedDate": "2023-12-11T02:03:17.567",
            "weight": 22,
            "rollnumber": "12345",
            "comment": null,
            "modifiedById": 3
        }
    },
    {
        "createdDateDisplayDateEST": "12-10-2023 21:03:44",
        "createdDateDisplayDateUTC": "12-11-2023 02:03:44",
        "modifiedDateEST": "12-10-2023 21:03:44",
        "extruderDetail": {
            "id": 3,
            "locationId": 1,
            "name": "Ext A",
            "colorId": 3,
            "colorname": "green",
            "widthId": 4,
            "widthname": "102",
            "length": 2342,
            "createdById": 1,
            "firstname": "hemant",
            "lastname": "singh",
            "fullname": "hemant singh",
            "email": "hsingh@impact-guard.com",
            "createdDate": "2023-12-11T02:03:44.81",
            "modifiedDate": "2023-12-11T02:03:44.81",
            "weight": 223,
            "rollnumber": "1234577",
            "comment": null,
            "modifiedById": 1
        }
    },
    {
        "createdDateDisplayDateEST": "12-10-2023 21:05:02",
        "createdDateDisplayDateUTC": "12-11-2023 02:05:02",
        "modifiedDateEST": "12-10-2023 21:05:02",
        "extruderDetail": {
            "id": 4,
            "locationId": 1,
            "name": "Ext A",
            "colorId": 1,
            "colorname": "black",
            "widthId": 4,
            "widthname": "102",
            "length": 2342,
            "createdById": 1,
            "firstname": "hemant",
            "lastname": "singh",
            "fullname": "hemant singh",
            "email": "hsingh@impact-guard.com",
            "createdDate": "2023-12-11T02:05:02.193",
            "modifiedDate": "2023-12-11T02:05:02.193",
            "weight": 223,
            "rollnumber": "12",
            "comment": null,
            "modifiedById": 1
        }
    },
    {
        "createdDateDisplayDateEST": "12-29-2023 03:49:26",
        "createdDateDisplayDateUTC": "12-29-2023 08:49:26",
        "modifiedDateEST": "12-29-2023 03:49:26",
        "extruderDetail": {
            "id": 5,
            "locationId": 1,
            "name": "Ext A",
            "colorId": 1,
            "colorname": "black",
            "widthId": 1,
            "widthname": "87",
            "length": 0,
            "createdById": 1,
            "firstname": "hemant",
            "lastname": "singh",
            "fullname": "hemant singh",
            "email": "hsingh@impact-guard.com",
            "createdDate": "2023-12-29T08:49:26.2",
            "modifiedDate": "2023-12-29T08:49:26.2",
            "weight": 100,
            "rollnumber": "AA200",
            "comment": "added from swagger",
            "modifiedById": 1
        }
    },
    {
        "createdDateDisplayDateEST": "12-29-2023 03:55:03",
        "createdDateDisplayDateUTC": "12-29-2023 08:55:03",
        "modifiedDateEST": "12-29-2023 03:55:03",
        "extruderDetail": {
            "id": 6,
            "locationId": 1,
            "name": "Ext A",
            "colorId": 1,
            "colorname": "black",
            "widthId": 1,
            "widthname": "87",
            "length": 0,
            "createdById": 1,
            "firstname": "hemant",
            "lastname": "singh",
            "fullname": "hemant singh",
            "email": "hsingh@impact-guard.com",
            "createdDate": "2023-12-29T08:55:03.337",
            "modifiedDate": "2023-12-29T08:55:03.337",
            "weight": 10,
            "rollnumber": "AA200",
            "comment": "added from swagger",
            "modifiedById": 1
        }
    },
    {
        "createdDateDisplayDateEST": "01-01-2024 14:26:06",
        "createdDateDisplayDateUTC": "01-01-2024 19:26:06",
        "modifiedDateEST": "01-01-2024 14:26:06",
        "extruderDetail": {
            "id": 7,
            "locationId": 1,
            "name": "Ext A",
            "colorId": 7,
            "colorname": "yellow",
            "widthId": 5,
            "widthname": "105",
            "length": 100,
            "createdById": 1,
            "firstname": "hemant",
            "lastname": "singh",
            "fullname": "hemant singh",
            "email": "hsingh@impact-guard.com",
            "createdDate": "2024-01-01T19:26:06.117",
            "modifiedDate": "2024-01-01T19:26:06.117",
            "weight": 20,
            "rollnumber": "BB1234",
            "comment": null,
            "modifiedById": 1
        }
    },
    {
        "createdDateDisplayDateEST": "01-01-2024 14:28:55",
        "createdDateDisplayDateUTC": "01-01-2024 19:28:55",
        "modifiedDateEST": "01-01-2024 14:28:55",
        "extruderDetail": {
            "id": 8,
            "locationId": 1,
            "name": "Ext A",
            "colorId": 7,
            "colorname": "yellow",
            "widthId": 6,
            "widthname": "111",
            "length": 1100,
            "createdById": 3,
            "firstname": "nathan",
            "lastname": "kyle",
            "fullname": "nathan kyle",
            "email": "nkyle@impact-guard.com",
            "createdDate": "2024-01-01T19:28:55.697",
            "modifiedDate": "2024-01-01T19:28:55.697",
            "weight": 200,
            "rollnumber": "BA1234",
            "comment": null,
            "modifiedById": 3
        }
    },
    {
        "createdDateDisplayDateEST": "01-01-2024 16:00:07",
        "createdDateDisplayDateUTC": "01-01-2024 21:00:07",
        "modifiedDateEST": "01-01-2024 16:00:07",
        "extruderDetail": {
            "id": 9,
            "locationId": 1,
            "name": "Ext A",
            "colorId": 5,
            "colorname": "purple",
            "widthId": 6,
            "widthname": "111",
            "length": 300,
            "createdById": 1,
            "firstname": "hemant",
            "lastname": "singh",
            "fullname": "hemant singh",
            "email": "hsingh@impact-guard.com",
            "createdDate": "2024-01-01T21:00:07.637",
            "modifiedDate": "2024-01-01T21:00:07.637",
            "weight": 20,
            "rollnumber": "AA200",
            "comment": "testing UI comments length by writing a long comment page.",
            "modifiedById": 1
        }
    },
    {
        "createdDateDisplayDateEST": "01-01-2024 21:59:41",
        "createdDateDisplayDateUTC": "01-02-2024 02:59:41",
        "modifiedDateEST": "01-01-2024 21:59:41",
        "extruderDetail": {
            "id": 10,
            "locationId": 1,
            "name": "Ext A",
            "colorId": 5,
            "colorname": "purple",
            "widthId": 5,
            "widthname": "105",
            "length": 123,
            "createdById": 1,
            "firstname": "hemant",
            "lastname": "singh",
            "fullname": "hemant singh",
            "email": "hsingh@impact-guard.com",
            "createdDate": "2024-01-02T02:59:41.303",
            "modifiedDate": "2024-01-02T02:59:41.303",
            "weight": 23,
            "rollnumber": "AABBCC",
            "comment": "this is comment",
            "modifiedById": 1
        }
    },
    {
        "createdDateDisplayDateEST": "01-01-2024 22:06:50",
        "createdDateDisplayDateUTC": "01-02-2024 03:06:50",
        "modifiedDateEST": "01-01-2024 22:06:50",
        "extruderDetail": {
            "id": 11,
            "locationId": 1,
            "name": "Ext A",
            "colorId": 3,
            "colorname": "green",
            "widthId": 5,
            "widthname": "105",
            "length": 200,
            "createdById": 1,
            "firstname": "hemant",
            "lastname": "singh",
            "fullname": "hemant singh",
            "email": "hsingh@impact-guard.com",
            "createdDate": "2024-01-02T03:06:50.417",
            "modifiedDate": "2024-01-02T03:06:50.417",
            "weight": 20,
            "rollnumber": "AABBCC123",
            "comment": "comment added by UI",
            "modifiedById": 1
        }
    },
    {
        "createdDateDisplayDateEST": "01-01-2024 22:10:02",
        "createdDateDisplayDateUTC": "01-02-2024 03:10:02",
        "modifiedDateEST": "01-01-2024 22:10:02",
        "extruderDetail": {
            "id": 12,
            "locationId": 1,
            "name": "Ext A",
            "colorId": 2,
            "colorname": "blue",
            "widthId": 6,
            "widthname": "111",
            "length": 233,
            "createdById": 1,
            "firstname": "hemant",
            "lastname": "singh",
            "fullname": "hemant singh",
            "email": "hsingh@impact-guard.com",
            "createdDate": "2024-01-02T03:10:02.367",
            "modifiedDate": "2024-01-02T03:10:02.367",
            "weight": 123,
            "rollnumber": "ZA13",
            "comment": "comment",
            "modifiedById": 1
        }
    },
    {
        "createdDateDisplayDateEST": "01-01-2024 22:12:10",
        "createdDateDisplayDateUTC": "01-02-2024 03:12:10",
        "modifiedDateEST": "01-01-2024 22:12:10",
        "extruderDetail": {
            "id": 13,
            "locationId": 1,
            "name": "Ext A",
            "colorId": 7,
            "colorname": "yellow",
            "widthId": 5,
            "widthname": "105",
            "length": 123,
            "createdById": 1,
            "firstname": "hemant",
            "lastname": "singh",
            "fullname": "hemant singh",
            "email": "hsingh@impact-guard.com",
            "createdDate": "2024-01-02T03:12:10.097",
            "modifiedDate": "2024-01-02T03:12:10.097",
            "weight": 33,
            "rollnumber": "ZA123",
            "comment": "comment left",
            "modifiedById": 1
        }
    },
    {
        "createdDateDisplayDateEST": "01-01-2024 22:16:51",
        "createdDateDisplayDateUTC": "01-02-2024 03:16:51",
        "modifiedDateEST": "01-01-2024 22:16:51",
        "extruderDetail": {
            "id": 14,
            "locationId": 1,
            "name": "Ext A",
            "colorId": 7,
            "colorname": "yellow",
            "widthId": 6,
            "widthname": "111",
            "length": 200,
            "createdById": 1,
            "firstname": "hemant",
            "lastname": "singh",
            "fullname": "hemant singh",
            "email": "hsingh@impact-guard.com",
            "createdDate": "2024-01-02T03:16:51.857",
            "modifiedDate": "2024-01-02T03:16:51.857",
            "weight": 20,
            "rollnumber": "ZA1234",
            "comment": "comment",
            "modifiedById": 1
        }
    },
    {
        "createdDateDisplayDateEST": "01-04-2024 10:00:22",
        "createdDateDisplayDateUTC": "01-04-2024 15:00:22",
        "modifiedDateEST": "01-04-2024 10:00:22",
        "extruderDetail": {
            "id": 15,
            "locationId": 2,
            "name": "Ext B",
            "colorId": 3,
            "colorname": "green",
            "widthId": 4,
            "widthname": "102",
            "length": 100,
            "createdById": 1,
            "firstname": "hemant",
            "lastname": "singh",
            "fullname": "hemant singh",
            "email": "hsingh@impact-guard.com",
            "createdDate": "2024-01-04T15:00:22.63",
            "modifiedDate": "2024-01-04T15:00:22.63",
            "weight": 20,
            "rollnumber": "Y23",
            "comment": "testing date time submitted at 10am est",
            "modifiedById": 1
        }
    },
    {
        "createdDateDisplayDateEST": "01-05-2024 13:56:55",
        "createdDateDisplayDateUTC": "01-05-2024 18:56:55",
        "modifiedDateEST": "01-05-2024 13:56:55",
        "extruderDetail": {
            "id": 16,
            "locationId": 2,
            "name": "Ext B",
            "colorId": 2,
            "colorname": "blue",
            "widthId": 4,
            "widthname": "102",
            "length": 10,
            "createdById": 5,
            "firstname": "scott",
            "lastname": "gainar",
            "fullname": "scott gainar",
            "email": "sgainar@impact-guard.com",
            "createdDate": "2024-01-05T18:56:55.043",
            "modifiedDate": "2024-01-05T18:56:55.043",
            "weight": 20,
            "rollnumber": "ABC1234",
            "comment": "this is testing it ",
            "modifiedById": 5
        }
    }
];

export interface ITableColumnDisplay { 
    columnDisplayName: string;
    columnOrigDataType: string;
    columnReturnDataType: string;
    columnIsNullable: boolean;
    displayOrder:number;
}


export const TABLE_COLUMN_LIST_SMALL: ITableColumnDisplay[] = [
  {
    columnDisplayName: 'colorname', columnOrigDataType: 'string', columnReturnDataType: 'string', columnIsNullable: false, displayOrder:1
  },
  {
    columnDisplayName: 'name', columnOrigDataType: 'string', columnReturnDataType: 'string', columnIsNullable: false,displayOrder:2
  }
];

export const TABLE_COLUMN_LIST: ITableColumnDisplay[] = [
  {
    columnDisplayName: 'rollnumber', columnOrigDataType: 'string', columnReturnDataType: 'string', columnIsNullable: true, displayOrder:1
  },
  {
    columnDisplayName: 'name', columnOrigDataType: 'string', columnReturnDataType: 'string', columnIsNullable: false,displayOrder:2
  },
  {
    columnDisplayName: 'colorname', columnOrigDataType: 'string', columnReturnDataType: 'string', columnIsNullable: false,displayOrder:3
  }, {
    columnDisplayName: 'widthname', columnOrigDataType: 'string', columnReturnDataType: 'number', columnIsNullable: false,displayOrder:4
  },
  {
    columnDisplayName: 'length', columnOrigDataType: 'string', columnReturnDataType: 'number', columnIsNullable: false,displayOrder:5
  },
  {
    columnDisplayName: 'weight', columnOrigDataType: 'string', columnReturnDataType: 'number', columnIsNullable: false,displayOrder:6
  }, {
    columnDisplayName: 'fullname', columnOrigDataType: 'string', columnReturnDataType: 'string', columnIsNullable: false,displayOrder:7
  },
  {
    columnDisplayName: 'cratedDate', columnOrigDataType: 'string', columnReturnDataType: 'date', columnIsNullable: false, displayOrder:8
  },
  {
    columnDisplayName: 'comment', columnOrigDataType: 'string', columnReturnDataType: 'string', columnIsNullable: true, displayOrder:9
  }
];

export function convertDataType(extruderModelList:ExtruderModel[]): ExtruderDetail[]{
  const result: ExtruderDetail[] = [];
  for(const item of extruderModelList){
    result.push(item.extruderDetail);
  } 
  return result;
}