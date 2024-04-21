import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddshiftsummaryComponent } from '../addshiftsummary/addshiftsummary.component';

@Component({
  selector: 'app-dashborad-shiftsummary', 
  templateUrl: './shiftsummary.component.html',
  styleUrl: './shiftsummary.component.scss'
})
export class ShiftsummaryComponent {
  public showMenu: boolean = false;
  public showDetail: boolean = true;
  public headerStyle = 'pageHeaderextruderStyle';
  public headerText = 'Shift Summary Page';
  public showTable$ = true;
  public headerTypePassed: string = 'dashboard';
  public headerColor: string = '#84A98C';

  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(AddshiftsummaryComponent);
  }
  
  OnColorSelected(data: any){
    this.headerColor = data;
  }

  onButtonToggleSelected(data:any){   
    switch(data){
      case 'menu':
        this.showDetail = true;
        this.showMenu = false;
        break;
      case 'detail':
        this.showDetail = false;
        this.showMenu = true;
        break;
    }
  }


}
