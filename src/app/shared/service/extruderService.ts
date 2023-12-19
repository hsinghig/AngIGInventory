import { Injectable } from "@angular/core";
import { colorModel } from "../model/color";
import { Observable, catchError, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ExtruderService {
    url = 'https://apiiginventory.azurewebsites.net/api/Colors/allcolors';

    constructor(private http: HttpClient){}
    
    getAllExtruderColors(): Observable<colorModel[]>{
       return this.http.get<colorModel[]>(this.url)
        .pipe(
            tap(data => console.log(JSON.stringify(data))),
            catchError(err => {
                console.error(err);
                throw new Error('Could not retrieve colors'));
            })
        );
    }
}