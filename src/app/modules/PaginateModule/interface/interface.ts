export class ChangeDataPagination {
    constructor(init?: Partial<ChangeDataPagination>) {
        Object.assign(this, init);
    }
    item: number
    pager?: number
}
