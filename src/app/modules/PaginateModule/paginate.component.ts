import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ACTIVE_SIZE_DEF, CURRENT_DEF, DISPLAY_LENGTH_DEF, PAGE_SIZE_DEF} from "./consts/consts";
import {ChangeDataPagination} from "./interface/interface";

@Component({
    selector: 'app-paginate',
    templateUrl: './paginate.component.html',
    styleUrls: ['./paginate.component.scss']
})
export class PaginateComponent {
    _length: number[] = [];

    @Input('pageSize') pageSize: number[] = PAGE_SIZE_DEF;
    @Input('activePageSize') activePageSize: number = ACTIVE_SIZE_DEF;
    @Input('isPagerActive') isPagerActive: boolean = false;
    @Input('displayLength') displayLength: number = DISPLAY_LENGTH_DEF;

    @Input('length') set length(length: any) {
        this._length = this.createArrayFromCount(length);
    }
    get length(): any {
        return this._length;
    }

    @Input('current') current?: number = CURRENT_DEF;
    @Output('change') change: EventEmitter<ChangeDataPagination> = new EventEmitter();
    eventCLick(item?: number, pager?: number): void{
        this.change.next(new ChangeDataPagination({item, pager}));
    }

    createArrayFromCount(length: number): number[]{
        return Array.from({ length }, (_: any, k: number): number => k + 1);
    }

    get beforeRenderList(): boolean {
        if (this.length.length <= this.displayLength) {
            return false;
        }
        return (this.length.length - 3) >= ( this.length.length -  (this.current - 1) );
    }

    get afterRenderList(): boolean {
        if (this.length.length <= this.displayLength) {
            return false;
        }
        return (this.length.length - (this.current + 1) ) >= 3;
    }

    get steps(): number[] {

        const realPosition = (this.current - 3);
        let page = this.afterRenderList
            ? realPosition < 1 ? 0 : realPosition
            : this.current;

        page = this.beforeRenderList ? realPosition : page;

        return [...this.length].splice(
            this.beforeRenderList ? page : 0,
            this.displayLength
        );
    }
    nextStep(): void {
        if(this.current < this.length.length)
            this.eventCLick(this.current + 1);
    }
    prevStep(): void  {
        if(this.current > 1)
            this.eventCLick(this.current - 1);
    }
}
