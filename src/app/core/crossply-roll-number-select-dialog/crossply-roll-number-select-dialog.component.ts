import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { extruderRollNumberModel, extruderRollNumberRequestModel } from 'src/app/shared/model/extruderRollNumberModel';
import { CrossplyService } from 'src/app/shared/service/crossplyService';
import { LaminationService } from 'src/app/shared/service/laminationService';

@Component({
  selector: 'app-crossply-roll-number-select-dialog',
  templateUrl: './crossply-roll-number-select-dialog.component.html',
  styleUrl: './crossply-roll-number-select-dialog.component.scss'
})
export class CrossplyRollNumberSelectDialogComponent implements OnInit{
  
  displayedColumns: string[] = [
    'select', 'rollnumber', 'colorname', 'widthname', 'length', 'weight', 'fullname', 'createdDate'
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  selection = new SelectionModel<extruderRollNumberModel>(false, []);
  dataToSentBack:extruderRollNumberModel | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public dataPassedFromParent: extruderRollNumberRequestModel,
  private laminationService: LaminationService,
  
   private crossplyService: CrossplyService, private dialogRef: MatDialogRef<CrossplyRollNumberSelectDialogComponent>){}

  ngOnInit(): void {
    this.crossplyService.getCrossplyRollNumber(this.dataPassedFromParent.colorId, this.dataPassedFromParent.widthId).subscribe(response => {
      console.log('data returned : ', response);
      this.dataSource = new MatTableDataSource(response);     
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
