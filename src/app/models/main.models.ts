
export class MovieModel {
    constructor(init?: Partial<MovieModel>) {
        Object.assign(this, init);
    }
    name: string;
    season: number;
    network: string;
    date: number | string | Date;
}
