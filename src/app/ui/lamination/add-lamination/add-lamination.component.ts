import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { CrossplyRollNumberSelectDialogComponent } from 'src/app/core/crossply-roll-number-select-dialog/crossply-roll-number-select-dialog.component';
import { RollNumberSelectDialogComponent } from 'src/app/core/roll-number-select-dialog/roll-number-select-dialog.component';
import { SaveDialogComponent } from 'src/app/core/savedialog/savedialog.component';
import { laminationDetailInsertModel, laminationInsertModel } from 'src/app/shared/model/lamination.model';
import { RollNumberFormValuesModel } from 'src/app/shared/model/rollNumber.model';
import { UserModel } from 'src/app/shared/model/userModel';
import { CrossplyService } from 'src/app/shared/service/crossplyService';
import { ExtruderService } from 'src/app/shared/service/extruderService';
import { InventoryCommonService } from 'src/app/shared/service/inventoryCommonService';
import { LaminationService } from 'src/app/shared/service/laminationService';
import { SharedNavService } from 'src/app/shared/service/sharedNavService';
@Component({
  selector: 'app-add-lamination',
  templateUrl: './add-lamination.component.html',
  styleUrl: './add-lamination.component.scss'
})
export class AddLaminationComponent implements OnInit, OnDestroy {
  formHasErrors: boolean = false;
  errorList: string[] = [];

  locationSubscription: Subscription | undefined;
  colorSubscription: Subscription | undefined;
  widthSubscription: Subscription | undefined;
  userSubscription: Subscription | undefined;
  extruderColorSubscription: Subscription | undefined;
  crossplyColorSubscription: Subscription | undefined;
  getExtruderRollNumberSubscription: Subscription | undefined;

  laminationLocationList: any[] = [];
  extruderColorList: any[] = [];
  widthList: any[] = [];
  // NOTE LAMINATION COLOR LIST IS SAME AS CROSSPLY COLOR LIST
  crossplyColorList: any[] = [];
  crossplyLocationList: any[] = [];
  laminationColorList: any[] = [];
  userList: UserModel[] = [];

  public addLaminationFormGroup = this.fb.group({
    laminationLocationId: new FormControl('', [Validators.required]),
    laminationReferenceNumber: new FormControl('', [Validators.required]),
    laminationColorId: new FormControl('', [Validators.required]),
    laminationLength: new FormControl('', [Validators.required]),
    laminationWeight: new FormControl('', [Validators.required]),
    laminationSubmittedBy: new FormControl('', [Validators.required]),
    laminationComment: new FormControl(''),
    extruderList: new FormArray([
    ]),
    crossplyList: new FormArray([])
  });



 
  constructor(private sharedNavService: SharedNavService, private fb: FormBuilder,
    private extruderService: ExtruderService,
    private inventoryCommonService: InventoryCommonService,
    private laminationService: LaminationService,
    private crossplyService: CrossplyService,   
    private activatedRoute: ActivatedRoute, 
    private router: Router, 
    public dialog:MatDialog) {
    this.activatedRoute.url.subscribe(activeUrl => {
      this.sharedNavService.raiseDataEmitterEvent(window.location.pathname);
    });
  }
  

  ngOnInit(): void {
    this.loadDropdowns();
    this.formValueChangeListeners();
  }

  formValueChangeListeners(){   
    this.addLaminationFormGroup.controls['laminationLocationId'].valueChanges.pipe(
      debounceTime(100),
      distinctUntilChanged()
    ).subscribe(data => {
      this.resetValues();
    });
    this.addLaminationFormGroup.controls['laminationReferenceNumber'].valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(data => {
      this.resetValues();
    });
    this.addLaminationFormGroup.controls['laminationColorId'].valueChanges.pipe(
      debounceTime(100),
      distinctUntilChanged()
    ).subscribe(data => {
      this.resetValues();
    });
  }

  resetValues(){
    for(let i =0; i<this.extruderList.length; i++){
      this.addLaminationFormGroup.get(['extruderList', i])?.patchValue({
        extruderRollNumber:null
      });    
    }

    for(let i =0; i<this.crossplyList.length; i++){
      this.addLaminationFormGroup.get(['crossplyList', i])?.patchValue({
        crossplyRollNumber:null
      });    
    }
  }

