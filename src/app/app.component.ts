import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import { map } from "rxjs/operators";
import { ChangeDataPagination } from "./modules/PaginateModule/interface/interface";
import { BehaviorSubject, Observable } from "rxjs";
import { MovieModel, OrderBy } from "./models/main.models";
import { AppComponentHelper } from "./component-helper/app.component.helper";
import { ASC, DESC } from "./consts/const";
import { ListsService } from "./_services/lists.service";
import { OrdersService } from "./_services/orders.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent extends AppComponentHelper<any> {
    dataSource: BehaviorSubject<MovieModel[]> = this.lService.getData();

    active: number = 1;
    _infinitePager: number = 10;
    get infinitePager(): number{
        return this._infinitePager
    }
    set infinitePager(value: number){
        if(this._infinitePager === value) {
            return;
        }
        this._infinitePager = value;
        this.cdr.detectChanges();
    }

    _infinite: boolean = false;
    get infinite(): boolean{
        return this._infinite
    }

    set infinite(value){
        if(!value) {
            this.infinitePager = 10
            return;
        }
        this._infinite = value;
    }

    pager: number = 5;

    orderBy: OrderBy = {
        field: '',
        way: ''
    };

    searchStr: string = '';
    searchNetwork: string = '';
    searchDate: string = '';
    searchGenre: string = '';

    get pageLength(): number {
        return Math.ceil(this.dataSource.value.length / this.pager);
    }

    get arrayNetwork(): object {
        return new Set([...this.dataSource.value].map(i => i.network));
    }

    get arrayDate(): object {
        return new Set([...this.dataSource.value].map(i => i.date));
    }

    get arrayGenre(): object {
        return new Set(
            this.CONCAT_ALL(
                [...this.dataSource.value].map(i => i.genre)
            )
        );
    }

    constructor(
        @Inject(ListsService) private lService: ListsService,
        @Inject(OrdersService) private OService: OrdersService,
        private cdr: ChangeDetectorRef) {
        super();
    }

    changePagination({item, pager}: ChangeDataPagination) {
        item && (this.active = item);
        pager && (this.pager = pager);
    }

    get getData(): Observable<MovieModel[]> {
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
            })
        );
    }

    pagination(array: MovieModel[]): MovieModel[] {
        const start = array.length > this.pager ? this.pager * (this.active - 1) : 0;
        const end = this.infinite ? this.infinitePager : this.pager;
        return [...array].splice(start, end);
    }

    dateReformat(array: MovieModel[]): MovieModel[] {
        return array.map((item: MovieModel) => new MovieModel({
            ...item,
            date: new Date(parseInt(item.date as string))
        }));
    }

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
}
