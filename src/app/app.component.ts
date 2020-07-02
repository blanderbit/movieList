import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import {map, tap} from "rxjs/operators";
import {ChangeDataPagination} from "./modules/PaginateModule/interface/interface";
import {BehaviorSubject, Observable} from "rxjs";
import {MovieModel, OrderBy} from "./models/main.models";
import {AppComponentHelper} from "./component-helper/app.component.helper";
import {ASC, DESC} from "./consts/const";
import {ListsService} from "./_services/lists.service";
import {OrdersService} from "./_services/orders.service";
import {staticTColl, staticTCollDate} from "./modules/TableModule/interface-type/type";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})

export class AppComponent extends AppComponentHelper<any> {
    dataSource: BehaviorSubject<any> = this.lService.getData();

    /**
     *  dataSource
     *  work property for aplication
     *
     */


    active = 1;

    /**
     *  active - property
     *
     *  current page for only paginate
     *
     */

    pager = 5;

    /**
     *  pager - property
     *
     */


    orderBy: OrderBy = {
        field: '',
        way: ''
    };

    /**
     *  orderBy - property
     *
     *  using for sorting, implementation sort we can check in OrdersService
     *
     */


    searchStr = '';
    searchNetwork = '';
    searchDate = '';
    searchGenre = '';

    /**
     *  property for searching
     *
     *  using for sorting, implementation searching we can check in OrdersService
     *
     */


    _infinitePager = 10;

    /**
     *  _infinitePager - property
     *
     *  the number of displayed elements with an endless scrolling, more towards the bottom, this number increases,
     *  and the number of displayed elements becomes smaller. This works if the property "_infinite" = "true", however
     *  if the property at some point in time becomes "fasle" then the value is reset to the value default
     *
     */

    _infinite = false;

    /**
     *  _infinite - property
     *
     *  the property that is responsible for whether there will be an active infinite scroll, respectively,
     *  if "true" then show an infinite scroll, however, hide the pagination, if "false" we reverse
     *
     */

    realCount = {
        value: [],
        paginateCount: 0
    };

    /**
     *  realCount - property
     *
     *  this is a repository for an already filtered array of elements,
     *  as well as for the number of pages in this array
     *
     */

    get arrayNetwork(): Set<staticTColl> {
        return this.getDataSource('network');
    }

    /**
     *  arrayNetwork()
     *
     *  get unique array string by prop "network" from, working property dataSource, please check
     *  app.component.helper.ts
     */

    get arrayDate(): Set<staticTCollDate> {
        return this.getDataSource('date');
    }

    /**
     *  arrayDate()
     *
     *  get unique array string by prop "network", working property dataSource, please check
     *  app.component.helper.ts
     */

    get arrayGenre(): object {
        return this.lService.uniqueGenre;
    }

    /**
     *  arrayGenre()
     *
     *  get unique array string with prop "genre" with help function concat_all, because we have all items that is array
     *  each item have prop genre with type "array", then we need use concat_all for  concat arrays
     */

    get infinitePager(): number {
        return this._infinitePager;
    }

    set infinitePager(value: number) {
        if (this._infinitePager === value) {
            return;
        }
        this._infinitePager = value;
        this.cdr.detectChanges();
    }


    /**
     *  infinitePager use how getter and setter, because we had a problem with the number of updates variable
     *  quick - working solution
     */



    get infinite(): boolean {
        return this._infinite;
    }

    set infinite(value) {
        if (this._infinite === value) {
            return;
        }
        if (!value) {
            this.infinitePager = 10;
        }
        this._infinite = value;
        this.cdr.detectChanges();
    }

    /**
     *
     * when we get "false" we need to reset the infinitePager to zero
     * quick - working solution
     *
     */

    get getRealArray() {
        return this.realCount.value || [];
    }

    get pageLength(): number {
        return this.realCount.paginateCount;
    }

