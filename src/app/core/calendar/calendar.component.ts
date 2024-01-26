import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-core-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit{
  @Input() currentDate = new Date()
  daysList = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
  currentMonthDays = 29; 
  fillerValues = [];
  dateList:string[] = [];
  dayFetched = 0;
  dateFirst = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);

  ngOnInit(){
    var currentMonth = this.currentDate.getMonth();
    var currentYear = this.currentDate.getFullYear();
    this.currentMonthDays = this.daysInMonth(currentMonth, currentYear);
    var dateFirst = new Date(currentYear, currentMonth, 1);
    this.dayFetched = dateFirst.getDay();
    let stringEmpty:string = " ";
    for(let i=0; i<this.dayFetched; i++){
      this.dateList.push(stringEmpty);
    }
    for(let i=1; i<=this.currentMonthDays; i++){
      this.dateList.push(i.toString());
    }   
    var item = 35 - this.currentMonthDays - this.dayFetched;
    for(let i=0; i< item; i++){
      this.dateList.push(stringEmpty);
    }
  }

  daysInMonth(month:any, year:any) {
   return new Date(year, month, 0).getDate();
  }

}

