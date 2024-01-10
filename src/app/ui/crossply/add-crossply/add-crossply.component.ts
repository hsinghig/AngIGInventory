import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { debounce, debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { RollNumberSelectDialogComponent } from 'src/app/core/roll-number-select-dialog/roll-number-select-dialog.component';
import { ColorModel } from 'src/app/shared/model/colorModel';
import { ErrorMessageModel, crossplyInsertModel } from 'src/app/shared/model/crossplyInsertModel';
import { extruderRollNumberModel } from 'src/app/shared/model/extruderRollNumberModel';
import { LocationModel } from 'src/app/shared/model/locationModel';
import { UserModel } from 'src/app/shared/model/userModel';
import { WidthModel } from 'src/app/shared/model/widthModel';
import { CrossplyService } from 'src/app/shared/service/crossplyService';
import { ExtruderService } from 'src/app/shared/service/extruderService';
import { InventoryCommonService } from 'src/app/shared/service/inventoryCommonService';
import { SharedNavService } from 'src/app/shared/service/sharedNavService';

@Component({
  selector: 'app-add-crossply',
  templateUrl: './add-crossply.component.html',
  styleUrl: './add-crossply.component.scss'
})
export class AddCrossplyComponent implements OnInit {
  colorZeroValueFetched: boolean = false;
  colorNinetyValueFetched: boolean = false;
  errorMessageList: string[] = [];
  formContainsValidationError: boolean = false;
  errorMessageModel: ErrorMessageModel | undefined;
  addCrossplyFormGroup = this.formBuilder.group({
    crossplyLocationId: new FormControl(0, [Validators.required]),
    crossplyColorId: new FormControl(0, [Validators.required]),
    crossplyWidthId: new FormControl(0, [Validators.required]),
    crossplyRollNumber: new FormControl(''),
    crossplyLength: new FormControl(0),
    crossplyWeight: new FormControl(0),
    crossplyCreatedById: new FormControl(0, [Validators.required]),
    crossplyComment: new FormControl(''),
    colorZeroColorId: new FormControl(0, [Validators.required]),
    colorZeroWidthId: new FormControl(0, [Validators.required]),
    colorZeroRollNumber: new FormControl(0, [Validators.required]),
    colorNinetyColorId: new FormControl(0, [Validators.required]),
    colorNinetyWidthId: new FormControl(0, [Validators.required]),
    colorNinetyRollNumber: new FormControl(0, [Validators.required])
    
  })
  
  crossplyLocationList: LocationModel[] = [];
  crossplyColorList: ColorModel[] = [];
  widthList: WidthModel[] = [];
  userList: UserModel[] = [];
  extruderColorList: ColorModel[] = [];
  colorZeroRollNumberList: extruderRollNumberModel[] = [];
  colorNinetyRollNumberList: extruderRollNumberModel[] = [];
  insertCrossplyModel: crossplyInsertModel | undefined;

  @ViewChild(FormGroupDirective) private formDir!: FormGroupDirective;
  @ViewChild('colorZeroColor') colorZeroSelectColor:any;
  @ViewChild('colorZeroWidth') colorZeroSelectWidth:any;
  @ViewChild('colorNinetyColor') colorNinetySelectColor:any;
  @ViewChild('colorNinetyWidth') colorNinetySelectWidth:any;
  @ViewChild('crossplyWidth') crossplySelectWidth:any;

  constructor(private sharedNavService: SharedNavService, 
    private formBuilder:FormBuilder,
    private crossplyService: CrossplyService,
    private inventoryCommonService: InventoryCommonService,
    private extruderService: ExtruderService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute) {  
      console.log('In crossply add ');
    this.activatedRoute.url.subscribe(activeUrl =>{
      this.sharedNavService.raiseDataEmitterEvent(window.location.pathname);
    });
  }
  ngOnInit(): void {
    try{
      this.loadDropdowns();
      this.formValueChangeListeners();
    }catch(error){
      console.log('Error happened :', error);
    }
   
  }

  resetValues(){
    if (this.formContainsValidationError){
    this.formContainsValidationError = false;
    this.errorMessageList = [];
    }   
   this.resetColorZeroValues();
   this.resetColorNinetyValues();
  }

  resetColorZeroValues(){
    if(this.colorZeroValueFetched){
      this.colorZeroValueFetched = false;
      this.resetCtrlToNone('colorZeroRollNumber');
    }
  }

  resetColorNinetyValues(){
    if (this.colorNinetyValueFetched){
      this.colorNinetyValueFetched = false;
      this.resetCtrlToNone('colorNinetyRollNumber');
    }
  }

  formValueChangeListeners() {
    this.addCrossplyFormGroup.controls['crossplyLocationId'].valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      tap((val) => console.log('Value change : ', val))
    )
      .subscribe((data) => {
        this.resetValues();
      });
    
      this.addCrossplyFormGroup.controls['crossplyWidthId'].valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        tap((val) => console.log('Value change : ', val))
      )
        .subscribe((data) => {
         this.resetValues();
        });

        this.addCrossplyFormGroup.controls['crossplyColorId'].valueChanges.pipe(
          debounceTime(400),
          distinctUntilChanged(),
          tap((val) => console.log('Value change : ', val))
        )
          .subscribe((data) => {
          this.resetValues();
          });

          this.addCrossplyFormGroup.controls['colorZeroColorId'].valueChanges.pipe(
            debounceTime(400),
            distinctUntilChanged(),
            tap((val) => console.log('Value change : ', val))
          ).subscribe((data) =>{
            this.resetColorZeroValues();
          });

          this.addCrossplyFormGroup.controls['colorZeroWidthId'].valueChanges.pipe(
            debounceTime(400),
            distinctUntilChanged(),
            tap((val) => console.log('Value change : ', val))
          ).subscribe((data) =>{
            this.resetColorZeroValues();
          });

          this.addCrossplyFormGroup.controls['colorNinetyColorId'].valueChanges.pipe(
            debounceTime(400),
            distinctUntilChanged(),
            tap((val) => console.log('Value change : ', val))
          ).subscribe((data) =>{
            this.resetColorNinetyValues();
          });

          this.addCrossplyFormGroup.controls['colorNinetyWidthId'].valueChanges.pipe(
            debounceTime(400),
            distinctUntilChanged(),
            tap((val) => console.log('Value change : ', val))
          ).subscribe((data) =>{
            this.resetColorNinetyValues();
          });
  }

  //#region  "Methods"
  onSubmit(e:any) {
    console.log('Submitting here as well on submit', typeof(e));
    console.log(this.addCrossplyFormGroup.value);
    this.validateForm();          
  }

  resetFormValidationError(){
    if (this.formContainsValidationError){
      this.formContainsValidationError = false;
      this.errorMessageList = [];
      }
  }

  resetCtrlToNone(controlName:string){  
    this.addCrossplyFormGroup.get(controlName)?.patchValue(null); 
    
    this.addCrossplyFormGroup.controls['colorZeroRollNumber'].patchValue(null);  
  }
  resetColorNinetyRollNumber(){
    this.addCrossplyFormGroup.controls['colorNinetyRollNumber'].patchValue(null);
  }

  validateForm(){
    const errormsg:string[] = [];    
    const colorZeroWidth:string = this.colorZeroSelectWidth._elementRef.nativeElement.innerText; 
    const crossplyWidth:string = this.crossplySelectWidth._elementRef.nativeElement.innerText;
    if (+(colorZeroWidth) < +(crossplyWidth)) {
       errormsg.push('Color #0  width should be greater than or equal to Crossply Width')
     }

     const colorZeroRollNumber = this.addCrossplyFormGroup.controls['colorZeroRollNumber'].value;
     const colorNinetyRollNumber = this.addCrossplyFormGroup.controls['colorNinetyRollNumber'].value;
     if ((colorZeroRollNumber == null) || (colorNinetyRollNumber == null)){
        errormsg.push('Color #0 Selected Roll Number and Color #90 Selected Roll Number is required to submit the form');
     } else {
        if (colorZeroRollNumber == colorNinetyRollNumber){
       errormsg.push('Color #0 Selected Roll Number cannot be same as Color #90 Selected Roll Number');
     }
     }

    
    if (errormsg.length == 0)
    {
      this.formContainsValidationError = false;
      this.errorMessageList = [];
    } else {
      this.formContainsValidationError = true;
      this.errorMessageList = errormsg;              
    }
  }

  get crossplyColorIdControl(){
    return this.addCrossplyFormGroup.controls['crossplyColorId'];
  }

  fetchRollNumberColorZero(){
    this.resetFormValidationError();
    const colorId:number = this.addCrossplyFormGroup.controls['colorZeroColorId'].value ?? 0;
    const widthId:number = this.addCrossplyFormGroup.controls['colorZeroWidthId'].value ?? 0;
    const colorname:string = this.colorZeroSelectColor._elementRef.nativeElement.innerText; 
    const width:string = this.colorZeroSelectWidth._elementRef.nativeElement.innerText;
    this.setRollNumber(colorId, widthId, colorname, width, 'colorZeroRollNumber');   
  }

  fetchRollNumberColorNinety(){
    this.resetFormValidationError();
    const colorId:number = this.addCrossplyFormGroup.controls['colorNinetyColorId'].value ?? 0;
    const widthId:number = this.addCrossplyFormGroup.controls['colorNinetyWidthId'].value ?? 0;
    const colorname:string = this.colorNinetySelectColor._elementRef.nativeElement.innerText; 
    const width:string = this.colorNinetySelectWidth._elementRef.nativeElement.innerText;
    this.setRollNumber(colorId, widthId, colorname, width, 'colorNinetyRollNumber');    
  }

  setRollNumber(colorId: number, widthId:number, colorname: string, widthname:string, controlName:any){
    this.crossplyService.getExtruderRollNumber(colorId, widthId).subscribe(response => {      
        const hasData: boolean = response.length > 0? true: false;       
        const dialogRef = this.dialog.open(RollNumberSelectDialogComponent, {
          data: {colorId: colorId, widthId: widthId, hasData:hasData,  colorname: colorname, widthname: widthname},
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (result.data !=null){
           
            if (controlName == 'colorNinetyRollNumber'){
              this.colorNinetyValueFetched = true;
              this.addCrossplyFormGroup.controls['colorNinetyRollNumber'].patchValue(result.data.id);
            }
            if (controlName == 'colorZeroRollNumber'){
              this.colorZeroValueFetched = true;
              this.addCrossplyFormGroup.controls['colorZeroRollNumber'].patchValue(result.data.id);
            }                  
          }             
        });     
    });
  }

  onReset(data:any){
    console.log('clear form values', typeof(data));
    this.formContainsValidationError = false;
    this.errorMessageList = [];
    this.formDir.resetForm();
   // this.addCrossplyFormGroup.reset();
  }

  getErrorMessage(){
    if (this.addCrossplyFormGroup.controls['crossplyLocationId'].hasError('required')){
      return 'You must enter crossply location';
    }
    return this.addCrossplyFormGroup.controls['crossplyLocationId'].hasError('crossplyLocationId') ? 'Not a valid crossply Location': '';
  }
  //#endregion "Methods"

  loadDropdowns(){
    
    this.crossplyService.getCrossplyLocations().subscribe( response =>{
      this.crossplyLocationList = response;
    });

    this.crossplyService.getCrossplyColors().subscribe(response => {
      this.crossplyColorList = response;
    });

    this.inventoryCommonService.getWidths().subscribe(response => {
      this.widthList = response;
    });

    this.inventoryCommonService.getAllUsers().subscribe(response => {
      this.userList = response;
    });

    this.extruderService.getExtruderColors().subscribe(response => {
      this.extruderColorList = response;
    });
  
  }
}






