import { Component } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { ActivatedRoute } from '@angular/router';
import { ExtruderSummary } from 'src/app/shared/model/extruderInsertModel';
import { ExtruderService } from 'src/app/shared/service/extruderService';
import { SharedNavService } from 'src/app/shared/service/sharedNavService';
@Component({
  selector: 'app-extruder-reports', 
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
  showHeaderColor:boolean = true;
  dataSource: any[] = [];
  dataList: ExtruderSummary[] = [];
  dataListSecond: ExtruderSummary[] = [];
  chosenColorName: string = 'black';
  chosenWidthName: string = '87';
  colorList = ['black', 'blue', 'green', 'purple', 'yellow'];
  widthList = ['87', '93', '99', '102', '105', '111', '117'];
  displayedColumns = ['widthName', 'totalLength', 'totalWeight'];
  displayedColumnsSecond = ['extruderColorName', 'totalLength', 'totalWeight'];
  constructor(private sharedNavService: SharedNavService, private activatedRoute: ActivatedRoute, 
      private extruderService: ExtruderService) {  
    this.activatedRoute.url.subscribe(activeUrl =>{
      this.sharedNavService.raiseDataEmitterEvent(window.location.pathname);
    });
    this.extruderService.getExtruderSummary().subscribe(data => {     
      this.dataSource = data;
      this.dataList = this.dataSource.filter(x => x.extruderColorName == this.chosenColorName);
      this.dataListSecond = this.dataSource.filter(x => x.widthName == this.chosenWidthName);
    });
  }

  resetFilterColor(){
    this.dataList = this.dataSource;
    this.chosenColorName= '';
    this.showHeaderColor = false;
  }

  resetFilterWidth(){
    this.dataListSecond = this.dataSource;
    this.chosenWidthName = '';
  }

  onToggleGroupChangeColor(data: MatButtonToggleChange) {
    this.showHeaderColor = true;
    this.chosenColorName = data.value;
    this.dataList = this.dataSource.filter(x => x.extruderColorName == data.value);
    console.log('color chosen', data.value, this.dataList.length, this.dataSource.length, this.dataSource);
  }

 
  onToggleGroupChangeWidth(data: MatButtonToggleChange) {
    this.chosenWidthName = data.value;
    this.dataListSecond = this.dataSource.filter(x => x.widthName == data.value);
  }
 
}