  getExtruderFormGroup(){
    const extruderFormGroup = this.fb.group({
      extruderColorId: new FormControl("", [Validators.required]),
      extruderWidthId: new FormControl("", [Validators.required]),
      extruderRollNumber: new FormControl('', [Validators.required]),
      extruderLength: new FormControl('', [Validators.required]),
      extruderWeight: new FormControl('', [Validators.required])
    });
    return extruderFormGroup;
  }

  getCrossplyFormGroup(){
    const crossplyFormGroup = this.fb.group({
      crossplyColorId: new FormControl("", [Validators.required]),
      crossplyWidthId: new FormControl("", [Validators.required]),
      crossplyRollNumber: new FormControl('', [Validators.required]),
      crossplyLength: new FormControl('', [Validators.required]),
      crossplyWeight: new FormControl('', [Validators.required])
    });
    return crossplyFormGroup;
  }

  get extruderList() {
    return this.addLaminationFormGroup.get('extruderList') as FormArray;   //(<FormArray>this.addLaminationFormGroup.get('extruderList')).controls;
  }

  get crossplyList() {
    return this.addLaminationFormGroup.get('crossplyList') as FormArray;
  }

  fetchExtruderRollNumber(index: number) {    
    let formValues:RollNumberFormValuesModel = this.getFormValues('extruder', index);
    this.setRollNumberExtruder(formValues, 'extruder');   
  }

