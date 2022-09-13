import {Unit} from "./units";
import {Team} from "../team/team";

export interface Minion {
    health: number,
    hUnit: hUnit
}

export class Minion extends Unit<Minion>() {
    team: Team;

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
        this.team = Team.fromDotaTeam(hUnit.GetTeam());
    }
}
