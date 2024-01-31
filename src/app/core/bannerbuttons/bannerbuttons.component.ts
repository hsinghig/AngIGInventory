import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExtruderDownloadModel } from 'src/app/shared/model/extruder.model';
import { CrossplyService } from 'src/app/shared/service/crossplyService';
import { DownloadService } from 'src/app/shared/service/downloadService';
import { ExtruderService } from 'src/app/shared/service/extruderService';
import { LaminationService } from 'src/app/shared/service/laminationService';

@Component({
  selector: 'app-banner-buttons',
  templateUrl: './bannerbuttons.component.html',
  styleUrl: './bannerbuttons.component.scss'
})
export class BannerbuttonsComponent implements OnDestroy{
  colorList = ['#84A98C', '#9EAFA2', '#6CABA8'];
  @Input() headerText:string = '';
  @Input() headerTypePassed:string = '';
  @Input() showButtons:boolean = true;
  @Output() colorSelected = new EventEmitter<string>();
  @Output() buttonSelected = new EventEmitter<string>();

  subExtruder$: Subscription | undefined;
  subCrossply$: Subscription | undefined;
  subLamination$: Subscription | undefined;


  constructor(private router: Router,  private downloadService:DownloadService,
     private extruderService:ExtruderService, private crossplyService:CrossplyService,
    private laminationService:LaminationService){}

    changeView(data: MatButtonToggleChange){
      const passedValue = data.value;
      this.buttonSelected.emit(passedValue);      
    }

  takeMeToAdd(){
    switch(this.headerTypePassed){
      case 'extruder':
        this.router.navigateByUrl('/extruder/add');
        break;
      case 'crossply':
        this.router.navigateByUrl('/crossply/add');
        break;
      case 'lamination':
        this.router.navigateByUrl('/lamination/add')
        break;
    }
  }

  downloadFile(){
    switch(this.headerTypePassed){
      case 'extruder':
        this.downloadExtruderFile();
        break;
      case 'crossply':
        this.downloadCrossplyFile();
        break;
      case 'lamination':
        this.downloadLaminationFile();
        break;
    }
  }

  downloadExtruderFile(){
    this.subExtruder$ = this.extruderService.getExtruderData().subscribe(data => {
      var dataToPass:ExtruderDownloadModel[] = this.convertDataToExtruderDownloadModel(data);
      const headersToParse: string[] = ['extruderId', 'locationName', 'colorName', 'widthName', 
     'length', 'weight', 'rollNumber', 'createdDate', 'createdBy'];
      const headersToShow: string[] = ['Id', 'Location', 'Color', 'Width', 'Length', 'Weight', 'RollNumber', 'Created Date', 'Created By'];
    
      this.downloadService.downloadFile(dataToPass, 'extruderData', headersToShow, headersToParse);
    });
  }

  downloadCrossplyFile(){
    this.subCrossply$ = this.crossplyService.getCrossplyAllData$.subscribe(data => {
      data.forEach((x:any) => x.crossplyFullName = x.crossplyFirstName + " " + x.crossplyLastName);
    const headersToParse: string[] = ['crossplyId', 'crossplyLocation', 'crossplyColor', 'crossplyWidth', 
     'crossplyLength', 'crossplyWeight', 'crossplyRollNumber', 'crossplyCreatedDate', 'crossplyFullName'];
      const headersToShow: string[] = ['Id', 'Location', 'Color', 'Width', 'Length', 'Weight', 'RollNumber',
       'Created Date', 'Created By'];      
      this.downloadService.downloadFile(data, 'crossplyData', headersToShow, headersToParse);
    });
  }
  downloadLaminationFile(){
    this.subLamination$ = this.laminationService.getLaminationAllData().subscribe(data => {
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

  changeColor(){
    const colorRandomIndex = this.baseRandom(0, this.colorList.length-1);
    var colorSelected =  this.colorList[colorRandomIndex];
    this.colorSelected.emit(colorSelected);
  }

  baseRandom(lower:number, upper:number) {
    return lower + Math.floor(Math.random() * (upper - lower + 1));
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
    // console.log('print item list : ', itemList);
    return itemList;
  }

  ngOnDestroy(): void {
    this.subExtruder$?.unsubscribe();
    this.subCrossply$?.unsubscribe();
    this.subLamination$?.unsubscribe();
  }
}
