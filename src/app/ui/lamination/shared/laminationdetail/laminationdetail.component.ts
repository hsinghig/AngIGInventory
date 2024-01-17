import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
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
  @Input() headerColor = '#84A98C';
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
      this.dataSource = x;
    });
  } 
}
