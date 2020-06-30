import {staticTColl, staticTCollDate} from "./type";

export class TableChildConfig {
    constructor(init?: Partial<TableChildConfig>) {
        Object.assign(this, init);
    }
    cellProp: staticTColl;
    cellName: staticTColl;
    filter: staticTColl;
    order: staticTColl;
    date: staticTCollDate
}
