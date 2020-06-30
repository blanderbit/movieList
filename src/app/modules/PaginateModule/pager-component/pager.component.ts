import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
import {ACTIVE_SIZE_DEF, PAGE_SIZE_DEF} from "../consts/consts";

@Component({
    selector: 'app-pager',
    templateUrl: './pager.component.html',
    styleUrls: ['./pager.component.scss']
})
export class PagerComponent {
    @Input('pageSizes') pageSizes: number[] = PAGE_SIZE_DEF;
    @Input('activeSize') activeSize: number = ACTIVE_SIZE_DEF;

    @Output('changePager') changePager: EventEmitter<number> = new EventEmitter();

    get pageSizesArray(): number[]{
        return Array.isArray(this.pageSizes) ? this.pageSizes : PAGE_SIZE_DEF;
    }

    eventCLick(pager): void{
        this.changePager.emit(pager);
    }
}
