import { Component, OnInit } from '@angular/core';
import { INavLinkModel } from 'src/app/shared/model/navLinkModel';
import { SharedNavService } from 'src/app/shared/service/sharedNavService';

@Component({
  selector: 'app-core-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent implements OnInit {
  public navLinkModelList: INavLinkModel[]=[];
  constructor(private sharedNavService: SharedNavService){
  }

  ngOnInit(): void {   
    this.sharedNavService.messageSubject$.subscribe(data => {
      this.navLinkModelList = [];   
      let index = 0;
      const values = data.split('/');
      let baseValue = '';    
      let result:INavLinkModel= {
        linkText: 'Home', URL:'/'
      }
      for(const value in values){  
        if (index == 1){
          result = {
            linkText: this.capitalizeFirstLetter(values[1]), URL: '/' + values[1]
          }
          baseValue = result.URL;
        }
        if (index == 2){
          result = {
            linkText: this.capitalizeFirstLetter(values[2]), URL: baseValue + '/' + values[2]
          }
        }
        this.navLinkModelList.push(result);
        index ++;
      }  
    });    
  }

  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

}
