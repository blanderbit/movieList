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
            date: new Date(2015, 4, 11).getTime().toString(),
            genre: ['fantasy', 'horror', 'crime']
        },{
            name: 'English',
            season: 'Not started yet',
            network: 'BBS',
            date: new Date(2012, 2, 10).getTime().toString(),
            genre: ['trailer', 'drama']
        },
        {
            name: 'Test2',
            season: 3,
            network: 'SSB',
            date: new Date(2017, 5, 10).getTime().toString(),
            genre: ['crime']
        },
        {
            name: 'delta 1',
            season: 1,
            network: 'OOP',
            date: new Date(2014, 8, 10).getTime().toString(),
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
            date: new Date(2019, 2, 11).getTime().toString(),
            genre: ['fantasy', 'horror', 'crime']
        },{
            name: 'ff',
            season: 4,
            network: 'ff',
            date: new Date(1999, 2, 10).getTime().toString(),
            genre: ['gg', 'ghh']
        },
        {
            name: 'dd',
            season: 3,
            network: 'Netflix',
            date: new Date(1974, 5, 10).getTime().toString(),
            genre: ['crime']
        },
        {
            name: 'asdfasdf',
            season: 1,
            network: 'Faf',
            date: new Date(2009, 8, 10).getTime().toString(),
            genre: ['tragedy', 'horror', 'drama']
        },
        {
            name: 'Skcc',
            season: 5,
            network: 'TV5-sport',
            date: new Date(2008, 12, 10).getTime().toString(),
            genre: ['comedy', 'horror', 'drama']
        },
        {
            name: 'gggg',
            season: 5,
            network: 'hhhhh',
            date: new Date(2007, 12, 10).getTime().toString(),
            genre: ['comedy', 'horror', 'drama']
        }, {
            name: 'asdfasdf',
            season: 1,
            network: 'Faf',
            date: new Date(2004, 8, 10).getTime().toString(),
            genre: ['tragedy', 'horror', 'drama']
        },
        {
            name: 'Skcc1',
            season: 5,
            network: 'TV5-sport',
            date: new Date(2004, 12, 10).getTime().toString(),
            genre: ['comedy', 'horror', 'drama']
        },
        {
            name: 'gggg2',
            season: 5,
            network: 'hhhhh3',
            date: new Date(2005, 12, 10).getTime().toString(),
            genre: ['comedy', 'horror', 'drama']
        },
        {
            name: 'Skcc555',
            season: 5,
            network: 'TV5-sport',
            date: new Date(2006, 12, 10).getTime().toString(),
            genre: ['comedy', 'horror', 'drama']
        },
        {
            name: 'gggg666',
            season: 5,
            network: 'hhhhh',
            date: new Date(2006, 11, 10).getTime().toString(),
            genre: ['comedy', 'horror', 'drama']
        }, {
            name: 'asdfasdf',
            season: 1,
            network: 'Faf',
            date: new Date(2005, 8, 10).getTime().toString(),
            genre: ['tragedy', 'horror', 'drama']
        },
        {
            name: 'f',
            season: 5,
            network: 'TV5-j',
            date: new Date(2001, 12, 10).getTime().toString(),
            genre: ['comedy', 'horror', 'drama']
        },
        {
            name: 'hhhhh',
            season: 5,
            network: 'j',
            date: new Date(2002, 12, 10).getTime().toString(),
            genre: ['comedy', 'horror', 'drama']
        },
        {
            name: 'fr',
            season: 5,
            network: 'yyy-j',
            date: new Date(2011, 12, 10).getTime().toString(),
            genre: ['comedy', 'horror', 'drama']
        },
        {
            name: 'tt',
            season: 5,
            network: 'yyyyyj',
            date: new Date(2010, 12, 10).getTime().toString(),
            genre: ['comedy', 'horror', 'drama']
        },
        {
            name: 'mm',
            season: 55,
            network: 'mmm',
            date: new Date(2010, 12, 10).getTime().toString(),
            genre: ['comedy', 'horror', 'drama']
        },
    ]);

    getData(): BehaviorSubject<any[]>{
        return this.state$;
    }
}
