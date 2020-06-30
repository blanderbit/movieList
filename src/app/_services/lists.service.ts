import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class ListsService {
    state$ = new BehaviorSubject([
        {
            name: 'Test',
            season: 4,
            network: 'TV5',
            date: new Date(1998, 2, 10).getTime().toString(),
            genre: ['horror', 'drama']
        },
        {
            name: 'Test2',
            season: 3,
            network: 'SSB',
            date: new Date(1994, 5, 10).getTime().toString(),
            genre: ['crime']
        },
        {
            name: 'delta 1',
            season: 1,
            network: 'OOP',
            date: new Date(2000, 8, 10).getTime().toString(),
            genre: ['tragedy', 'horror', 'drama']
        },
        {
            name: 'Next ',
            season: 5,
            network: 'TV5',
            date: new Date(2017, 12, 10).getTime().toString(),
            genre: ['comedy', 'horror', 'drama']
        },
        {
            name: 'Hi',
            season: 7,
            network: 'NNE',
            date: new Date(2018, 2, 11).getTime().toString(),
            genre: ['fantasy', 'horror', 'crime']
        },
    ])
    
    getData(): BehaviorSubject<any[]>{
        return this.state$
    }
}
