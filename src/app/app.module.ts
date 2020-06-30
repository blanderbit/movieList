import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PaginateModule} from "./modules/PaginateModule/paginate.module";
import {TableModule} from "./modules/TableModule/table.module";
import {TextFieldComponent} from "./common/text-field/text-field.component";
import {ListsService} from "./_services/lists.service";
import {DropdownComponent} from "./common/dropdown/dropdown.component";
import {OrdersService} from "./_services/orders.service";
import {BadgeComponent} from "./common/badge/badge.component";

@NgModule({
    declarations: [
        AppComponent,
        TextFieldComponent,
        DropdownComponent,
        BadgeComponent
    ],
    imports: [
        BrowserModule,
        PaginateModule,
        TableModule,
        AppRoutingModule
    ],
    providers: [ListsService, OrdersService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
