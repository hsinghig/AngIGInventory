import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SharedNavService {
   messageSubject$ = new Subject<string>();

   raiseDataEmitterEvent(data: string){
        this.messageSubject$.next(data);
   }
}