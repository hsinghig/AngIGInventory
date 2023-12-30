import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ExtruderHomeService {
    private profileObs$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    getShowExtruderHomeObs(): Observable<boolean> {
        return this.profileObs$.asObservable();
    }

    setShowExtruderHomeObs(showTable: boolean) {
        this.profileObs$.next(showTable);
    }
}