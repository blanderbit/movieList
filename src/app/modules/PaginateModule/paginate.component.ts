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

    /**
     *  createArrayFromCount()
     *
     * create pagination elements (an array with a number) from which pages will then be displayed
     */

    get beforeRenderList(): boolean {
        if (this.length.length <= this.displayLength) {
            return false;
        }
        return (this.length.length - 3) > ( this.length.length -  (this.current - 1) );
    }

    /**
     * beforeRenderList()
     *
     * display of the effect of 3 points at the beginning
     *
     * can be easier
     */


    get getPersent(){
        return (100) / (this.current % 2 === 0 ? 4 : 3);
    }

    /**
     * getPersent()
     *
     * a simple proportion with which it is calculated when we show the effect of 3 points at the end of pagination
     *
     * can be easier
     */


    get afterRenderList(): boolean {
        if (this.length.length <= this.displayLength) {
            return false;
        }
        const step = ((100  * this.current) / this.length.length);
        return Math.ceil(step + this.getPersent) < 100;
    }

    /**
     * afterRenderList()
     *
     * check the percentage and porosity of the current element with the help of the proportion,
     * depending on the percentage, select whether to show 3 points or not
     *
     * can be easier
     */

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

    /**
     * steps()
     *
     * the central zone in the pagination, which is flanked by 3 points on the sides with a large number of elements
     *
     * can be easier
     */

    nextStep(): void {
        if(this.current < this.length.length)
            this.eventCLick(this.current + 1);
    }

    prevStep(): void  {
        if(this.current > 1)
            this.eventCLick(this.current - 1);
    }
}
