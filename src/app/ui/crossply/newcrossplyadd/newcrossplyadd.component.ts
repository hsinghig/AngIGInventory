import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { RollNumberSelectDialogComponent } from 'src/app/core/roll-number-select-dialog/roll-number-select-dialog.component';
import { SaveDialogComponent } from 'src/app/core/savedialog/savedialog.component';
import { ColorModel } from 'src/app/shared/model/colorModel';
import { crossplyDetailInsertModel, crossplyInsertModel } from 'src/app/shared/model/crossply.model';
import { LocationModel } from 'src/app/shared/model/locationModel';
import { RollNumberFetchedModel, RollNumberFetchedList, RollNumberFormValuesModel } from 'src/app/shared/model/rollNumber.model';
import { UserModel } from 'src/app/shared/model/userModel';
import { WidthModel } from 'src/app/shared/model/widthModel';
import { CrossplyService } from 'src/app/shared/service/crossplyService';
import { ExtruderService } from 'src/app/shared/service/extruderService';
import { InventoryCommonService } from 'src/app/shared/service/inventoryCommonService';

@Component({
  selector: 'app-crossply-newcrossplyadd',
  templateUrl: './newcrossplyadd.component.html',
  styleUrl: './newcrossplyadd.component.scss'
})
export class NewcrossplyaddComponent implements OnInit, OnDestroy {
  formHasErrors = false;
  errorList: string[] = [ ];
  
  locationSubscription: Subscription | undefined;
  colorSubscription: Subscription | undefined;
  widthSubscription: Subscription | undefined;
  userSubscription: Subscription | undefined;
  extruderColorSubscription: Subscription | undefined;
  getExtruderRollNumberSubscription: Subscription | undefined;

  rollNumberColorZeroFetchedList = RollNumberFetchedList;


  crossplyLocationList: LocationModel[] = [];
  crossplyColorList: ColorModel[] = [];
  widthList: WidthModel[] = [];
  userList: UserModel[] = [];
  extruderColorList: ColorModel[] = [];

  public addCrossplyFormGroup = this.fb.group({
    locationId: new FormControl('', [Validators.required]),
    colorId: new FormControl('', [Validators.required]),
    widthId: new FormControl('', [Validators.required]),
    rollNumber: new FormControl('', [Validators.maxLength(10)]),
    length: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    weight: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    userId: new FormControl('', [Validators.required]),
    comment: new FormControl('', [Validators.maxLength(500)]),
    crossplyDetailList: new FormArray([this.createExtruderFormGroup()])
  });

  constructor(private fb: FormBuilder,
    private crossplyService: CrossplyService,
    private inventoryCommonService: InventoryCommonService,
    private extruderService: ExtruderService,
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadDropdowns();
    this.formValueChangeListeners();
  }

  formValueChangeListeners(){
    this.addCrossplyFormGroup.controls['colorId'].valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(data => {
      this.resetValues();
    });
    this.addCrossplyFormGroup.controls['widthId'].valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(data => {
      this.resetValues();
    });

   

  }

  resetValues(){
    for(let i =0; i<this.crossplyDetailList.length; i++){
      this.addCrossplyFormGroup.get(['crossplyDetailList', i])?.patchValue({
        colorZeroRollNumber:null,
        colorNinetyRollNumber:null
      });    
    }
  }
  get crossplyDetailList(): FormArray {
    return this.addCrossplyFormGroup.controls['crossplyDetailList'] as FormArray;
  }

