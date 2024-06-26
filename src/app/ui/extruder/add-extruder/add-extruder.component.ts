import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { INCHES_TO_FEET_MULTIPLIER } from 'src/app/app.contants';
import { SaveDialogComponent } from 'src/app/core/savedialog/savedialog.component';
import { ColorModel } from 'src/app/shared/model/colorModel';
import { ExtruderInsertModel, ExtruderValidFormModel } from 'src/app/shared/model/extruderInsertModel';
import { LocationModel } from 'src/app/shared/model/locationModel';
import { UserModel } from 'src/app/shared/model/userModel';
import { WidthModel } from 'src/app/shared/model/widthModel';
import { ExtruderService } from 'src/app/shared/service/extruderService';
import { ExtruderHomeService } from 'src/app/shared/service/extruderhome.service';
import { InventoryCommonService } from 'src/app/shared/service/inventoryCommonService';
import { SharedNavService } from 'src/app/shared/service/sharedNavService';


@Component({
  selector: 'app-add-extruder',
  templateUrl: './add-extruder.component.html',
  styleUrl: './add-extruder.component.scss'
})
export class AddExtruderComponent implements OnInit {
  showError: boolean = false;
  showSuccess: boolean = false;
  showAddExtruder: boolean = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  errorMessageFirstLine: string = "The form is invalid!!";
  errorMessageSecondLine: string = "*Please ensure all the required fields are filled before the form is submitted.";

  addExtruderFormGroup = this.formBuilder.group({
    locationId: new FormControl(0, [Validators.required]),
    colorId: new FormControl(0, [Validators.required]),
    widthId: new FormControl(0, [Validators.required]),
    rollNumber: new FormControl(''),
    length: new FormControl(0, [Validators.required]),
    weight: new FormControl(0),
    createdById: new FormControl(0, [Validators.required]),
    comment: new FormControl('')
  })


  locationList: LocationModel[] = [];
  colorList: ColorModel[] = [];
  widthList: WidthModel[] = [];
  userList: UserModel[] = [];


  constructor(private sharedNavService: SharedNavService, private _snackBar: MatSnackBar, private router: Router,
    private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,
    private extruderHomeService: ExtruderHomeService, private inventoryCommonService:
      InventoryCommonService, private extruderService: ExtruderService,
    private dialog: MatDialog) {
    this.activatedRoute.url.subscribe(activeUrl => {
      this.sharedNavService.raiseDataEmitterEvent(window.location.pathname);
    });
  }

  ngOnInit(): void {
    this.loadDropdowns();
    this.formValueChangeListeners();
  }

  formValueChangeListeners(){
    this.addExtruderFormGroup.controls['colorId'].valueChanges.pipe().subscribe(
      data => {
        this.reCalculateWeight()
      }
    );
    this.addExtruderFormGroup.controls['widthId'].valueChanges.pipe().subscribe(
      data => {
        this.reCalculateWeight()
      }
    );

    this.addExtruderFormGroup.controls['length'].valueChanges.pipe().subscribe(
      data => {
        this.reCalculateWeight()
      }
    );

  }

  reCalculateWeight(){
    const colorIdValue = this.addExtruderFormGroup.controls['colorId'].value;
    const widthIdValue = this.addExtruderFormGroup.controls['widthId'].value;
    const lengthValue = this.addExtruderFormGroup.controls['length'].value;

    if (colorIdValue == null || widthIdValue == null || lengthValue == null){
      this.addExtruderFormGroup.controls['weight'].setValue(0);
    } else {
      var value = this.calculateWeight(String(colorIdValue), lengthValue, widthIdValue);
      this.addExtruderFormGroup.controls['weight'].setValue(value);
    }
  }

  clearFormValues() {      
    this.showError = false;
    this.addExtruderFormGroup.reset();
  }

