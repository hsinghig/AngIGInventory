import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ExtruderDownloadModel } from 'src/app/shared/model/extruder.model';
import { ExtruderSummary } from 'src/app/shared/model/extruderInsertModel';
import { DownloadService } from 'src/app/shared/service/downloadService';
import { ExtruderService } from 'src/app/shared/service/extruderService';
import { ExtruderHomeService } from 'src/app/shared/service/extruderhome.service';
import { SharedNavService } from 'src/app/shared/service/sharedNavService';

@Component({
  selector: 'app-extruder-summary',
  templateUrl: './extruder-summary.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  styleUrl: './extruder-summary.component.scss'
})
export class ExtruderSummaryComponent implements OnInit {
  
  headerColor = '#84A98C';
  colorList = ['#84A98C', '#3C4A3F', '#9EAFA2', '#6CABA8'];
  columnsToDisplay: string[] = ['extruderColorName','widthName', 'totalLength', 'totalWeight'];
  dataSource: any[] = [];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: ExtruderSummary | null | undefined;
  

  constructor(private extruderService: ExtruderService, 
    private sharedNavService: SharedNavService, private downloadService:DownloadService,
     private router: Router, private activatedRoute: ActivatedRoute, 
    private extruderHomeService: ExtruderHomeService ) {  
    this.activatedRoute.url.subscribe(activeUrl =>{
      this.sharedNavService.raiseDataEmitterEvent(window.location.pathname);
    });
    this.extruderService.getExtruderSummary().subscribe(data => {     
      this.dataSource = data;
    });
  }

  ngOnInit(){
   
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
    console.log('in button click of add /extruder/add');
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

