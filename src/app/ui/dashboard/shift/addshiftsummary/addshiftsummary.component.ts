import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,

} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserModel } from 'src/app/shared/model/userModel';
import { InventoryCommonService } from 'src/app/shared/service/inventoryCommonService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-addshiftsummary',
  templateUrl: './addshiftsummary.component.html',
  styleUrl: './addshiftsummary.component.scss'
})
export class AddshiftsummaryComponent implements OnInit {
  userList: UserModel[] = [];
  userSubscription: Subscription | undefined;
  constructor(private fb: FormBuilder, private inventoryCommonService: InventoryCommonService) { }

  public addShiftSummaryFormGroup = this.fb.group({
    reason: new FormControl(''),
    downtimeExceedHour: new FormControl(''),
    totalProductionLength: new FormControl(''),
    totalScrapLength: new FormControl(''),
    createdBy: new FormControl('', [Validators.required]),
    remedy: new FormControl(''),
    numberOfHours: new FormControl('')
  });

  ngOnInit(): void {
    this.loadDropdowns();
  }

  loadDropdowns() {
    this.userSubscription = this.inventoryCommonService.getAllUsers().subscribe(x =>{
      this.userList = x;
    });
  }

  onSubmit() {

  }

  clearForm(){

  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

}