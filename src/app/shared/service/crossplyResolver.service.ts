import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router"
import { crossplyModel } from "../model/crossply.model";
import { CrossplyService } from "./crossplyService";
import { inject } from "@angular/core";

export const CrossplyResolver: ResolveFn<crossplyModel[]> = (
    route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
        return inject(CrossplyService).getCrossplyAllData();
    };


