import {NgModule} from '@angular/core';
import {TextFieldComponent} from "./text-field/text-field.component";
import {DropdownComponent} from "./dropdown/dropdown.component";
import {BadgeComponent} from "./badge/badge.component";
import {BtnComponent} from "./btn/btn.component";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [
        TextFieldComponent,
        DropdownComponent,
        BadgeComponent,
        BtnComponent
    ],
    exports: [
        TextFieldComponent,
        DropdownComponent,
        BadgeComponent,
        BtnComponent
    ],
    imports: [
        CommonModule
    ]
})
export class CommonComponentModule {
}
