import { ApplicationRef, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from 'src/app/shared/model/userModel';
import { CrossplyService } from 'src/app/shared/service/crossplyService';
import { ExtruderService } from 'src/app/shared/service/extruderService';
import { InventoryCommonService } from 'src/app/shared/service/inventoryCommonService';
import { SharedNavService } from 'src/app/shared/service/sharedNavService';
@Component({
  selector: 'app-add-lamination',
  templateUrl: './add-lamination.component.html',
  styleUrl: './add-lamination.component.scss'
})
export class AddLaminationComponent implements OnInit {
  showError: boolean = true;
  errorMessageList: string[] = [
    'Extruder Detail 2 : Width should be greater than Lamination width'
  ]
  extruderFormGroup = this.fb.group({
    extruderColorId: new FormControl("", [Validators.required]),
    extruderWidthId: new FormControl("", [Validators.required]),
    extruderRollNumber: new FormControl('', [Validators.required]),
    extruderLength: new FormControl('', [Validators.required]),
    extruderWeight: new FormControl('', [Validators.required])
  });
  crossplyFormGroup = this.fb.group({
    crossplyColorId: new FormControl("", [Validators.required]),
    crossplyWidthId: new FormControl("", [Validators.required]),
    crossplyRollNumber: new FormControl('', [Validators.required]),
    crossplyLength: new FormControl('', [Validators.required]),
    crossplyWeight: new FormControl('', [Validators.required])
  });
  addLaminationFormGroup = this.fb.group({
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

  extruderColorList: any[] = [];
  widthList: any[] = [];
  crossplyColorList: any[] = [];
  crossplyLocationList: any[] = [];
  laminationColorList: any[] = [];
  userList: UserModel[] = [];
  constructor(private sharedNavService: SharedNavService, private fb: FormBuilder,
    private extruderService: ExtruderService,
    private inventoryCommonService: InventoryCommonService,
    private crossplyService: CrossplyService,
    private appRef: ApplicationRef,
    private changeDetectorRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.url.subscribe(activeUrl => {
      this.sharedNavService.raiseDataEmitterEvent(window.location.pathname);
    });
  }

  ngOnInit(): void {
    this.extruderService.getExtruderColors().subscribe(x => {
      this.extruderColorList = x;
    });
    this.inventoryCommonService.getWidths().subscribe(x => {
      this.widthList = x;
    });
    this.crossplyService.getCrossplyColors().subscribe(x => {
      this.crossplyColorList = x;
    })
  }

  get extruderList() {
    return this.addLaminationFormGroup.get('extruderList') as FormArray;   //(<FormArray>this.addLaminationFormGroup.get('extruderList')).controls;
  }

  get crossplyList() {
    return this.addLaminationFormGroup.get('crossplyList') as FormArray;
  }

  fetchExtruderRollNumber(i: number) {
    const extruderFG = i;
    this.addLaminationFormGroup.get(['extruderList',i])?.patchValue({
      extruderRollNumber: 44
    });
   
  }

  fetchCrossplyRollNumber(i: number) {
    const extruderFG = i;
    this.addLaminationFormGroup.get(['crossplyList',i])?.patchValue({
      crossplyRollNumber: 44
    });
  }
  clearForm() {
    // let frmArray = this.addLaminationFormGroup.get('extruderList') as FormArray;
    // frmArray.clear();
    this.addLaminationFormGroup.reset();
  }

  addExtruder() {
    if (this.extruderList.length < 3) {
      this.extruderList.push(this.extruderFormGroup);
    }
  }

  addCrossply() {
    if (this.crossplyList.length < 12) {
      this.crossplyList.push(this.crossplyFormGroup);
    }
  }

  removeExtruder() {
    console.log('remove extruder', 0);
    this.extruderList.removeAt(0);
  }

  removeCrossply() {
    console.log('remove crossply', 0);
    this.crossplyList.removeAt(0);  
  }

  onSubmit() {
    console.log(this.addLaminationFormGroup.value);
  }

}
