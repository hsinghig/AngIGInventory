import { Injectable } from "@angular/core";
import { ColorModel } from "../model/colorModel";
import { Observable, catchError, map, tap, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { ExtruderInsertModel } from "../model/extruderInsertModel";
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
      map(res => {        
        return res.data;
      })
    );
  }
  //#endregion

  // #region "EXTRUDER Methods"
  getExtruderData():Observable<any[]>{
    return this.http.get<any>(this.URL_EXTRUDER_GET_EXTRUDER_DATA).pipe(tap(x => console.log('data getExtruderData', x)),map(x => x.data));
  }

  getExtruderSummary(): Observable<any[]>{
    return this.http.get<any>(this.URL_EXTRUDER_GET_SUMMARY_DATA).pipe(map(x => x.data));
  }

  insertExtruder(extruderInsertModel: ExtruderInsertModel) {
    return this.http.post<ExtruderInsertModel>(this.URL_EXTRUDER_INSERT, extruderInsertModel, this.getHttpOptions())
    .pipe(
      catchError(this.handleError)
    );    
  }

  // #endregion




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
