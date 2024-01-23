import { Injectable } from "@angular/core";
import { ColorModel } from "../model/colorModel";
import { Observable, catchError, map, tap, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { AppConstantsService } from "./appConstants.service";
import { crossplyInsertModel } from "../model/crossply.model";

@Injectable({
  providedIn: 'root'
})
export class CrossplyService{
  URL_GET_CROSSPLY_COLORS = this.appConstantsService.getURLForString('URL_GET_CROSSPLY_COLORS');
  URL_GET_CROSSPLY_LOCATIONS = this.appConstantsService.getURLForString('URL_GET_CROSSPLY_LOCATIONS');
  URL_GET_CROSSPLY_ALL_DATA = this.appConstantsService.getURLForString('URL_GET_CROSSPLY_ALL_DATA');
  URL_GET_CROSSPLY_DETAIL_DATA = this.appConstantsService.getURLForString('URL_GET_CROSSPLY_DETAIL_DATA');
  URL_GET_CROSSPLY_BY_ID = this.appConstantsService.getURLForString('URL_GET_CROSSPLY_BY_ID');
  URL_POST_CROSSPLY_INSERT = this.appConstantsService.getURLForString('URL_POST_CROSSPLY_INSERT');
  URL_GET_CROSSPLY_SUMMARY_DATA = this.appConstantsService.getURLForString('URL_GET_CROSSPLY_SUMMARY_DATA');

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

    getCrossplyAllData():Observable<any[]>{
      return this.http.get<any[]>(this.URL_GET_CROSSPLY_ALL_DATA).pipe(map((res:any) => res.data), 
      catchError(this.handleError))
    }

    getCrossplyDetailData():Observable<any[]>{
      return this.http.get<any[]>(this.URL_GET_CROSSPLY_DETAIL_DATA).pipe(map((res:any) => res.data), 
      catchError(this.handleError))
    }

    getCrossplyByCrossplyId(crossplyId:string):Observable<any[]>{
      const URL = this.URL_GET_CROSSPLY_BY_ID + crossplyId;
      console.log('URL passed for getCrossplyByCrossplyId : ', URL);
      return this.http.get<any[]>(URL).pipe(map((res:any) => res.data), 
      catchError(this.handleError))
    }

    getCrossplySummaryData():Observable<any[]>{
      return this.http.get<any[]>(this.URL_GET_CROSSPLY_SUMMARY_DATA).pipe(map((res:any) => res.data), 
      catchError(this.handleError))
    }


    //#endregion "Reference Tables"

   
    getHttpOptions() {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      return httpOptions;
    }

    insertCrossply(insertModel: crossplyInsertModel) {
      return this.http.post<crossplyInsertModel>(this.URL_POST_CROSSPLY_INSERT, insertModel, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );    
    }

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