  fetchCrossplyRollNumber(index: number) {   
    let formValues:RollNumberFormValuesModel = this.getFormValues('crossply', index);
    this.setRollNumberCrossply(formValues, 'crossply');    
  }

  
  setRollNumberExtruder(formValues: RollNumberFormValuesModel, controlName: string){
    if (controlName == 'extruder'){
      this.getExtruderRollNumberSubscription = this.crossplyService.getExtruderRollNumber(
        formValues.colorId, formValues.widthId
     ).subscribe(data => {
      const hasData: boolean = data.length > 0? true: false;       
      const dialogRef = this.dialog.open(RollNumberSelectDialogComponent, 
          {
            data: {
              colorId: formValues.colorId,
              widthId: formValues.widthId,
              hasData: hasData,
              colorname: formValues.colorName,
              widthname: formValues.widthValue.toString()
            }
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result.data !=null){
              if (controlName == 'extruder'){                           
                this.addLaminationFormGroup.get(['extruderList', formValues.indexFetched])?.patchValue({
                  extruderRollNumber: result.data.id
                });             
              }             
            }
          });  
     });
    }
  }

  
  setRollNumberCrossply(formValues: RollNumberFormValuesModel, controlName: string){
    if (controlName == 'crossply'){
      this.getExtruderRollNumberSubscription = this.crossplyService.getExtruderRollNumber(
        formValues.colorId, formValues.widthId
     ).subscribe(data => {
      const hasData: boolean = data.length > 0? true: false;       
      const dialogRef = this.dialog.open(CrossplyRollNumberSelectDialogComponent, 
          {
            data: {
              colorId: formValues.colorId,
              widthId: formValues.widthId,
              hasData: hasData,
              colorname: formValues.colorName,
              widthname: formValues.widthValue.toString()
            }
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result.data !=null){
              if (controlName == 'crossply'){                           
                this.addLaminationFormGroup.get(['crossplyList', formValues.indexFetched])?.patchValue({
                  crossplyRollNumber: result.data.id
                });             
              }             
            }
          });  
     });
    }
  }


  clearForm() {
    this.formHasErrors = false;
    this.errorList = [];
    this.addLaminationFormGroup.reset();
  }

  //#region "private methods"
  getFormValues(colorType: string, index:number): RollNumberFormValuesModel{
    let colorId, widthId, widthValue = 0;
    let colorName: string = '';   
    switch(colorType){
      case 'extruder':
        var formValues = this.addLaminationFormGroup.get(['extruderList', index])?.value;
        colorId = formValues?.extruderColorId;
        colorName = this.getExtruderColorName(colorId);
        widthId = formValues?.extruderWidthId;
        widthValue = this.getWidthNameById(widthId);
        break;
      case 'crossply':
        var formValues = this.addLaminationFormGroup.get(['crossplyList', index])?.value;
        colorId = formValues?.crossplyColorId;
        colorName = this.getCrossplyColorName(colorId);
        widthId = formValues?.crossplyWidthId;
        widthValue = this.getWidthNameById(widthId);
        break;
    }
    var returnType:RollNumberFormValuesModel ={
      colorId: colorId, widthId: widthId, colorName: colorName, widthValue: widthValue, indexFetched: index
    };
    return returnType;
  }

  getExtruderColorName(colorId: number) {
    return this.extruderColorList.find(x => x.id == colorId)?.name ?? "";
  }

  getWidthNameById(widthId: number) {
    let widthName = this.widthList.find(x => x.id == widthId)?.name;
    if (widthName){
      return +widthName;
    }
    return 0;
  }
  getCrossplyColorName(colorId:number){
    return this.crossplyColorList.find(x=>x.id == colorId)?.name?? "";
  }

  resetErrors(){
    this.formHasErrors = false;
    this.errorList = [];
  }
  //#endregion "private methods"

  //#region "Add Button Actions"

  addExtruder() {
    if (this.extruderList.length < 3) {
      this.extruderList.push(this.getExtruderFormGroup());
    }
  }

  addCrossply() {
    if (this.crossplyList.length < 12) {
      this.crossplyList.push(this.getCrossplyFormGroup());
    }
  }

  removeExtruder() {
    console.log('remove extruder', 0);
    this.extruderList.removeAt(this.extruderList.length -1);
  }

  removeCrossply() {
    console.log('remove crossply', 0);
    this.crossplyList.removeAt(this.crossplyList.length - 1);  
  }

  //#endregion "Add Button Actions"

  onSubmit() {
    this.resetErrors();
    var item:any = this.addLaminationFormGroup.getRawValue();
    console.log('form raw value', item);

    var detailExtruderList = this.mapExtruderTolaminationDetailInsertModel(item.extruderList);
    var detailCrossplyList = this.mapCrossplyTolaminationDetailInsertModel(item.crossplyList);
    var detailList:laminationDetailInsertModel[] = [...detailExtruderList, ...detailCrossplyList];

    var request:laminationInsertModel = {
      locationId: +item.laminationLocationId,
      colorId: +item.laminationColorId,
      referenceNumber: item.laminationReferenceNumber,
      length: +item.laminationLength,
      weight: +item.laminationWeight,
      comment: item.laminationComment,
      createdById: this.getUserId(),
      laminationDetailList: detailList
    };

    this.validateFormValues(request);
    if (this.formHasErrors == false){
      try{
        console.log('Form sent to service', request);
        this.laminationService.insertLamination(request).subscribe(data =>{
          this.launchDialog(false);
        });  
      }catch(error){
        this.launchDialog(true);
        this.formHasErrors =true;
        console.log('error happened', error);
      }        
    }
  }

  clearFormValues() {      
    this.formHasErrors = false;
    this.errorList = [];
    this.addLaminationFormGroup.reset();
  }

  validateFormValues(data:laminationInsertModel){
    this.errorList = [];
    if (data.locationId == null){
      this.errorList.push('Lamination Location field is required');
    }

    if (data.length <=0){
      this.errorList.push('Lamination Length should be greater than zero');
    }

    if (data.weight <=0){
      this.errorList.push('Lamination Weight should be greater than zero');
    }

    if (data.laminationDetailList.length == 0){
      this.errorList.push('Atleast one of Extruder Detail or Crossply Detail needs to be filled to submit for lamination');
    }

    if (data.laminationDetailList.length > 0){
      var extruderId = data.laminationDetailList.filter((x:laminationDetailInsertModel) => x.isExtruder == true).map((x:laminationDetailInsertModel) =>x.rollNumberId);
      var crossplies = data.laminationDetailList.filter((x:laminationDetailInsertModel) => x.isCrossply == true).map((x:laminationDetailInsertModel) => x.rollNumberId);
      console.log(extruderId, crossplies);
      const uniqueExtruderId = new Set(extruderId);
      const uniqueCrossply = new Set(crossplies);
      var extruderIdLength = data.laminationDetailList.filter((x:laminationDetailInsertModel) => x.isExtruder == true).length;
      var crossplyIdLength = data.laminationDetailList.filter((x:laminationDetailInsertModel) => x.isCrossply == true).length;
      if (uniqueExtruderId.size < extruderIdLength){
        this.errorList.push('Extruder Detail contains duplicate Roll Number, Each Extruder Detail should have a different Roll Number');
      }
      if (uniqueCrossply.size < crossplyIdLength){
        this.errorList.push('Crossply Detail contains duplicate Roll Number, Each Crossply Detail should have a different Roll Number');
      }
    }

    if (data.laminationDetailList.length > 0){
      for(let i=0; i<data.laminationDetailList.length ; i++){
        if (data.laminationDetailList[i].length <=0){        
          this.errorList.push(`Detail  field ${i} Length value should be greater than zero`);
        }
        if (data.laminationDetailList[i].weight <=0){        
          this.errorList.push(`Detail  field ${i} Weight value should be greater than zero`);
        }
      }
    }
    if (this.errorList.length >0){
      this.formHasErrors = true;
    } else {
      this.formHasErrors = false;
    }
  }

  
  
  launchDialog(hasError: boolean) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      hasError: hasError,
      businessType: 'Lamination',
      extruderHomePage: '/lamination/home'
    };

    const dialogRef = this.dialog.open(SaveDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        switch (data) {
          case "goTohomePage":
            this.router.navigateByUrl('/lamination/home');
            break;
          case "addAnother":
            this.clearFormValues();
            break;
          case "close":
            break;
        }
        console.log("Dialog output:", data)
      }
    );
  }

  getUserId(){
    var createdBy = 1;
    //var createdBy = this.addCrossplyFormGroup.controls['userId'].value;
    var value = this.addLaminationFormGroup.controls['laminationSubmittedBy']?.value;
    if (value != null){
      createdBy =+value;
    }
    return createdBy;
  }
  mapExtruderTolaminationDetailInsertModel(extruderList:any[]){
    var createdBy = this.getUserId();   
    var detailList:laminationDetailInsertModel[] = [];
    extruderList.forEach(x => {
      var detail:laminationDetailInsertModel = {
        id: 0,
        laminationId: 0,
        isExtruder: true,
        isCrossply: false,
        rollNumberId: x.extruderRollNumber,
        length: x.extruderLength,
        weight: x.extruderWeight,
        colorId: x.extruderColorId,
        widthId: x.extruderWidthId,
        createdById: createdBy
      }
      detailList.push(detail);     
    });
    return detailList;
  }

  mapCrossplyTolaminationDetailInsertModel(crossplyList:any[]){
    var createdBy = this.getUserId();
   
    var detailList:laminationDetailInsertModel[] = [];
    crossplyList.forEach(x => {
      var detail:laminationDetailInsertModel = {
        id: 0,
        laminationId: 0,
        isExtruder: false,
        isCrossply: true,
        rollNumberId: x.crossplyRollNumber,
        length: x.crossplyLength,
        weight: x.crossplyWeight,
        colorId: x.crossplyColorId,
        widthId: x.crossplyWidthId,
        createdById: createdBy
      }
      detailList.push(detail);     
    });
    return detailList;

  }

  loadDropdowns(){
    this.extruderColorSubscription = this.extruderService.getExtruderColors().subscribe(x => {
      this.extruderColorList = x;
    });
    this.widthSubscription = this.inventoryCommonService.getWidths().subscribe(x => {
      this.widthList = x;
    });
    this.crossplyColorSubscription = this.crossplyService.getCrossplyColors().subscribe(x => {
      this.crossplyColorList = x;
      this.laminationColorList= x;
    });
    // this.locationSubscription = this.laminationService.getLaminationLocationList().subscribe(x => {
    //   this.laminationLocationList = x;
    // });
    this.userSubscription = this.inventoryCommonService.getAllUsers().subscribe(x =>{
      this.userList = x;
    });
  }

  ngOnDestroy(): void {
    this.extruderColorSubscription?.unsubscribe();
    this.widthSubscription?.unsubscribe();
    this.crossplyColorSubscription?.unsubscribe();
    //this.locationSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
  }

}
