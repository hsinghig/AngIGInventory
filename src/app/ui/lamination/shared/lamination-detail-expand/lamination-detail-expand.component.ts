import { Component, Input } from '@angular/core';
import { laminationDetailModel } from 'src/app/shared/model/lamination.model';

@Component({
  selector: 'app-lamination-detail-expand',
  templateUrl: './lamination-detail-expand.component.html',
  styleUrl: './lamination-detail-expand.component.scss'
})
export class LaminationDetailExpandComponent {
@Input() dataSource:laminationDetailModel[] = [];
displayedColumns: string[] = ['laminationDetailId', 
'isExtruder', 'isCrossply', 'laminationDetailColor', 
'laminationDetailWidth', 'laminationDetailLength',
'laminationDetailWeight', 'referenceNumber', 'isMiscellaneous'];
}