  createExtruderFormGroup() {
    const addExtruderDetailGroup = this.fb.group({
      colorZeroColorId: new FormControl('', [Validators.required]),
      colorZeroWidthId: new FormControl('', [Validators.required]),
      colorZeroLength: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      colorZeroWeight: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      colorZeroRollNumber: new FormControl('', [Validators.required]),
      colorNinetyColorId: new FormControl('', [Validators.required]),
      colorNinetyWidthId: new FormControl('', [Validators.required]),
      colorNinetyLength: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      colorNinetyWeight: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      colorNinetyRollNumber: new FormControl('', [Validators.required])
    });
    return addExtruderDetailGroup;
  }
  resetErrors(){
    this.formHasErrors = false;
    this.errorList = [];
  }
  onSubmit() {
    this.resetErrors();
    var item:any= this.addCrossplyFormGroup.getRawValue();
    var insertModel:crossplyInsertModel = {
      locationId: +item.locationId,
      colorId: +item.colorId,
      widthId: +item.widthId,
      rollNumber: item.rollNumber,
      length: +item.length,
      weight: +item.weight,
      userId: +item.userId,
      comment: item.comment,
      crossplyDetailList: this.mapTocrossplyDetailInsertModel(item.crossplyDetailList)
    };

    this.validateForm(insertModel);
    if (this.formHasErrors == false){
      try{
        this.crossplyService.insertCrossply(insertModel).subscribe(data =>{
          this.launchDialog(false);
        });  
      }catch(error){
        this.launchDialog(true);
        this.formHasErrors =true;
        console.log('error happened', error);
      }        
    }
  }


  addExtruder() {
    if (this.crossplyDetailList.length < 3) {
      this.crossplyDetailList.push(this.createExtruderFormGroup())
    }
  }

  removeExtruder() {
    if (this.crossplyDetailList.length > 1) {
      this.crossplyDetailList.removeAt(this.crossplyDetailList.length-1);
    }
  }

  setRollNumberFetched(controlName: string) {
    for (let item of this.rollNumberColorZeroFetchedList) {
      if (item.controlName == controlName) {
        item.dataFetched = true;
        break;
      }
    }
    //console.log(this.rollNumberColorZeroFetchedList);
  }

  fetchRollNumberColorZero(index: number) {
    let formValues:RollNumberFormValuesModel = this.getFormValues('colorZero', index);
    this.setRollNumber(formValues, 'colorZero');
  }

  fetchRollNumberColorNinety(index: number) {
    let formValues:RollNumberFormValuesModel = this.getFormValues('colorNinety', index);
    this.setRollNumber(formValues, 'colorNinety');
  }

