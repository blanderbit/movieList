export class BadgeModels {
    constructor(init?: Partial<BadgeModels>) {
        Object.assign(this, init);
    }
    name: string;
    color: string;
    id: string;
}
