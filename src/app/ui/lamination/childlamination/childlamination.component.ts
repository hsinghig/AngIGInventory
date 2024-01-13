import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SharedNavService } from 'src/app/shared/service/sharedNavService';

@Component({
  selector: 'app-childlamination',
  templateUrl: './childlamination.component.html',
  styleUrl: './childlamination.component.scss'
})
export class ChildlaminationComponent {

addLaminationFormGroup = this.fb.group({
  title: new FormControl('', [Validators.required]), 
  contacts: new FormArray([
  
  ])
});
constructor(private sharedNavService: SharedNavService, private fb: FormBuilder, private activatedRoute: ActivatedRoute) {  
  this.activatedRoute.url.subscribe(activeUrl =>{
    this.sharedNavService.raiseDataEmitterEvent(window.location.pathname);
  });
}

get contactList(): FormArray{
  return this.addLaminationFormGroup.get('contacts') as FormArray;
}

removeAddress(index: number) {
  console.log('remove address : ', index);
  //const index = this.contactList.indexOf(index); y.indexOf(5);
  if (index > -1) { // only splice array when item is found
    this.contactList.removeAt(index); // 2nd parameter means remove one item only
  }
 // this.contactList.removeAsyncValidators();
}
clearForm(){
  this.contactList.reset();
  this.addLaminationFormGroup.reset();
}
onSubmit(){
  console.log(this.addLaminationFormGroup.value);
}

addAddress(){
  const addressFormGroup = this.fb.group({
    name:new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required])
  });
  this.contactList.push(addressFormGroup);
}
}
