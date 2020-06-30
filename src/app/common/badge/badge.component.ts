import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
import {BadgeInterface} from "./interface/interface";

@Component({
    selector: 'badge',
    templateUrl: './badge.component.html',
    styleUrls: ['./badge.component.scss']
})
export class BadgeComponent {
    _arrayData: BadgeInterface[] = [];
    @Input('arrayData') set array(value: any) {
        this._arrayData = value.map((item: string): BadgeInterface => {
            return {
                name: item,
                color: this.randColor(),
                id: this.uniqueId()
            };
        });
    }

    get array(): any {
        return this._arrayData;
    }

    randColor(): string {
        const r = this.toFloor(256),
            g = this.toFloor(256),
            b = this.toFloor(256);
        return `rgba(${r},${g},${b}, 0.5)`;
    }

    toFloor = (count: number): number => Math.floor(Math.random() * (count));
    uniqueId = (): string => Math.random().toString(36).slice(-8);
}
