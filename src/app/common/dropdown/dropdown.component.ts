import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';

@Component({
    selector: 'dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
    @Input('width') width:string = '';
    @Input('value') value:string = '';
    @Input('arrayData') array: string[] = [];
    @Input('placeholder') placeholder:string = '';
    @Output('change') change: EventEmitter<string> = new EventEmitter();
    select:string
    expand:boolean = true
    clickEvent(item): void{
        this.select = item;
        this.change.emit(item)
    }
}
