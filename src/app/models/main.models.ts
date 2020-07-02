import { staticTColl, staticTCollDate } from "../modules/TableModule/interface-type/type";

export class MovieModel {
    constructor(init?: Partial<MovieModel>) {
        Object.assign(this, init);
    }
    name: staticTColl;
    season: staticTCollDate;
    network: staticTColl;
    date: staticTCollDate;
    genre: staticTColl[];
}

export interface OrderBy {
    field: string;
    way: string;
}
