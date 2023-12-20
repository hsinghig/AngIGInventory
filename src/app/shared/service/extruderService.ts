import { Injectable } from "@angular/core";
import { IColorModel } from "../model/colorModel";
import { Observable, map, tap, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ExtruderService {
    url = 'https://apiiginventory.azurewebsites.net/api/Colors/extrudercolors';   

    constructor(private http: HttpClient){}   

    getExtruderColors(): Observable<IColorModel[]>{
        return this.http.get<any>(this.url).pipe(
            tap(x => console.log(x)),
            map(res => {
                if (res) {
                    res = this.getResponse(res.data)
                }
                return res;
            })
        )
    }

    getResponse(response:any): IColorModel[]{        
        const returnModel: IColorModel[] = [];
        response.forEach((item:any) => {
            const model:IColorModel = {
                id: item.id,
                colorName: item.name,
                isExtuder: item.isExtuder,
                isCrossPly: item.isCrossPly,
                isActive: item.isActive,
                comment: item.comment
            };
            returnModel.push(model);
        });
        return returnModel;
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