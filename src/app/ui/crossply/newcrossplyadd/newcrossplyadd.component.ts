import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { INCHES_TO_FEET_MULTIPLIER } from 'src/app/app.contants';
import { RollNumberSelectDialogComponent } from 'src/app/core/roll-number-select-dialog/roll-number-select-dialog.component';
import { SaveDialogComponent } from 'src/app/core/savedialog/savedialog.component';
import { ColorModel } from 'src/app/shared/model/colorModel';
import { crossplyDetailInsertModel, crossplyInsertModel } from 'src/app/shared/model/crossply.model';
import { RollNumberFormValuesModel } from 'src/app/shared/model/rollNumber.model';
import { UserModel } from 'src/app/shared/model/userModel';
import { WidthModel } from 'src/app/shared/model/widthModel';
import { CrossplyService } from 'src/app/shared/service/crossplyService';
import { ExtruderService } from 'src/app/shared/service/extruderService';
import { InventoryCommonService } from 'src/app/shared/service/inventoryCommonService';
import { LaminationService } from 'src/app/shared/service/laminationService';
import { SharedNavService } from 'src/app/shared/service/sharedNavService';

@Component({
  selector: 'app-crossply-newcrossplyadd',
  templateUrl: './newcrossplyadd.component.html',
  styleUrl: './newcrossplyadd.component.scss'
})
export class NewcrossplyaddComponent implements OnInit, OnDestroy {
  
  formHasErrors: boolean = false;
  errorList: string[] = [];
  
  locationSubscription: Subscription | undefined;
  colorSubscription: Subscription | undefined;
  widthSubscription: Subscription | undefined;
  userSubscription: Subscription | undefined;
  extruderColorSubscription: Subscription | undefined;
  crossplyColorSubscription: Subscription | undefined;
  getExtruderRollNumberSubscription: Subscription | undefined;

  extruderColorList: ColorModel[] = [];
  widthList: WidthModel[] = [];
  // NOTE LAMINATION COLOR LIST IS SAME AS CROSSPLY COLOR LIST
  crossplyColorList: ColorModel[] = [];
  crossplyLocationList: any[] = [];
  laminationColorList: any[] = [];
  userList: UserModel[] = [];

