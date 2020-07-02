import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TColumnComponent} from "../t-column/t-column.component";

@Component({
    selector: 't-headers',
    templateUrl: './t-headers.component.html',
    styleUrls: ['./t-headers.component.scss']
})
export class THeadersComponent {
    @Input('array') array: TColumnComponent[];
    @Input('width') width: number;
    @Input('activeOrder') activeOrder: any;
    @Output('orderBy') order: EventEmitter<TColumnComponent> = new EventEmitter();

    get widthForCol(): string {
        return `${this.width}%`;
    }
    clickEvent(item): void{
        item.order = this.activeOrder.way === 'ASC' ? 'DESC' : 'ASC';
        this.order.emit(item);
    }
}
