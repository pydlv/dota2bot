export interface Minion {
    health: number,
    hUnit: hUnit
}

export class Minion {
    hUnit: hUnit;
    constructor(hUnit: hUnit) {
        this.hUnit = hUnit;
        this.health = hUnit.GetHealth();
    }
}
