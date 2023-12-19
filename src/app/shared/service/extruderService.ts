import { Injectable } from "@angular/core";
import { colorModel } from "../model/color";
import { Observable, catchError, tap, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ExtruderService {
    url = 'https://apiiginventory.azurewebsites.net/api/Colors/extrudercolors';
    extruderColorList$: Observable<colorModel[]> | undefined = this.http.get<colorModel[]>(this.url)
        .pipe(
            tap(data => console.log('Color List: ', JSON.stringify(data))),
            catchError(this.handleError)
        );

    constructor(private http: HttpClient){}   

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