import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CrossplyHomeService {
    private profileObs$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    getShowCrossplyHomeObs(): Observable<boolean> {
        return this.profileObs$.asObservable();
    }

    setShowCrossplyHomeObs(showTable: boolean) {
        this.profileObs$.next(showTable);
    }
}