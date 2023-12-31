import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ColorModel } from 'src/app/shared/model/colorModel';
import { ExtruderInsertModel } from 'src/app/shared/model/extruderInsertModel';
import {LocationModel} from 'src/app/shared/model/locationModel';
import { UserModel } from 'src/app/shared/model/userModel';
import { WidthModel } from 'src/app/shared/model/widthModel';
import { ExtruderService } from 'src/app/shared/service/extruderService';
import { ExtruderHomeService } from 'src/app/shared/service/extruderhome.service';
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
  

  constructor(private sharedNavService: SharedNavService, private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, 
    private extruderHomeService: ExtruderHomeService, private extruderService: ExtruderService) {  
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
    this.extruderService.getExtruderColors().subscribe(response => {      
       this.colorList = response;
    });

    this.extruderService.getExtruderLocations().subscribe(response => {
      console.log('Data coming from locations', response);
      this.locationList = response;
    });

    this.extruderService.getWidths().subscribe(response => {
      this.widthList = response;
    })

    this.extruderService.getAllUsers().subscribe(response => {
      this.userList = response; 
    });

    
  }

  clearFormValues(){

  }

  onSubmit() {     
      const item: ExtruderInsertModel ={
        locationId: this.addExtruderFormGroup.value.locationId,        
        colorId: this.addExtruderFormGroup.value.colorId,       
        widthId: this.addExtruderFormGroup.value.widthId,
        userId: this.addExtruderFormGroup.value.createdById,
        weight: this.addExtruderFormGroup.value.weight,
        // widthname: this.widthList.filter(item => item.id == this.addExtruderFormGroup.value.widthId)[0].widthName,
        length: this.addExtruderFormGroup.value.length,        
        comment: this.addExtruderFormGroup.value.comment,
        rollNumber: this.addExtruderFormGroup.value.rollNumber        
      };     
    console.log(item);
  }

  changeLocation(e:any) {
    console.log(e.target.value);
  }

}