// validateForm(){
//   const errormsg:string[] = [];
//   var item:any = this.addCrossplyFormGroup.value;
//   if ((item.crossplyLocationId == null) || (item.crossplyLocationId == 0)){
//     errormsg.push("Crossply Location is required")
//   }
//   if ((item.crossplyColorId == null) || (item.crossplyColorId == 0)){
//     errormsg.push("Crossply Color is required")
//   }
//   if ((item.crossplyWidthId == null) || (item.crossplyWidthId == 0)){
//     errormsg.push("Crossply Color is required")
//   }
//   if (item.crossplyLength == 0){
//     errormsg.push('Crossply Length should be greater than zero');
//   }
//   if ((item.colorZeroColorId == null) || (item.colorZeroColorId == 0)){
//     errormsg.push('Color #0 Color is required')
//   }
//   if ((item.colorZeroWidthId == null) || (item.colorZeroWidthId == 0)){
//     errormsg.push('Color #0 Width is required')
//   }
//   if ((item.colorZeroRollNumber == null) || (item.colorZeroRollNumber == 0)){
//     errormsg.push('Color #0 RollNumber is required')
//   }
//   if ((item.colorNinetyColorId == null) || (item.colorNinetyColorId == 0)){
//     errormsg.push('Color #90 Color is required')
//   }
//   if ((item.colorNinetyWidthId == null) || (item.colorNinetyWidthId == 0)){
//     errormsg.push('Color #90 Width is required')
//   }
//   if ((item.colorNinetyRollNumber == null) || (item.colorNinetyRollNumber == 0)){
//     errormsg.push('Color #90 RollNumber is required')
//   }
 
//   if (errormsg.length == 0)
//   {
//     this.formContainsValidationError = false;
//     this.errorMessageList = [];
//   } else {
//     this.formContainsValidationError = true;
//     this.errorMessageList = errormsg;              
//   }
// }