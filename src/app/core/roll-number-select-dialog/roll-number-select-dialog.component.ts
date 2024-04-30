import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ROLL_MIN_LENGTH_FILTER, ROLL_MIN_WEIGHT_FILTER } from 'src/app/app.contants';
import { extruderRollNumberModel, extruderRollNumberRequestModel } from 'src/app/shared/model/extruderRollNumberModel';
import { CrossplyService } from 'src/app/shared/service/crossplyService';

@Component({
  selector: 'app-roll-number-select-dialog',
  templateUrl: './roll-number-select-dialog.component.html',
  styleUrl: './roll-number-select-dialog.component.scss'
})
export class RollNumberSelectDialogComponent implements OnInit{
  
  displayedColumns: string[] = [
    'select', 'rollnumber', 'colorname', 'widthname', 'length', 'weight', 'fullname', 'createdDate'
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  selection = new SelectionModel<extruderRollNumberModel>(false, []);
  dataToSentBack:extruderRollNumberModel | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public dataPassedFromParent: extruderRollNumberRequestModel,
   private crossplyService: CrossplyService, private dialogRef: MatDialogRef<RollNumberSelectDialogComponent>){}

  ngOnInit(): void {
    this.crossplyService.getExtruderRollNumber(this.dataPassedFromParent.colorId, this.dataPassedFromParent.widthId).subscribe(response => {
      console.log('data returned crossplyService getExtruderRollNumber : ', response);
      var mydata = response.filter(x => x.length>=ROLL_MIN_LENGTH_FILTER && x.weight >=ROLL_MIN_WEIGHT_FILTER);
      this.dataSource = new MatTableDataSource(mydata);     
    });    
  }

  isAllSelected(){
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  changeRow(row:extruderRollNumberModel){
    this.dataToSentBack = row;
    this.selection.toggle(row);
  }

  toggleAllRows(){
    if (this.isAllSelected()){
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  ChosenRollNumber(){
    this.dialogRef.close({data: this.dataToSentBack});
  }

  Cancel(){
    this.dialogRef.close({data:null});
  }

}
