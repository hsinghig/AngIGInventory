import { Component, Input } from '@angular/core';
import { crossplyDetailModel } from 'src/app/shared/model/crossply.model';

@Component({
  selector: 'app-crossply-detail-expand',
  templateUrl: './crossply-detail-expand.component.html',
  styleUrl: './crossply-detail-expand.component.scss'
})
export class CrossplyDetailExpandComponent {
@Input() dataSource:crossplyDetailModel[] = [];
displayedColumns: string[] = ['crossplyDetailId', 'colorZeroColor', 
'colorZeroWidth', 'colorZeroRollNumber', 'colorZeroLength',
'colorZeroWeight', 'colorNinetyColor', 'colorNinetyWidth',
'colorNinetyRollNumber', 'colorNinetyLength', 'colorNinetyWeight'];


}
