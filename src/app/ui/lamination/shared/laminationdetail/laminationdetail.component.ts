import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { laminationSummaryModel } from 'src/app/shared/model/lamination.model';
import { DownloadService } from 'src/app/shared/service/downloadService';
import { LaminationService } from 'src/app/shared/service/laminationService';

@Component({
  selector: 'app-lamination-detail',
  templateUrl: './laminationdetail.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  styleUrl: './laminationdetail.component.scss'
})
export class LaminationdetailComponent implements OnInit{
  headerColor = '#84A98C';
  colorList = ['#84A98C', '#3C4A3F', '#9EAFA2', '#6CABA8'];
   columnsToDisplay: string[] = 
   ['laminationId', 'laminationLocationName',
   'laminationColorName', 'laminationLength',
   'laminationWeight', 'referenceNumber','laminationFullName',
    'laminationCreatedDate'];
  
  dataSource: any[] = [];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: laminationSummaryModel | null | undefined;

  constructor(private laminationService:LaminationService, 
    private downloadService: DownloadService,
    private router: Router){}

  ngOnInit(){
    this.laminationService.getLaminationSummaryData().subscribe(x => {
      x.forEach(data => {
        data.laminationFullName = data.lamination.laminationFirstName + ' ' + data.lamination.laminationLastName
      });
      console.log('Lamination Detail Data : ', x);
      this.dataSource = x;
    });
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
