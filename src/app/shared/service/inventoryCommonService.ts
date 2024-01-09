import { Injectable } from "@angular/core";
import { ColorModel } from "../model/colorModel";
import { Observable, catchError, map, tap, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { AppConstantsService } from "./appConstants.service";

@Injectable({
  providedIn: 'root'
})
export class InventoryCommonService{
  URL_GET_ALL_COLORS = this.appConstantsService.getURLForString('URL_GET_ALL_COLORS');
  URL_GET_ALL_WIDTHS = this.appConstantsService.getURLForString('URL_GET_ALL_WIDTHS');
  URL_GET_USERS_ALL_USERS = this.appConstantsService.getURLForString('URL_GET_USERS_ALL_USERS'); 

  constructor(private http: HttpClient, private appConstantsService: AppConstantsService){}

  getAllColors(): Observable<any[]>{
    return this.http.get<any>(this.URL_GET_ALL_COLORS).pipe(
      tap(x => console.log('inventorycommonservice.getAllColors',x)),
      map(res => res.data)
    );
  }

  getWidths(): Observable<any[]>{
    return this.http.get<any>(this.URL_GET_ALL_WIDTHS).pipe(
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
}
