import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginateModule } from "./modules/PaginateModule/paginate.module";
import { TableModule } from "./modules/TableModule/table.module";
import { ListsService } from "./_services/lists.service";
import { OrdersService } from "./_services/orders.service";
import { CommonComponentModule } from "./common/common.component.module";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        PaginateModule,
        TableModule,
        AppRoutingModule,
        CommonComponentModule,
        CommonModule
    ],
    providers: [ListsService, OrdersService],
    bootstrap: [AppComponent]
})
export class AppModule {}
