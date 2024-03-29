import { provideHttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";

import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CoreModule } from "./core/core.module";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports:[
        CommonModule,
        RouterOutlet,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CoreModule
    ], 
    exports: [
        CoreModule
    ],
    providers: [
        provideHttpClient(),
        {provide: LocationStrategy, useClass: HashLocationStrategy}
    ], 
    bootstrap: [AppComponent]
})
export class AppModule{
    
}