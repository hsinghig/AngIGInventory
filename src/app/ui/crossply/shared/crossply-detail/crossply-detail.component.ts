import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { crossplySummaryModel } from 'src/app/shared/model/crossply.model';
import { CrossplyService } from 'src/app/shared/service/crossplyService';

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
  headerColor = '#84A98C';
  colorList = ['#84A98C', '#3C4A3F', '#9EAFA2', '#6CABA8'];
   columnsToDisplay: string[] = 
  ['crossplyId', 'crossplyLocation', 
  'crossplyColor', 'crossplyWidth', 
 'crossplyLength', 'crossplyWeight', 
  'crossplyCreatedDate'];
  
  dataSource: any[] = [];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: crossplySummaryModel | null | undefined;
  
  constructor(private crossplyService: CrossplyService, 
    private router: Router){}

  ngOnInit(): void {
    this.crossplyService.getCrossplySummaryData().subscribe(x => {
      console.log('Data Fetched :', x);
      this.dataSource = x;
    })
  }

  takeMeToAdd(){
    console.log('in button click of add /crossply/add');
    this.router.navigateByUrl('/crossply/add');
  }

  changeColor(){
    const colorRandomIndex = this.baseRandom(0, this.colorList.length-1);
    this.headerColor = this.colorList[colorRandomIndex];
  }

  baseRandom(lower:number, upper:number) {
    return lower + Math.floor(Math.random() * (upper - lower + 1));
  }

}
