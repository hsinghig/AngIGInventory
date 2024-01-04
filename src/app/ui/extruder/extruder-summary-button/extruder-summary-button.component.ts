import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { ButtonToggle } from 'src/app/shared/model/button-toggle';

@Component({
  selector: 'app-extruder-summary-button',
  templateUrl: './extruder-summary-button.component.html',
  styleUrl: './extruder-summary-button.component.scss'
})
export class ExtruderSummaryButtonComponent {
  @Input() buttonToggleList: ButtonToggle[]=[];
  @Output() buttonToggleSelected = new EventEmitter<string>();

  onToggleGroupChange(data: MatButtonToggleChange){
    this.buttonToggleSelected.emit(data.value);
  }

}
