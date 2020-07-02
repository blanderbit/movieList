import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {MovieModel} from '../models/main.models';
import {Helper} from '../component-helper/helper';
import {tap} from 'rxjs/operators';
import {BadgeModels} from '../common/badge/interface/interface';


@Injectable()
export class ListsService extends Helper<any> {
    genreWithColor: BadgeModels[] = [];

    state$: BehaviorSubject<MovieModel[]> = new BehaviorSubject([
        {
            name: 'Test',
            season: 4,
            network: 'TV5',
            date: this.getDateAllSec(1998, 2, 10),
            genre: ['horror', 'drama']
        },
        {
            name: 'Test2',
            season: 3,
            network: 'SSB',
            date: this.getDateAllSec(1994, 5, 10),
            genre: ['crime']
        },
        {
            name: 'delta 1',
            season: 1,
            network: 'OOP',
            date: this.getDateAllSec(2000, 8, 10),
            genre: ['tragedy', 'horror', 'drama']
        },
        {
            name: 'Next ',
            season: 5,
            network: 'TV5',
            date: this.getDateAllSec(2017, 12, 10),
            genre: ['comedy', 'horror', 'drama']
        },
        {
            name: 'Hi',
            season: 7,
            network: 'NNE',
            date: this.getDateAllSec(2015, 4, 11),
            genre: ['fantasy', 'horror', 'crime']
        }, {
            name: 'English',
            season: 'Not started yet',
            network: 'BBS',
            date: this.getDateAllSec(2012, 2, 10),
            genre: ['trailer', 'drama']
        },
        {
            name: 'Test2',
            season: 3,
            network: 'SSB',
            date: this.getDateAllSec(2017, 5, 10),
            genre: ['crime']
        },
        {
            name: 'delta 1',
            season: 1,
            network: 'OOP',
            date: this.getDateAllSec(2014, 8, 10),
            genre: ['tragedy', 'horror', 'drama']
        },
        {
            name: 'Next ',
            season: 5,
            network: 'TV5',
            date: this.getDateAllSec(2017, 12, 10),
            genre: ['comedy', 'horror', 'drama']
        },
        {
            name: 'Hi',
            season: 7,
            network: 'NNE',
            date: this.getDateAllSec(2019, 2, 11),
            genre: ['fantasy', 'horror', 'crime']
        }, {
            name: 'ff',
            season: 4,
            network: 'ff',
            date: this.getDateAllSec(1999, 2, 10),
            genre: ['gg', 'ghh']
        },
        {
            name: 'dd',
            season: 3,
            network: 'Netflix',
            date: this.getDateAllSec(1974, 5, 10),
            genre: ['crime']
        },
        {
            name: 'asdfasdf',
            season: 1,
            network: 'Faf',
            date: this.getDateAllSec(2009, 8, 10),
            genre: ['tragedy', 'horror', 'drama']
        },
        {
            name: 'Skcc',
            season: 5,
            network: 'TV5-sport',
            date: this.getDateAllSec(2008, 12, 10),
            genre: ['comedy', 'horror', 'drama']
        },
        {
            name: 'gggg',
            season: 5,
            network: 'hhhhh',
            date: this.getDateAllSec(2007, 12, 10),
            genre: ['comedy', 'horror', 'drama']
        }, {
            name: 'asdfasdf',
            season: 1,
            network: 'Faf',
            date: this.getDateAllSec(2004, 8, 10),
            genre: ['tragedy', 'horror', 'drama']
        },
        {
            name: 'Skcc1',
            season: 5,
            network: 'TV5-sport',
            date: this.getDateAllSec(2004, 12, 10),
            genre: ['comedy', 'horror', 'drama']
        },
        {
            name: 'gggg2',
            season: 5,
            network: 'hhhhh3',
            date: this.getDateAllSec(2005, 12, 10),
            genre: ['comedy', 'horror', 'drama']
        },
        {
            name: 'Skcc555',
            season: 5,
            network: 'TV5-sport',
            date: this.getDateAllSec(2006, 12, 10),
            genre: ['comedy', 'horror', 'drama']
        },
        {
            name: 'gggg666',
            season: 5,
            network: 'hhhhh',
            date: this.getDateAllSec(2006, 11, 10),
            genre: ['comedy', 'horror', 'drama']
        }, {
            name: 'asdfasdf',
            season: 1,
            network: 'Faf',
            date: this.getDateAllSec(2005, 8, 10),
            genre: ['tragedy', 'horror', 'drama']
        },
        {
            name: 'f',
            season: 5,
            network: 'TV5-j',
            date: this.getDateAllSec(2001, 12, 10),
            genre: ['comedy', 'horror', 'drama']
        },
        {
            name: 'hhhhh',
            season: 5,
            network: 'j',
            date: this.getDateAllSec(2002, 12, 10),
            genre: ['comedy', 'horror', 'drama']
        },
        {
            name: 'fr',
            season: 5,
            network: 'yyy-j',
            date: this.getDateAllSec(2011, 12, 10),
            genre: ['comedy', 'horror', 'drama']
        },
        {
            name: 'tt',
            season: 5,
            network: 'yyyyyj',
            date: this.getDateAllSec(2010, 12, 10),
            genre: ['comedy', 'horror', 'drama']
        },
        {
            name: 'mm',
            season: 55,
            network: 'mmm',
            date: this.getDateAllSec(2010, 12, 10),
            genre: ['comedy', 'horror', 'drama']
        },
    ]);

    getData(): BehaviorSubject<any[]>{
        return this.state$;
    }

    get getObsValue(): any[] {
        return this.state$.value || [];
    }

    getUniqueGenre(array?: MovieModel[]): Set<string> {
        const getArrayFromField = this.getDataSourceArray(
            [...(array || this.getObsValue)],
            'genre'
        );

        return new Set(
            this.CONCAT_ALL(getArrayFromField)
        );
    }

    setUniqueGenre(refresh?: boolean): void{
        if (refresh || (this.genreWithColor && !this.genreWithColor.length)) {
            this.genreWithColor = this.getUniqueGenreWithColor(this.getObsValue);
        }
    }

    getUniqueGenreWithColor(array: MovieModel[]): BadgeModels[] {
        return Array.from(this.getUniqueGenre(array)).map(item => new BadgeModels({
            name: item,
            color: this.randColor(),
            id: this.uniqueId()
        }));
    }

    get uniqueGenre(): object {
        return this.getUniqueGenre();
    }

    randColor(): string {
        const r = this.toFloor(256);
        const g = this.toFloor(256);
        const b = this.toFloor(256);
        return `rgba(${r},${g},${b}, 0.5)`;
    }

    toFloor = (count: number): number => Math.floor(Math.random() * (count));
    uniqueId = (): string => Math.random().toString(36).slice(-8);
}
