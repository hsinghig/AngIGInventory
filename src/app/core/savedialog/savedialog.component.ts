import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { map, takeWhile, timer } from 'rxjs';

@Component({
  selector: 'app-core-savedialog',
  templateUrl: './savedialog.component.html',
  styleUrl: './savedialog.component.scss'
})
export class SaveDialogComponent {
  businessType = this.data.businessType; //'Extruder';
  showError = this.data.showError; // false;
 
  constructor(
    public dialogRef: MatDialogRef<SaveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
