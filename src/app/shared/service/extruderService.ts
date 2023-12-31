import { Injectable } from "@angular/core";
import { ColorModel } from "../model/colorModel";
import { Observable, map, tap, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { ExtruderDetail, ExtruderInsertModel, ExtruderSummary } from "../model/extruderInsertModel";
import { APP_CONSTANTS } from "src/app/app.contants";
import { AppConstantsService } from "./appConstants.service";

@Injectable({
  providedIn: 'root'
})
export class ExtruderService {
  URL_GET_LOCATIONS_EXTRUDER = this.appConstantsService.getURLForString('URL_GET_LOCATIONS_EXTRUDER');
  URL_GET_EXTRUDER_COLORS = this.appConstantsService.getURLForString('URL_GET_EXTRUDER_COLORS');
  URL_GET_WIDTHS = this.appConstantsService.getURLForString('URL_GET_WIDTHS');
  URL_GET_USERS_ALL_USERS = this.appConstantsService.getURLForString('URL_GET_USERS_ALL_USERS');


  URL_EXTRUDER_INSERT = this.appConstantsService.getURLForString('URL_EXTRUDER_INSERT');
  URL_EXTRUDER_GET_EXTRUDER_DATA = this.appConstantsService.getURLForString('URL_EXTRUDER_GET_EXTRUDER_DATA');
  URL_EXTRUDER_GET_SUMMARY_DATA = this.appConstantsService.getURLForString('URL_EXTRUDER_GET_SUMMARY_DATA');

  constructor(private http: HttpClient, private appConstantsService: AppConstantsService) { }

  getHttpOptions() {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return httpOptions;
  }
 // #region "GET reference table"
  getExtruderLocations(): Observable<any[]>{
    return this.http.get<any>(this.URL_GET_LOCATIONS_EXTRUDER).pipe(
      map(res => res.data)
    );
  }

  getExtruderColors(): Observable<ColorModel[]> {
    return this.http.get<any>(this.URL_GET_EXTRUDER_COLORS).pipe(      
      map(res => res.data)
    );
  }

  getWidths(): Observable<any[]>{
    return this.http.get<any>(this.URL_GET_WIDTHS).pipe(
      map(res => res.data)
    );
  }

  getAllUsers(): Observable<any[]>{
    return this.http.get<any>(this.URL_GET_USERS_ALL_USERS).pipe(
      map(res => res.data)
    );
  }
  //#endregion

  // #region "EXTRUDER Methods"
  getExtruderData():Observable<any[]>{
    return this.http.get<any>(this.URL_EXTRUDER_GET_EXTRUDER_DATA).pipe(map(x => x.data));
  }

  getExtruderSummary(): Observable<any[]>{
    return this.http.get<any>(this.URL_EXTRUDER_GET_SUMMARY_DATA).pipe(map(x => x.data));
  }

  insertExtruder(extruderInsertModel: ExtruderInsertModel) {
    return this.http.post<ExtruderInsertModel>(this.URL_EXTRUDER_INSERT, extruderInsertModel, this.getHttpOptions());   
  }

  // #endregion




  getResponse(response: any): ColorModel[] {
    const returnModel: ColorModel[] = [];
    response.forEach((item: any) => {
      const model: ColorModel = {
        id: item.id,
        name: item.name,
        isExtuder: item.isExtuder,
        isCrossPly: item.isCrossPly,
        isActive: item.isActive,
        comment: item.comment
      };
      returnModel.push(model);
    });
    return returnModel;
  }

  // getExtruderDetailData(): ExtruderSummaryData[] {
  //   var data: ExtruderSummaryData[] = [];
  //   MyData.data.forEach(x => {

  //   });
  //   return data;
  // }


  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }

}

export const MyData = {
  "data": [
    {
      "id": 1,
      "locationId": 1,
      "name": "Ext A",
      "colorId": 1,
      "colorname": "Black",
      "widthId": 1,
      "widthname": "87",
      "length": 300,
      "createdById": 1,
      "firstname": "hemant",
      "lastname": "singh",
      "fullname": "hemant singh",
      "email": "hsingh@impact-guard.com",
      "createdDate": "2023-12-07T03:16:25.17",
      "modifiedDate": "2023-12-07T03:17:34.753",
      "weight": 150,
      "rollnumber": null,
      "comment": null,
      "modifiedById": 1
    },
    {
      "id": 2,
      "locationId": 1,
      "name": "Ext A",
      "colorId": 3,
      "colorname": "Green",
      "widthId": 4,
      "widthname": "102",
      "length": 2345,
      "createdById": 3,
      "firstname": "nathan",
      "lastname": "kyle",
      "fullname": "nathan kyle",
      "email": "nkyle@impact-guard.com",
      "createdDate": "2023-12-11T02:03:17.567",
      "modifiedDate": "2023-12-11T02:03:17.567",
      "weight": 22,
      "rollnumber": "12345",
      "comment": null,
      "modifiedById": 3
    },
    {
      "id": 3,
      "locationId": 1,
      "name": "Ext A",
      "colorId": 3,
      "colorname": "Green",
      "widthId": 4,
      "widthname": "102",
      "length": 2342,
      "createdById": 1,
      "firstname": "hemant",
      "lastname": "singh",
      "fullname": "hemant singh",
      "email": "hsingh@impact-guard.com",
      "createdDate": "2023-12-11T02:03:44.81",
      "modifiedDate": "2023-12-11T02:03:44.81",
      "weight": 223,
      "rollnumber": "1234577",
      "comment": null,
      "modifiedById": 1
    },
    {
      "id": 4,
      "locationId": 1,
      "name": "Ext A",
      "colorId": 1,
      "colorname": "Black",
      "widthId": 4,
      "widthname": "102",
      "length": 2342,
      "createdById": 1,
      "firstname": "hemant",
      "lastname": "singh",
      "fullname": "hemant singh",
      "email": "hsingh@impact-guard.com",
      "createdDate": "2023-12-11T02:05:02.193",
      "modifiedDate": "2023-12-11T02:05:02.193",
      "weight": 223,
      "rollnumber": "12",
      "comment": null,
      "modifiedById": 1
    },
    {
      "id": 5,
      "locationId": 1,
      "name": "Ext A",
      "colorId": 1,
      "colorname": "Black",
      "widthId": 1,
      "widthname": "87",
      "length": 0,
      "createdById": 1,
      "firstname": "hemant",
      "lastname": "singh",
      "fullname": "hemant singh",
      "email": "hsingh@impact-guard.com",
      "createdDate": "2023-12-29T08:49:26.2",
      "modifiedDate": "2023-12-29T08:49:26.2",
      "weight": 100,
      "rollnumber": "AA200",
      "comment": "added from swagger",
      "modifiedById": 1
    },
    {
      "id": 6,
      "locationId": 1,
      "name": "Ext A",
      "colorId": 1,
      "colorname": "Black",
      "widthId": 1,
      "widthname": "87",
      "length": 0,
      "createdById": 1,
      "firstname": "hemant",
      "lastname": "singh",
      "fullname": "hemant singh",
      "email": "hsingh@impact-guard.com",
      "createdDate": "2023-12-29T08:55:03.337",
      "modifiedDate": "2023-12-29T08:55:03.337",
      "weight": 10,
      "rollnumber": "AA200",
      "comment": "added from swagger",
      "modifiedById": 1
    }
  ],
  "success": true,
  "message": "Success"
}