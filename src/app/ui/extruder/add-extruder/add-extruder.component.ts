import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ColorModel } from 'src/app/shared/model/colorModel';
import { ExtruderInsertModel } from 'src/app/shared/model/extruderInsertModel';
import {LocationModel} from 'src/app/shared/model/locationModel';
import { UserModel } from 'src/app/shared/model/userModel';
import { WidthModel } from 'src/app/shared/model/widthModel';
import { SharedNavService } from 'src/app/shared/service/sharedNavService';


@Component({
  selector: 'app-add-extruder',
  templateUrl: './add-extruder.component.html',
  styleUrl: './add-extruder.component.scss'
})
export class AddExtruderComponent implements OnInit {
  addExtruderFormGroup: FormGroup;
  locationList: LocationModel[] = [];
  colorList:ColorModel[] = [];
  widthList:WidthModel[]=[];
  userList: UserModel[]= [];
  

  constructor(private sharedNavService: SharedNavService, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {  
    this.activatedRoute.url.subscribe(activeUrl =>{
      this.sharedNavService.raiseDataEmitterEvent(window.location.pathname);
    });
    this.addExtruderFormGroup = this.formBuilder.group({
      locationId: 0,
      name: '',
      colorId: 0,
      colorname: '',
      widthId: 0,
      widthname: '',
      length: 0,
      weight: 0,
      createdById: 0,
      firstname: '',
      lastname: '',
      fullname: '',
      email: '',
      createdDate: new Date(),
      modifiedDate: new Date(),
      rollNumber:'',
      comment:''
    });
  }

  ngOnInit(): void {
    this.locationList = this.getLocationList();   
    this.colorList = this.getColorList();
    this.widthList = this.getWidthList();
    this.userList = this.getUserList();

  }

  clearFormValues(){

  }

  onSubmit() {     
      var item: ExtruderInsertModel ={
        locationId: this.addExtruderFormGroup.value.locationId, 
        name: this.locationList.filter(item => item.id== this.addExtruderFormGroup.value.locationId)[0].locationName,
        colorId: this.addExtruderFormGroup.value.colorId,
        colorname: this.colorList.filter(item => item.id == this.addExtruderFormGroup.value.colorId)[0].colorName,
        widthId: this.addExtruderFormGroup.value.widthId,
        widthname: this.widthList.filter(item => item.id == this.addExtruderFormGroup.value.widthId)[0].widthName,
        length: this.addExtruderFormGroup.value.length,
        createdById: this.addExtruderFormGroup.value.createdById,
        firstname: this.userList.filter(x => x.id == this.addExtruderFormGroup.value.createdById)[0].firstName,
        lastname:this.userList.filter(x => x.id == this.addExtruderFormGroup.value.createdById)[0].lastName,
        fullname: this.userList.filter(x => x.id == this.addExtruderFormGroup.value.createdById)[0].firstName,
        email: this.userList.filter(x => x.id == this.addExtruderFormGroup.value.createdById)[0].email,
        createdDate: new Date(),
        modifiedDate: new Date(),
        rollNumber: this.addExtruderFormGroup.value.rollNumber,
        weight: this.addExtruderFormGroup.value.weight,
        comment: this.addExtruderFormGroup.value.comment
      };     
    console.log(item);
  }

  changeLocation(e:any) {
    console.log(e.target.value);
  }

  getLocationList(): LocationModel[]{
    return [
        {
          'id': 1, 'locationName': 'EXT A'
        },
        {
          'id': 2, 'locationName': 'EXT B'
        }
    ];
  }
  getColorList(): ColorModel[]{
    return [
        {
          'id': 1, 'colorName': 'Blue', 'isExtuder': true, 'isCrossPly': true, 'isActive': true, 'comment': 'Blue Color'
        },
        {
          'id': 2, 'colorName': 'Black', 'isExtuder': true, 'isCrossPly': true, 'isActive': true, 'comment': 'Blue Color'
        }
    ];
  }
  getWidthList(): WidthModel[]{
    return [
        {
          'id': 1, 'widthName': '83'
        },
        {
          'id': 2, 'widthName': '89'
        }
    ];
  }

  getUserList(): UserModel[]{
    return [
      {
        'id': 1, 'firstName': 'Hemant', 'lastName': 'Singh', 'displayName': 'Hemant Singh', 'email': 'singh.hemant@gmail.com', 'isActive': true
      },
      {
        'id': 2, 'firstName': 'Hemant2', 'lastName': 'Singh2', 'displayName': 'Hemant2 Singh2', 'email': 'singh2.hemant2@gmail.com', 'isActive': true
      }
    ]
  }
}
