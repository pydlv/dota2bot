import {Unit} from "./units";

export interface Minion {
    health: number,
    hUnit: hUnit
}

export class Minion extends Unit<Minion>() {
    static createInstance(hUnit: hUnit) {
        return new Minion(hUnit);
    }

    static populate() {
        GetUnitList(UNIT_LIST_ENEMY_CREEPS).concat(GetUnitList(UNIT_LIST_ALLIED_CREEPS))
            .map(hUnit => Minion.getInstance(hUnit));
    }

    protected constructor(hUnit: hUnit) {
        super(hUnit);

        this.health = hUnit.GetHealth();
    }
}
