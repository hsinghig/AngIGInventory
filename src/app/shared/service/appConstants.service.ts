import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { APP_CONSTANTS_NEW } from "src/app/app.contants";

@Injectable({
    providedIn: 'root'
})
export class AppConstantsService {
    
    getURLForString(urlname: string) : string{
        let result:string | undefined;
        result = APP_CONSTANTS_NEW.find(x => x.url_name == urlname)?.url_value;
        if (result){
            return result;
        }
        return '';
    }    
}