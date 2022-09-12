import {Minion} from "./units/minion";
import {Hero} from "./units/hero";

// The maximum distance a unit can be from the front for it to be considered part of it.
const UNIT_FRONT_DISTANCE = 1000;

export class Lane {
    dotaLane: DotaLane;
    frontAmount: number;
    frontPos: vector;

    allyFrontMinions: Minion[];
    enemyFrontMinions: Minion[];

    allyFrontHeroes: Hero[];
    enemyFrontHeroes: Hero[];

    constructor(dotaLane: DotaLane) {
        this.dotaLane = dotaLane;

        this.frontAmount = GetLaneFrontAmount(GetTeam(), dotaLane, false);
        this.frontPos = GetLocationAlongLane(dotaLane, this.frontAmount);

        this.enemyFrontMinions = GetUnitList(UNIT_LIST_ENEMY_CREEPS)
            .map(hUnit => new Minion(hUnit))
            .filter(minion => GetUnitToLocationDistance(minion.hUnit, this.frontPos) <= UNIT_FRONT_DISTANCE);

        this.allyFrontMinions = GetUnitList(UNIT_LIST_ALLIED_CREEPS)
            .map(hUnit => new Minion(hUnit))
            .filter(minion => GetUnitToLocationDistance(minion.hUnit, this.frontPos) <= UNIT_FRONT_DISTANCE);

        this.enemyFrontHeroes = GetUnitList(UNIT_LIST_ENEMY_HEROES)
            .map(hUnit => new Hero(hUnit))
            .filter(hero => GetUnitToLocationDistance(hero.hUnit, this.frontPos) <= UNIT_FRONT_DISTANCE);

        this.allyFrontHeroes = GetUnitList(UNIT_LIST_ALLIED_HEROES)
            .map(hUnit => new Hero(hUnit))
            .filter(hero => GetUnitToLocationDistance(hero.hUnit, this.frontPos) <= UNIT_FRONT_DISTANCE);
    }
}