    /**
     * getRealArray and pageLength - getters
     * get the value from the object realCount
     *
     */


    getPageLength(array?: any[]): number {
        return Math.ceil((array || this.getRealArray).length / this.pager);
    }

    /**
     * getPageLength()
     * function performs receiving the current number of pages for pagination
     *
     */

    get isPaginate(): boolean {
        return !this.infinite && this.realCount.paginateCount > 0;
    }

    /**
     * getter
     * check if we will show pagination
     * when we show pagination:
     * 1) when there are elements
     * 1) when inactive endless scroll
     *
     */

    constructor(
        @Inject(ListsService) private lService: ListsService,
        @Inject(OrdersService) private OService: OrdersService,
        private cdr: ChangeDetectorRef) {
        super();
    }

    changePagination({item, pager}: ChangeDataPagination): void {
        if (item) {
            this.active = item;
        }
        if (pager) {
            this.pager = pager;
        }
    }

    /**
     *
     * changePagination()
     *
     * the function is triggered by any change in the number of elements on the page, and changes in the current page
     *
     */

    get getData(): Observable<any> {
        return this.dataSource.pipe(
            map((array: MovieModel[]) => {
                return this.PIPE(
                    [...array],
                    (item: MovieModel[]): MovieModel[] =>
                        this.OService.search(item, this.searchStr, 'name'),
                    (item: MovieModel[]): MovieModel[] =>
                        this.OService.search(item, this.searchNetwork, 'network'),
                    (item: MovieModel[]): MovieModel[] =>
                        this.OService.search(item, this.searchDate, 'date'),
                    (item: MovieModel[]): MovieModel[] =>
                        this.OService.search(item, this.searchGenre, 'genre'),
                    (item: MovieModel[]): MovieModel[] => this.sort(item),
                    (item: MovieModel[]): MovieModel[] => this.dateReformat(item),
                    (item: MovieModel[]): MovieModel[] => this.pagination(item)
                );
            }),
            tap(() => this.lService.setUniqueGenre())
        );
    }

    /**
     *
     * getData()
     *
     * which does everything: retrieve, sort, filter, and paginate elements
     *
     */

    pagination(array: MovieModel[]): MovieModel[] {
        const start = array.length > this.pager ? this.pager * (this.active - 1) : 0;
        const end = this.infinite ? this.infinitePager : this.pager;
        const items = [...array];
        this.realCount.value = array;
        this.realCount.paginateCount = this.getPageLength(array);
        return items.splice(this.infinite ? 0 : start, end);
    }

    /**
     *
     * pagination()
     *
     * paginator, performs the function of displaying elements
     *
     * if we work with pagination, that is, endless scrolling is disabled, then we get data
     * on 1 page for a certain number of elements that we can show
     *
     * if there is an endless scroll, then we show from 0 to the desired number of pages
     *
     * and set sorting element realCount.value and realCount.paginateCount - real page count
     * and elements which we can show
     *
     */

    dateReformat(array: MovieModel[]): MovieModel[] {
        return array.map((item: MovieModel) => new MovieModel({
            ...item,
            date: new Date(parseInt(item.date as string))
        }));
    }

    /**
     *
     * dateReformat()
     *
     * function is optional, it is used to translate the date in second form, into the normal form of the Date object
     *
     */

    sort(array: MovieModel[]): MovieModel[] {
        if (this.orderBy.field) {
            return this.orderByFunc(array);
        } else {
            return array;
        }
    }


    orderByFunc(array: MovieModel[]): MovieModel[] {
        switch (this.orderBy.way) {
            case ASC:
                return this.OService.orderByFunction(array, this.orderBy.field, ASC);
            case DESC:
                return this.OService.orderByFunction(array, this.orderBy.field, DESC);
            default:
                return array;
        }
    }

    /**
     *
     * orderByFunc()
     *
     * if the field by which you want to sort and the sortable type ASC or DESC is set, then the sorting will be carried out
     *
     */
}