  public addCrossplyFormGroup = this.fb.group({
    locationId: new FormControl('', [Validators.required]),    
    colorId: new FormControl('', [Validators.required]),
    widthId: new FormControl('', [Validators.required]),
    rollNumber: new FormControl(''),
    length: new FormControl('', [Validators.required]),
    weight: new FormControl(''),
    userId: new FormControl('', [Validators.required]),
    comment: new FormControl(''),
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
    if (this.extruderList.length == 0){
      this.extruderList.push(this.getExtruderFormGroup());
    }
    if (this.crossplyList.length == 0){
      this.crossplyList.push(this.getCrossplyFormGroup());
    }
  }

  formValueChangeListeners(){   
    this.addCrossplyFormGroup.controls['locationId'].valueChanges.pipe(
      debounceTime(100),
      distinctUntilChanged()
    ).subscribe(data => {
      this.resetValues();
    });
    this.addCrossplyFormGroup.controls['rollNumber'].valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(data => {
      this.resetValues();
    });
    this.addCrossplyFormGroup.controls['colorId'].valueChanges.pipe(
      debounceTime(100),
      distinctUntilChanged()
    ).subscribe(data => {
      this.resetValues();
    });
  }

  resetValues(){
    for(let i =0; i<this.extruderList.length; i++){
      this.addCrossplyFormGroup.get(['extruderList', i])?.patchValue({
        extruderRollNumber:null
      });    
    }

    for(let i =0; i<this.crossplyList.length; i++){
      this.addCrossplyFormGroup.get(['crossplyList', i])?.patchValue({
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
      extruderWeight: new FormControl('')
    });
    return extruderFormGroup;
  }

  getCrossplyFormGroup(){
    const crossplyFormGroup = this.fb.group({
      crossplyColorId: new FormControl("", [Validators.required]),
      crossplyWidthId: new FormControl("", [Validators.required]),
      crossplyRollNumber: new FormControl('', [Validators.required]),
      crossplyLength: new FormControl('', [Validators.required]),
      crossplyWeight: new FormControl('')
    });
    return crossplyFormGroup;
  }

  get extruderList() {
    return this.addCrossplyFormGroup.get('extruderList') as FormArray;   //(<FormArray>this.addCrossplyFormGroup.get('extruderList')).controls;
  }

  get crossplyList() {
    return this.addCrossplyFormGroup.get('crossplyList') as FormArray;
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
                this.addCrossplyFormGroup.get(['extruderList', formValues.indexFetched])?.patchValue({
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
              if (controlName == 'crossply'){                           
                this.addCrossplyFormGroup.get(['crossplyList', formValues.indexFetched])?.patchValue({
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
    this.addCrossplyFormGroup.reset();
  }

  //#region "private methods"
  getFormValues(colorType: string, index:number): RollNumberFormValuesModel{
    let colorId, widthId, widthValue = 0;
    let colorName: string = '';   
    switch(colorType){
      case 'extruder':
        var formValues = this.addCrossplyFormGroup.get(['extruderList', index])?.value;
        colorId = formValues?.extruderColorId;
        colorName = this.getExtruderColorName(colorId);
        widthId = formValues?.extruderWidthId;
        widthValue = this.getWidthNameById(widthId);
        break;
      case 'crossply':
        var formValues = this.addCrossplyFormGroup.get(['crossplyList', index])?.value;
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

  addColorZeroExtruder() {
    if (this.extruderList.length < 3) {
      this.extruderList.push(this.getExtruderFormGroup());
    }
  }

  addColorNinetyExtruder() {
    if (this.crossplyList.length < 3) {
      this.crossplyList.push(this.getCrossplyFormGroup());
    }
  }

  removeColorZeroExtruder() {   
    if (this.extruderList.length > 1){
    this.extruderList.removeAt(this.extruderList.length -1);
    }
  }

  removeColorNinetyExtruder() {   
    if (this.crossplyList.length > 1){
    this.crossplyList.removeAt(this.crossplyList.length - 1);  
    }
  }

  //#endregion "Add Button Actions"

  onSubmit() {
    this.resetErrors();
    var item:any = this.addCrossplyFormGroup.getRawValue();
    console.log('form raw value', item);

    var detailExtruderList = this.mapExtruderTocrossplyDetailInsertModel(item.extruderList);
    var detailCrossplyList = this.mapCrossplyTocrossplyDetailInsertModel(item.crossplyList);
    var detailList:crossplyDetailInsertModel[] = [...detailExtruderList, ...detailCrossplyList];

    if (item.weight == null || item.weight <=0){
      item.weight = this.calculateWeight(false, item.colorId, item.length, item.widthId);
    }

    var request:crossplyInsertModel = {   
      locationId: +item.locationId,
      colorId: +item.colorId,
      widthId: +item.widthId,
      rollNumber: item.rollNumber,
      length: +item.length,
      weight: +item.weight,
      userId: +item.userId,
      comment: item.comment,
      crossplyDetailList: detailList
    };

    this.validateFormValues(request);
    if (this.formHasErrors == false){
      try{
        console.log('Form sent to service', request);
        this.crossplyService.insertCrossply(request).subscribe(data =>{
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
    this.addCrossplyFormGroup.reset();
  }

  validateFormValues(data:crossplyInsertModel){
    console.log('Validation for crossply object : ', data);
    this.errorList = [];
    if (data.locationId == null){
      this.errorList.push('Crossply Location field is required');
    }

    if (data.length <=0){
      this.errorList.push('Crossply Length should be greater than zero');
    }

    if (data.weight <=0){
      this.errorList.push('Crossply Weight should be greater than zero');
    }

    if (data.crossplyDetailList.length == 0){
      this.errorList.push('Atleast one of Color #0 or Color #90 needs to be filled to submit for crossply');
    }

    if (data.crossplyDetailList.length > 0){
      var extruderIdList = data.crossplyDetailList.map((x:crossplyDetailInsertModel) =>x.extruderRollNumber);
      const uniqueExtruderIdList = new Set(extruderIdList);
     
      var extruderIdLength = data.crossplyDetailList.length; 

      if (uniqueExtruderIdList.size < extruderIdLength){
        this.errorList.push('Extruder Detail contains duplicate Roll Number, Each Extruder Detail should have a different Roll Number');
      }     
    }

    if (data.crossplyDetailList.length > 0){
      for(let i=0; i<data.crossplyDetailList.length ; i++){
        if (data.crossplyDetailList[i].extruderLength <=0){        
          this.errorList.push(`Detail  field ${i} Length value should be greater than zero`);
        }
        if (data.crossplyDetailList[i].extruderWeight <=0){        
          this.errorList.push(`Detail  field ${i} Weight value should be greater than zero`);
        }
      }
    }

    // value of color Zero width has to be equal or greater than the width of the color Ninety
    var ColorZeroWidthids = data.crossplyDetailList.filter((x:crossplyDetailInsertModel) => x.isColorZero == true).map(x => +x.extruderWidthId);
    var crossplyWidth:number = +data.widthId;
    for(let i of ColorZeroWidthids){
      if (i < crossplyWidth){
        this.errorList.push(`Color Zero Width Should be greater than or equal to Crossply Width`);
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
      businessType: 'Crossply',
      extruderHomePage: '/crossply/home'
    };

    const dialogRef = this.dialog.open(SaveDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        switch (data) {
          case "goTohomePage":
            this.router.navigateByUrl('/crossply/home');
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
    var value = this.addCrossplyFormGroup.controls['userId']?.value;
    if (value != null){
      createdBy =+value;
    }
    return createdBy;
  }

  getCreatedBy(createdById:number){
    var item = this.userList.find(x => x.id == createdById);
    return item?.displayName;
  }

  calculateWeight(isExtruder: boolean, colorId:string, length:number, widthId:string){
    var returnValue = 1;
    var color = this.getColorMultiplier(isExtruder, colorId);
    var width = this.widthList.find(x => x.id.toString() == widthId)?.name;
    var widthMultiplier = 1;
    if (width != null && color !=null){
      widthMultiplier = INCHES_TO_FEET_MULTIPLIER * +(width);
      console.log("extruder : ", isExtruder, " ,color : ", color, " ,length: ", length, " ,width: ", width, " , widthMultiplier: ", widthMultiplier);
      returnValue = Math.round(color * length * widthMultiplier);
      console.log("Calculated value : ", returnValue);      
    }
    return returnValue;
  }

  getColorMultiplier(isExtruder:boolean, colorId:string){
    var returnValue = 1;
    if (isExtruder){
      var color = this.extruderColorList.find(x => x.id.toString() == colorId && x.isExtuder == true)?.extruderWtMultiplier;
      if (color !=null){
        returnValue = color;
      }     
    }else {
      var color = this.extruderColorList.find(x => x.id.toString() == colorId && x.isCrossPly == true)?.crossplyWtMultiplier;
      if (color !=null){
        returnValue = color;
      }
    }
    return returnValue;
  }

  mapExtruderTocrossplyDetailInsertModel(extruderList:any[]){
    var createdUserId:number = this.getUserId();   
    var username:string = this.getCreatedBy(createdUserId) ?? "";
    var detailList:crossplyDetailInsertModel[] = [];
    var isColorZero: boolean = false;
    var isColorNinety:boolean = false;
    isColorZero = true;
    extruderList.forEach(x => {
      if (x.extruderWeight == null || x.extruderWeight <=0){
        x.extruderWeight = this.calculateWeight(true, x.extruderColorId, x.extruderLength, x.extruderWidthId);
      }
      var detail:crossplyDetailInsertModel = {
        id: 0,
        crossplyId:0,
        isColorZero: isColorZero,
        isColorNinety: isColorNinety,
        extruderColorId: x.extruderColorId,
        extruderWidthId: x.extruderWidthId,
        extruderLength: x.extruderLength,
        extruderWeight: x.extruderWeight,
        extruderRollNumber: x.extruderRollNumber,
        createdById: createdUserId,
        createdBy: username
      }
      detailList.push(detail);     
    });
    return detailList;
  }

  mapCrossplyTocrossplyDetailInsertModel(extruderList:any[]){
    var createdUserId:number = this.getUserId();   
    var username:string = this.getCreatedBy(createdUserId) ?? "";
    var detailList:crossplyDetailInsertModel[] = [];
    var isColorZero: boolean = false;
    var isColorNinety:boolean = false;
   
    isColorNinety = true;
    extruderList.forEach(x => {
      if (x.crossplyWeight == null || x.crossplyWeight <=0){
        x.crossplyWeight = this.calculateWeight(false, x.crossplyColorId, x.crossplyLength, x.crossplyWidthId);
      }

      var detail:crossplyDetailInsertModel = {
        id: 0,
        crossplyId:0,
        isColorZero: isColorZero,
        isColorNinety: isColorNinety,
        extruderColorId: x.crossplyColorId,
        extruderWidthId: x.crossplyWidthId,
        extruderLength: x.crossplyLength,
        extruderWeight: x.crossplyWeight,
        extruderRollNumber: x.crossplyRollNumber,
        createdById: createdUserId,
        createdBy: username
      }
      detailList.push(detail);     
    });
    return detailList;
  }

  loadDropdowns(){
    this.locationSubscription = this.crossplyService.getCrossplyLocations().subscribe(response => {
      this.crossplyLocationList = response;
    });
    this.extruderColorSubscription = this.extruderService.getExtruderColors().subscribe(x => {
      console.log('data for color : ', x);
      this.extruderColorList = x;
    });
    this.widthSubscription = this.inventoryCommonService.getWidths().subscribe(x => {
      this.widthList = x;
    });
    this.crossplyColorSubscription = this.crossplyService.getCrossplyColors().subscribe(x => {
      this.crossplyColorList = x;
      this.laminationColorList= x;
    });
   
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
