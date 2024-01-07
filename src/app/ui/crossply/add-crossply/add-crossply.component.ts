import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ColorModel } from 'src/app/shared/model/colorModel';
import { LocationModel } from 'src/app/shared/model/locationModel';
import { UserModel } from 'src/app/shared/model/userModel';
import { WidthModel } from 'src/app/shared/model/widthModel';
import { ExtruderService } from 'src/app/shared/service/extruderService';
import { SharedNavService } from 'src/app/shared/service/sharedNavService';

@Component({
  selector: 'app-add-crossply',
  templateUrl: './add-crossply.component.html',
  styleUrl: './add-crossply.component.scss'
})
export class AddCrossplyComponent {

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
  
  locationList: LocationModel[] = [];
  crossplyColorList: ColorModel[] = [];
  widthList: WidthModel[] = [];
  userList: UserModel[] = [];
  extruderColorList: ColorModel[] = [];
  colorZeroRollNumberList: ColorModel[] = [];
  colorNinetyRollNumberList: ColorModel[] = [];



  constructor(private sharedNavService: SharedNavService, 
    private formBuilder:FormBuilder,
    private extruderService: ExtruderService,
    private activatedRoute: ActivatedRoute) {  
    this.activatedRoute.url.subscribe(activeUrl =>{
      this.sharedNavService.raiseDataEmitterEvent(window.location.pathname);
    });
  }

  onSubmit() {

  }

  get crossplyColorIdControl(){
    return this.addCrossplyFormGroup.controls['crossplyColorId'];
  }

  fetchRollNumberColorZero(){

  }

  fetchRollNumberColorNinety(){

  }

  clearFormValues(){

  }

  getErrorMessage(){
    if (this.addCrossplyFormGroup.controls['crossplyLocationId'].hasError('required')){
      return 'You must enter crossply location';
    }
    return this.addCrossplyFormGroup.controls['crossplyLocationId'].hasError('crossplyLocationId') ? 'Not a valid crossply Location': '';
  }
}
