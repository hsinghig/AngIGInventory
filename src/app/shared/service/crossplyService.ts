import { Injectable } from "@angular/core";
import { ColorModel } from "../model/colorModel";
import { Observable, catchError, map, tap, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { AppConstantsService } from "./appConstants.service";

@Injectable({
  providedIn: 'root'
})
export class CrossplyService{
  URL_GET_CROSSPLY_LOCATIONS = this.appConstantsService.getURLForString('URL_GET_CROSSPLY_LOCATIONS');
  URL_GET_CROSSPLY_COLORS = this.appConstantsService.getURLForString('URL_GET_CROSSPLY_COLORS');
  URL_GET_ALL_WIDTHS = this.appConstantsService.getURLForString('URL_GET_ALL_WIDTHS');
  URL_GET_USERS_ALL_USERS = this.appConstantsService.getURLForString('URL_GET_USERS_ALL_USERS');

  URL_GET_EXTRUDER_ROLLNUMBER = this.appConstantsService.getURLForString('URL_GET_EXTRUDER_ROLLNUMBER');
  URL_POST_EXTRUDER_INSERT = this.appConstantsService.getURLForString('URL_POST_EXTRUDER_INSERT');
  URL_GET_EXTRUDER_ALL_DATA = this.appConstantsService.getURLForString('URL_GET_EXTRUDER_ALL_DATA');
  URL_GET_EXTRUDER_SUMMARY_DATA = this.appConstantsService.getURLForString('URL_GET_EXTRUDER_SUMMARY_DATA');


    constructor(private http: HttpClient, private appConstantsService: AppConstantsService){}

    //#region "Reference Tables"
    getCrossplyLocations(): Observable<any[]>{
      return this.http.get<any>(this.URL_GET_CROSSPLY_LOCATIONS).pipe(
        map(res => res.data)
      );
    }

    getCrossplyColors(): Observable<any[]>{
      return this.http.get<any>(this.URL_GET_CROSSPLY_COLORS).pipe(
        map(res => res.data)
      );
    }

    getExtruderRollNumber(colorId:any, widthId:any): Observable<any[]>{
      const url = this.URL_GET_EXTRUDER_ROLLNUMBER + '?ColorId=' + colorId + '&WidthId=' + widthId;
      return this.http.get<any>(url).pipe(
        map(res => res.data)
      );
    }
    //#endregion "Reference Tables"
}