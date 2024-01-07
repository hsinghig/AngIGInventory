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
export class CrossplyService{
    constructor(private http: HttpClient, private appConstantsService: AppConstantsService){}

    //#region "Reference Tables"
    //#endregion "Reference Tables"
}