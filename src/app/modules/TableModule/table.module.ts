import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableComponent} from "./table.component";
import {TColumnComponent} from "./components/t-column/t-column.component";
import {TRowComponent} from "./components/t-row/t-row.component";
import {THeadersComponent} from "./components/t-headers/t-headers.component";
import {InfiniteScrollDirective} from "../../directives/infinit.scroll.directive";


@NgModule({
    declarations: [
        TableComponent,
        TColumnComponent,
        TRowComponent,
        THeadersComponent,
        InfiniteScrollDirective
    ],
    exports: [
        TableComponent,
        TColumnComponent
    ],
    imports: [
        BrowserModule,
        CommonModule
    ],
    providers: [],
    bootstrap: []
})
export class TableModule { }