  setRollNumber(formValues: RollNumberFormValuesModel, controlName: string){
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
            if (controlName == 'colorZero'){
              controlName = 'colorZero' + formValues.indexFetched.toString();             
              this.addCrossplyFormGroup.get(['crossplyDetailList', formValues.indexFetched])?.patchValue({
                colorZeroRollNumber: result.data.id
              });
            } else {
              controlName = 'colorNinety' + formValues.indexFetched.toString();
              this.addCrossplyFormGroup.get(['crossplyDetailList', formValues.indexFetched])?.patchValue({
                colorNinetyRollNumber:result.data.id
              });
            }
            var foundIndex = this.rollNumberColorZeroFetchedList.findIndex(x =>x.controlName == controlName);
            const item:RollNumberFetchedModel = {controlName: controlName, dataFetched: true };              
            this.rollNumberColorZeroFetchedList[foundIndex] = item;            
          }
        })
    });
  }

  getFormValues(colorType: string, index:number): RollNumberFormValuesModel{
    let colorId, widthId, widthValue = 0;
    let colorName: string = '';
    var formValues = this.addCrossplyFormGroup.get(['crossplyDetailList', index])?.value;
    switch(colorType){
      case 'colorZero':
        colorId = formValues?.colorZeroColorId;
        colorName = this.getExtruderColorName(colorId);
        widthId = formValues?.colorZeroWidthId;
        widthValue = this.getWidthNameById(widthId);
        break;
      case 'colorNinety':
        colorId = formValues?.colorNinetyColorId;
        colorName = this.getExtruderColorName(colorId);
        widthId = formValues?.colorNinetyWidthId;
        widthValue = this.getWidthNameById(widthId);
        break;
    }
    var returnType:RollNumberFormValuesModel ={
      colorId: colorId, widthId: widthId, colorName: colorName, widthValue: widthValue, indexFetched: index
    };
    return returnType;
  }

  validateForm(insertModel:crossplyInsertModel) {
    this.errorList = [];
    if (insertModel.colorId == null){
      this.errorList.push('Crossply ColorId cannot be null')
    }
    if (insertModel.rollNumber.length > 20){
      this.errorList.push('Crossply Rollnumber cannot exceed 20 characters length');
    }

    if (insertModel.length <= 0){
      this.errorList.push('Crossply Length should be greater than 0');
    }
    if(insertModel.weight <= 0){
      this.errorList.push('Crossply weight should be greater than 0');
    }

    insertModel.crossplyDetailList.forEach(x => {
      if (x.colorZeroRollNumber == x.colorNinetyRollNumber) {
        this.errorList.push('Extruder Detail Color Zero RollNumber cannot be the same as Color Ninety RollNumber');
      }

      if (x.colorZeroWidthId < insertModel.widthId) {
        this.errorList.push('Color Zero Width should be greater than or equal to Crossply Width');
      }

      if (x.colorZeroLength<=0){
        this.errorList.push('Extruder Detail Color Zero length should be greater than 0');
      }

      
      if (x.colorZeroWeight<=0){
        this.errorList.push('Extruder Detail Color Zero Weight should be greater than 0');
      }

      
      if (x.colorNinetyLength<=0){
        this.errorList.push('Extruder Detail Color Ninety length should be greater than 0');
      }

      
      if (x.colorNinetyLength<=0){
        this.errorList.push('Extruder Detail Color Ninety length should be greater than 0');
      }
    });

    if (this.errorList.length > 0) {
      this.formHasErrors = true;
    } else {
      this.formHasErrors = false;
    }
  
    //Extruder zero width should be greater than or equal to width of crossply.
    // same level colorzero and colorninety cannot select same roll number
    // Sum of length of extruder should not exceed the length of crossply by 100
  }

  mapTocrossplyDetailInsertModel(crossplyDetailList:any[]){
    var detailList:crossplyDetailInsertModel[] = [];
    
    var createdBy = this.addCrossplyFormGroup.controls['userId'].value;
    crossplyDetailList.forEach(x => {
      var detail:crossplyDetailInsertModel = {
        ...x, crossplyId: 0, createdBy: createdBy
      }
      detailList.push(detail);
      console.log('detail : ', detail, 'detail list : ', detailList);
    });    
    return detailList;
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
  
  clearFormValues() {      
    this.formHasErrors = false;
    this.errorList = [];
    this.addCrossplyFormGroup.reset();
  }

  loadDropdowns() {
    this.locationSubscription = this.crossplyService.getCrossplyLocations().subscribe(response => {
      this.crossplyLocationList = response;
    });

    this.colorSubscription = this.crossplyService.getCrossplyColors().subscribe(response => {
      this.crossplyColorList = response;
    });

    this.widthSubscription = this.inventoryCommonService.getWidths().subscribe(response => {
      this.widthList = response;
    });

    this.userSubscription = this.inventoryCommonService.getAllUsers().subscribe(response => {
      this.userList = response;
    });

    this.extruderColorSubscription = this.extruderService.getExtruderColors().subscribe(response => {
      this.extruderColorList = response;
    });
  }

  clearForm() {
    this.addCrossplyFormGroup.reset();
    this.addCrossplyFormGroup.markAsPristine();
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
  ngOnDestroy(): void {
    //('The subscription is destroyed');
    this.locationSubscription?.unsubscribe();
    this.colorSubscription?.unsubscribe();
    this.widthSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
    this.extruderColorSubscription?.unsubscribe();
    this.getExtruderRollNumberSubscription?.unsubscribe();
  }

}
