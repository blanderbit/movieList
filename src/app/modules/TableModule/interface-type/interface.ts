import {staticTColl, staticTCollDate} from "./type";
import {TemplateRef} from "@angular/core";

export class TableChildConfig {
    constructor(init?: Partial<TableChildConfig>) {
        Object.assign(this, init);
    }
    cellProp: staticTColl;
    cellName: staticTColl;
    filter: staticTColl;
    order: staticTColl;
    date: staticTCollDate;
    template: staticTColl;
}

export interface ChildRowTemplateInterface {
    nameProps: string;
    ref: TemplateRef<any>;
}
