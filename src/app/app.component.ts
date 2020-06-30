import { Component } from '@angular/core';
import { map } from "rxjs/operators";
import { ListsService } from "./_services/lists.service";
import {ChangeDataPagination} from "./modules/PaginateModule/interface/interface";
import {Observable} from "rxjs";
import {MovieModel} from "./models/main.models";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    dataSource = this.service.getData();

    constructor(
        private service: ListsService
    ){}

    active = 1;
    pager = 5;

    orderBy = {
        field: '',
        way: ''
    }

    searchStr = ''
    searchNetwork = ''
    searchDate = ''

    changePagination({item, pager}: ChangeDataPagination){
        item && (this.active = item)
        pager && (this.pager = pager)
    }

    get getData(): Observable<MovieModel[]>{
        return this.dataSource.pipe(
            map((array:MovieModel[]) => {
                return this.PIPE(
                    [...array],
                    (item: MovieModel[]): MovieModel[] => this.search(item, this.searchStr, 'name'),
                    (item: MovieModel[]): MovieModel[] => this.search(item, this.searchNetwork, 'network'),
                    (item: MovieModel[]): MovieModel[] => this.search(item, this.searchDate, 'date'),
                    (item: MovieModel[]): MovieModel[] => this.sort(item),
                    (item: MovieModel[]): MovieModel[] => this.dateReformat(item),
                    (item: MovieModel[]): MovieModel[] => {
                        const start = item.length > this.pager ? this.pager * (this.active - 1)  : 0;
                        return [...item].splice(start , this.pager);
                    }
                )
            })
        )
    }

    dateReformat(array: MovieModel[]): MovieModel[]{
        return array.map((item:MovieModel) => new MovieModel({
            ...item,
            date: new Date(parseInt(item.date as string))
        }))
    }

    PIPE = (...items: any[]): any => {
        let state:any[] = []
        if(Array.isArray(items)){
            for(let item of items){
                state = typeof item === 'function' ? item(state) : item;
            }
        }
        return state;
    }

    sort(array){
        if(this.orderBy.field){
            return this.orderByFunc(array);
        } else {
            return array;
        }
    }

    orderByFunc(array){
        switch (this.orderBy.way) {
            case 'ASC': return this.orderByAsc(array, this.orderBy.field);
            case 'DESC': return this.orderByDesc(array, this.orderBy.field);
            default: return array;
        }
    }

    search(array, text = '', byOneField = '') {
        if(!text) {
            return array
        }
        if(byOneField) {
            return array.filter(i => i[byOneField] && i[byOneField].includes && i[byOneField].includes(text));
        }
        return array.filter(i =>{
            return Object.values(i).find((i:any) => i.includes && i.includes(text))
        })
    }

    isDate(d){
        return new Date(parseInt(d)) === 'Invalid Date'
    }

    orderByAsc = (array, field: string) => {
        return array.sort((a, b) => {
            if(a[field]){
                return this.isDate(a[field])
                    ? a[field].localeCompare && a[field].localeCompare(b[field])
                    : Number(a[field]) - Number(b[field])
            }
        });
    }
    orderByDesc = (array, field) => {
        return array.sort((a, b) => {
            if(a[field]){
                return this.isDate(a[field])
                    ?  b[field].localeCompare && b[field].localeCompare(a[field])
                    : Number(b[field]) - Number(a[field])
            }
        });
    }

    get pageLength(){
        return 2// Math.ceil(this.dataSource.value.length / this.pager)
    }

    get arrayNetwork () {
        return new Set([...this.dataSource.value].map(i => i.network))
    }

    get arrayDate () {
        return new Set([...this.dataSource.value].map(i => i.date))
    }

}
