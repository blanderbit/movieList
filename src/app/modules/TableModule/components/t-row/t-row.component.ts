import {Component, Input} from '@angular/core';

@Component({
    selector: 't-row',
    templateUrl: './t-row.component.html',
    styleUrls: ['./t-row.component.scss']
})
export class TRowComponent {
    @Input('propsTProp') propsTProp = [];
    @Input('propsDate') propsDate = [];
    @Input('item') item;
    @Input('width') width :number
    get widthForCol () {
        return `${this.width}%`;
    }

    get arrayProps(){
        return typeof this.item === 'object'
            ? Object.keys(this.item).map(i => this.propsTProp.includes(i) && this.item[i])
            : [];
    }
}
