import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { crossplySummaryModel } from 'src/app/shared/model/crossply.model';
import { CrossplyService } from 'src/app/shared/service/crossplyService';
import { DownloadService } from 'src/app/shared/service/downloadService';

@Component({
  selector: 'app-crossply-detail',
  templateUrl: './crossply-detail.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  styleUrl: './crossply-detail.component.scss'
})
export class CrossplyDetailComponent implements OnInit{
  @Input() headerColor = '#84A98C';
  
  columnsToDisplay: string[] = 
  ['crossplyId', 'crossplyLocation', 
  'crossplyColor', 'crossplyWidth', 
 'crossplyLength', 'crossplyWeight', 
  'crossplyCreatedDate'];
  
  dataSource: any[] = [];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: crossplySummaryModel | null | undefined;
  
  constructor(private crossplyService: CrossplyService, 
    private downloadService: DownloadService,
    private router: Router){}

  ngOnInit(): void {
    this.crossplyService.getCrossplySummaryData().subscribe(x => {    
      this.dataSource = x;
    })
  }
}