  calculateWeight(colorId?:string, length?:number, widthId?:number){
    var returnValue = 1;
    if (colorId == null || length == null){
      return returnValue;
    }
    var color = this.getColorMultiplier(colorId);
    var width = this.widthList.find(x => x.id == widthId)?.name;
    var widthMultiplier = 1;
    if (width != null && color !=null){
      widthMultiplier = INCHES_TO_FEET_MULTIPLIER * +(width);
      console.log("extruder : ", true , " ,color : ", color, " ,length: ", length, " ,width: ", width, " , widthMultiplier: ", widthMultiplier);
      returnValue = Math.round(color * length * widthMultiplier);
      console.log("Calculated value : ", returnValue);      
    }
    return returnValue;
  }

  getColorMultiplier(colorId:string){
    var returnValue = 1;   
      var color = this.colorList.find(x => x.id.toString() == colorId && x.isExtuder == true)?.extruderWtMultiplier;
      if (color !=null){
        returnValue = color;
      } 
    return returnValue;
  }

  checkFormValid(): ExtruderValidFormModel {

    const locationIdValue = this.addExtruderFormGroup.controls['locationId'].value;
    const colorIdValue = this.addExtruderFormGroup.controls['colorId'].value;
    const widthIdValue = this.addExtruderFormGroup.controls['widthId'].value;
    const createdByIdValue = this.addExtruderFormGroup.controls['createdById'].value;
    var weightValue = this.addExtruderFormGroup.controls['weight'].value;
    const lengthValue = this.addExtruderFormGroup.controls['length'].value;
    const rollNumberValue = this.addExtruderFormGroup.controls['rollNumber'].value;
    const commentValue = this.addExtruderFormGroup.controls['comment'].value;

    
    if ((weightValue == null || weightValue <=0) && (lengthValue !=null) && (widthIdValue !=null)){
      weightValue = this.calculateWeight(colorIdValue?.toString(), lengthValue, widthIdValue);
    }

    const item: ExtruderInsertModel = {
      locationId: locationIdValue == null ? 0 : locationIdValue,
      colorId: colorIdValue == null ? 0 : colorIdValue,
      widthId: widthIdValue == null ? 0 : widthIdValue,
      userId: createdByIdValue == null ? 0 : createdByIdValue,
      weight: weightValue == null ? 0 : weightValue,
      length: lengthValue == null ? 0 : lengthValue,
      comment: commentValue == null ? '' : commentValue,
      rollNumber: rollNumberValue == null ? '' : rollNumberValue
    };

    const insertModel: ExtruderValidFormModel = {
      extruderInsertModel: item,
      isValidForm: false
    }
    if ((locationIdValue == 0) || (colorIdValue == 0) || (widthIdValue == 0) || (createdByIdValue == 0)) {
      insertModel.isValidForm = false;
    } else {
      insertModel.isValidForm = true;
    }
    return insertModel;
  }

  displaySnackBar(message: string, state: string) {
    this._snackBar.open(message, state, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 7000,
    });
  }
  onSubmit() {
    this.showError = false;
    const data = this.checkFormValid();
    if (data.isValidForm) {
      try {
        this.extruderService.insertExtruder(data.extruderInsertModel).subscribe(x => {
          this.launchDialog(false);
        });
      }
      catch (error) {
        this.launchDialog(true);
        this.showError = true;
        console.log('error happened', error);
      }
    } else {
      this.showError = true;
    }
  }

  launchDialog(hasError: boolean) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      hasError: hasError,
      businessType: 'Extruder',
      extruderHomePage: '/extruder/home'
    };

    const dialogRef = this.dialog.open(SaveDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        switch (data) {
          case "goTohomePage":
            this.router.navigateByUrl('/extruder/home'); // {relativeTo: this.activatedRoute.parent, skipLocationChange:false});
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

  changeLocation(e: any) {
    console.log(e.target.value);
  }
  loadDropdowns() {
    this.extruderService.getExtruderColors().subscribe(response => {
      this.colorList = response;
    });

    this.extruderService.getExtruderLocations().subscribe(response => {
      //console.log('Data coming from locations', response);
      this.locationList = response;
    });

    this.inventoryCommonService.getWidths().subscribe(response => {
      this.widthList = response;
    })

    this.inventoryCommonService.getAllUsers().subscribe(response => {
      this.userList = response;
    });
  }

  get locationId() {
    return this.addExtruderFormGroup.controls['locationId'];
  }
}
