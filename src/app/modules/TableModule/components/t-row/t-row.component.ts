import {Component, Input} from '@angular/core';
import {ChildRowTemplateInterface} from "../../interface-type/interface";

@Component({
    selector: 't-row',
    templateUrl: './t-row.component.html',
    styleUrls: ['./t-row.component.scss']
})
export class TRowComponent {
    @Input('propsTProp') propsTProp: any[] = [];
    @Input('propsDate') propsDate: any[] = [];
    @Input('propsTemplate') propsTemplate: any[] = [];
    @Input('item') itemMain: any;
    @Input('width') width: number;
    @Input('childRowTemplate') childRowTemplate: ChildRowTemplateInterface[] = [];

    get widthForCol(): string {
        return `${this.width}%`;
    }

    get arrayProps(): string[] {

        return typeof this.itemMain === 'object'
            ? Object.keys(this.itemMain)
                .map(i => this.propsTProp.includes(i) && this.itemMain[i])
                .filter(i => !!i)
            : [];
    }

    getTemplate(name: string): ChildRowTemplateInterface | object {
        return this.childRowTemplate.find(i => i.nameProps === name);
    }
}
