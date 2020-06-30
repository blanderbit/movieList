import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginateComponent} from "./paginate.component";
import {PagerComponent} from "./pager-component/pager.component";


@NgModule({
    declarations: [
        PaginateComponent,
        PagerComponent
    ],
    exports:[
        PaginateComponent
    ],
    imports: [
        BrowserModule,
        CommonModule
    ],
    providers: [],
    bootstrap: []
})
export class PaginateModule { }
