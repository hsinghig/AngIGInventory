export interface ShiftSummaryModel{
  id:number;
  comment: string;
  dateCreated: string;
  createdBy: string;
  remedy: string;
  totalProductionLength:number;
  totalScrapLength: number;
  downtimeExceedHour: boolean;    
}

export const MY_SHIFT_SUMMARY_DATA: ShiftSummaryModel[]=
[
  {
    "id": 9,
    "comment": "big failure",
    "dateCreated": "04/23/2024",
    "createdBy": "Hemant Singh",
    "remedy": "Addressed today issue by restarting and calling help line.",
    "totalProductionLength": 10,
    "totalScrapLength": 42,
    "downtimeExceedHour": false      
  },
  {
    "id": 3,
    "comment": "Power failure brought the machine down, Power failure brought the machine down, Power failure brought the machine down",
    "dateCreated": "11/07/2024",
    "createdBy": "Hemant Singh",
    "remedy": "The machine has to shut down restarted couple of times.",
    "totalProductionLength": 1800,
    "totalScrapLength": 390,
    "downtimeExceedHour": false
  },
  {
    "id": 34,
    "comment": "The shift went smooth no interruptions",
    "dateCreated": "11/09/2024",
    "createdBy": "Hemant Singh",
    "remedy": "none applicable",
    "totalProductionLength": 20000,
    "totalScrapLength": 150,
    "downtimeExceedHour": true
  }
];