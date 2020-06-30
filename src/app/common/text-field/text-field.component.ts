import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'text-field',
    templateUrl: './text-field.component.html',
    styleUrls: ['./text-field.component.scss']
})
export class TextFieldComponent {
    @Input('width') width:string  = '';
    @Input('value') value:string  = '';
    @Input('placeholder') placeholder:string  = '';
    @Output('input') input: EventEmitter<any> = new EventEmitter()
}
