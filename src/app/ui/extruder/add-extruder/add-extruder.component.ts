import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
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
    length: new FormControl(0),
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
     InventoryCommonService, private extruderService: ExtruderService) {
    this.activatedRoute.url.subscribe(activeUrl => {
      this.sharedNavService.raiseDataEmitterEvent(window.location.pathname);
    });
  }

  ngOnInit(): void {
   
    this.loadDropdowns();   
  }

  clearFormValues() {
    this.showError = false;
    this.addExtruderFormGroup.reset();
  }

  checkFormValid(): ExtruderValidFormModel {
   
    var locationIdValue = this.addExtruderFormGroup.controls['locationId'].value;
    var colorIdValue = this.addExtruderFormGroup.controls['colorId'].value;
    var widthIdValue = this.addExtruderFormGroup.controls['widthId'].value;
    var createdByIdValue = this.addExtruderFormGroup.controls['createdById'].value;
    var weightValue = this.addExtruderFormGroup.controls['weight'].value;
    var lengthValue = this.addExtruderFormGroup.controls['length'].value;
    var rollNumberValue = this.addExtruderFormGroup.controls['rollNumber'].value;
    var commentValue = this.addExtruderFormGroup.controls['comment'].value;

    var item: ExtruderInsertModel = {
      locationId: locationIdValue == null ? 0: locationIdValue,        
      colorId: colorIdValue == null ? 0: colorIdValue,       
      widthId: widthIdValue == null ? 0 : widthIdValue,
      userId: createdByIdValue == null ? 0 : createdByIdValue,
      weight: weightValue == null ? 0: weightValue,     
      length:  lengthValue == null ? 0: lengthValue,        
      comment: commentValue == null ? '': commentValue,
      rollNumber: rollNumberValue == null ? '': rollNumberValue 
    };  

    var insertModel: ExtruderValidFormModel = {
      extruderInsertModel: item,
      isValidForm: false
    }
    if ((locationIdValue == 0) ||(colorIdValue == 0) || (widthIdValue == 0) || (createdByIdValue == 0)){
      insertModel.isValidForm = false;
    } else {
      insertModel.isValidForm = true;
    }
    return insertModel;  
  }

  displaySnackBar(message:string, state:string){
    this._snackBar.open(message, state, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 7000,
    });
  }
  onSubmit() {
    this.showError = false;
    var data = this.checkFormValid();
    if (data.isValidForm) {
      try {
        this.extruderService.insertExtruder(data.extruderInsertModel).subscribe(x => {
          console.log('return from server ', x);
          this.displaySnackBar('Extruder Data Saved', 'SUCCESS');          
          this.router.navigate(['/extruder']);          
        });
      }
      catch(error){
        this.displaySnackBar('Error happened', 'FAILURE');
        this.errorMessageFirstLine = 'Server Error While Saving Data';
        this.errorMessageSecondLine = 'Try again later!!';
        this.showError = true;  
        console.log('error happened', error);      
      }
    } else {
      this.showError=true;
    }
  }

  changeLocation(e: any) {
    console.log(e.target.value);
  }
  loadDropdowns(){
    this.extruderService.getExtruderColors().subscribe(response => {
      this.colorList = response;
    });

    this.extruderService.getExtruderLocations().subscribe(response => {
      console.log('Data coming from locations', response);
      this.locationList = response;
    });

    this.inventoryCommonService.getWidths().subscribe(response => {
      this.widthList = response;
    })

    this.inventoryCommonService.getAllUsers().subscribe(response => {
      this.userList = response;
    });
  }

  get locationId(){
    return this.addExtruderFormGroup.controls['locationId'];
  }
}
