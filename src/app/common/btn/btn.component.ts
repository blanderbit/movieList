import {Component, EventEmitter, Input, Output} from '@angular/core';

const DEFAULT_TEXT_BUTTON = 'Button';

@Component({
    selector: 'btn',
    templateUrl: './btn.component.html',
    styleUrls: ['./btn.component.scss']
})

export class BtnComponent {
    @Input('width') width?: string = '';
    @Input('text') text: string = DEFAULT_TEXT_BUTTON;
    @Input('isActive') isActive: boolean = false;
    @Output('click') click: EventEmitter<any> = new EventEmitter()
}
