import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DemoMaterialModule } from "./demo-material.module";

@NgModule({
    declarations: [],
    imports: [CommonModule, DemoMaterialModule],
    exports: [DemoMaterialModule]
})
export class CoreModule{}