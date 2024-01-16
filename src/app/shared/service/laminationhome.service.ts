import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LaminationHomeService {
    private profileObs$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    getShowLaminationHomeObs(): Observable<boolean> {
        return this.profileObs$.asObservable();
    }

    setShowLaminationHomeObs(showTable: boolean) {
        this.profileObs$.next(showTable);
    }
}