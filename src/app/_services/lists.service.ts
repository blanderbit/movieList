import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class ListsService {
    state$ = new BehaviorSubject([
        {name: 'Test', season: 4, network: 'TV5', date: new Date(1998, 2, 10).getTime().toString()},
        {name: 'Test2', season: 3, network: 'SSB', date: new Date(1994, 5, 10).getTime().toString()},
        {name: 'delta 1', season: 1, network: 'OOP', date: new Date(2000, 8, 10).getTime().toString()},
        {name: 'Next ', season: 5, network: 'TV5', date: new Date(2017, 12, 10).getTime().toString()},
        {name: 'Hi', season: 7, network: 'NNE', date: new Date(2018, 2, 11).getTime().toString()},
    ])
    
    getData(): BehaviorSubject<any[]>{
        return this.state$
    }
}
