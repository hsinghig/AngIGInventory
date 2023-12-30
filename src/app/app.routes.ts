import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

export const routes: Routes = [
    {
        path:'home',
        loadChildren: () => import('../app/ui/home/home.module').then((m) => m.HomeModule),
    },
    {
        path:'extruder',
        loadChildren: () => import('../app/ui/extruder/extruder.module').then((m) => m.ExtruderModule)
    },
    {
        path:'crossply',
        loadChildren:() => import('../app/ui/crossply/crossply.module').then((m) => m.CrossplyModule)
    },
    {
        path:'dashboard',
        loadChildren:() => import('../app/ui/dashboard/dashboard.module').then((m) => m.DashboardModule)
    },
    {
        path:'lamination',
        loadChildren:() => import('../app/ui/lamination/lamination.module').then((m) => m.LaminationModule)
    },
    {
        path:'', redirectTo: 'home', pathMatch: 'full'
    },
    {
        path: '**', pathMatch:'full', component: PageNotFoundComponent
    }
];
