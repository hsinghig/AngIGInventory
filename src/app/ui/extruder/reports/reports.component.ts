import { Component } from '@angular/core';
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
  dataSource: any[] = [];
  dataList: ExtruderSummary[] = [];
  dataListSecond: ExtruderSummary[] = [];
  chosenHeaderColor: string = 'black';
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
      this.dataList = this.dataSource.filter(x => x.extruderColorName == this.chosenHeaderColor);
      this.dataListSecond = this.dataSource.filter(x => x.widthName == this.chosenWidthName);
    });
  }

  buttonClick(colorSelected: string){
    this.chosenHeaderColor = colorSelected;
    this.dataList = this.dataSource.filter(x => x.extruderColorName == colorSelected);
    console.log('color chosen', colorSelected, this.dataList.length, this.dataSource.length, this.dataSource);
  }
  getDataForWidth(widthname: string) {
    this.chosenWidthName = widthname;
    this.dataListSecond = this.dataSource.filter(x => x.widthName == widthname);
  }
}
