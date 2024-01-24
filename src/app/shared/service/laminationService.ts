import { Injectable } from "@angular/core";
import { ColorModel } from "../model/colorModel";
import { Observable, catchError, delay, map, tap, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { AppConstantsService } from "./appConstants.service";
import { laminationInsertModel } from "../model/lamination.model";

@Injectable({
  providedIn: 'root'
})
export class LaminationService{

  URL_GET_LAMINATION_COLORS=this.appConstantsService.getURLForString('URL_GET_LAMINATION_COLORS');
  URL_GET_LAMINATION_LOCATIONS=this.appConstantsService.getURLForString(' URL_GET_LAMINATION_LOCATIONS');
  URL_GET_LAMINATION_ALL_DATA=this.appConstantsService.getURLForString('URL_GET_LAMINATION_ALL_DATA');
  URL_GET_LAMINATION_DETAIL_DATA=this.appConstantsService.getURLForString('URL_GET_LAMINATION_DETAIL_DATA');
  URL_GET_LAMINATION_BY_ID=this.appConstantsService.getURLForString('URL_GET_LAMINATION_BY_ID');
  URL_GET_LAMINATION_BY_REFNUMBER=this.appConstantsService.getURLForString('URL_GET_LAMINATION_BY_REFNUMBER');
  URL_POST_LAMINATION_INSERT=this.appConstantsService.getURLForString('URL_POST_LAMINATION_INSERT');
  URL_GET_LAMINATION_SUMMARY_DATA = this.appConstantsService.getURLForString('URL_GET_LAMINATION_SUMMARY_DATA');

  URL_GET_ALL_WIDTHS = this.appConstantsService.getURLForString('URL_GET_ALL_WIDTHS');
  URL_GET_USERS_ALL_USERS = this.appConstantsService.getURLForString('URL_GET_USERS_ALL_USERS');

  URL_GET_EXTRUDER_ROLLNUMBER = this.appConstantsService.getURLForString('URL_GET_EXTRUDER_ROLLNUMBER');
  URL_POST_EXTRUDER_INSERT = this.appConstantsService.getURLForString('URL_POST_EXTRUDER_INSERT');
  URL_GET_EXTRUDER_ALL_DATA = this.appConstantsService.getURLForString('URL_GET_EXTRUDER_ALL_DATA');
  URL_GET_EXTRUDER_SUMMARY_DATA = this.appConstantsService.getURLForString('URL_GET_EXTRUDER_SUMMARY_DATA');


    constructor(private http: HttpClient, private appConstantsService: AppConstantsService){}

    //#region "Reference Tables"

    getLaminationColors(): Observable<any[]>{
      return this.http.get<any>(this.URL_GET_LAMINATION_COLORS).pipe(
        map(res => res.data)
      );
    }

    getLaminationLocations(): Observable<any[]>{
      return this.http.get<any>(this.URL_GET_LAMINATION_LOCATIONS).pipe(
        tap(x => {
          console.log(x);
        }),
        map(res => res.data)
      );
    }

    getLaminationLocationList():Observable<any[]>{
      return this.http.get<any[]>(this.URL_GET_LAMINATION_LOCATIONS).pipe(map((res:any) => res.data), 
      catchError(this.handleError))
    }

    getExtruderRollNumber(colorId:any, widthId:any): Observable<any[]>{
      const url = this.URL_GET_EXTRUDER_ROLLNUMBER + '?ColorId=' + colorId + '&WidthId=' + widthId;
      return this.http.get<any>(url).pipe(
        map(res => res.data)
      );
    }

    getLaminationAllData():Observable<any[]>{
      return this.http.get<any[]>(this.URL_GET_LAMINATION_ALL_DATA).pipe(delay(1),map((res:any) => res.data), 
      catchError(this.handleError));      
    }

    getLaminationDetailData():Observable<any[]>{
      return this.http.get<any[]>(this.URL_GET_LAMINATION_DETAIL_DATA).pipe(map((res:any) => res.data), 
      catchError(this.handleError))
    }

    getLaminationByLaminationId(laminationId:string):Observable<any[]>{
      const URL = this.URL_GET_LAMINATION_BY_ID + laminationId;
      console.log('URL passed for getLaminationByLaminationId : ', URL);
      return this.http.get<any[]>(URL).pipe(map((res:any) => res.data), 
      catchError(this.handleError))
    }

    getLaminationSummaryData():Observable<any[]>{
      return this.http.get<any[]>(this.URL_GET_LAMINATION_SUMMARY_DATA).pipe(map((res:any) => res.data), 
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

    insertLamination(insertModel: laminationInsertModel) {
      return this.http.post<laminationInsertModel>(this.URL_POST_LAMINATION_INSERT, insertModel, this.getHttpOptions())
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