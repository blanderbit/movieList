import {
    Component,
    Input
} from '@angular/core';

@Component({
    selector: 'badge',
    templateUrl: './badge.component.html',
    styleUrls: ['./badge.component.scss']
})
export class BadgeComponent {
    @Input('arrayData') array = [];
    @Input('arrayDataCheck') arrayCheck = [];

    getColor(name: string): string | undefined | null {
        if (Array.isArray(this.arrayCheck)) {
            const findElement = this.arrayCheck.find((i: any) => i.name === name);
            return findElement ? findElement.color : null;
        }
    }
}
