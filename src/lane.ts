import {Minion} from "./units/minion";
import {Hero} from "./units/hero";

// The maximum distance a unit can be from the front for it to be considered part of it.
const UNIT_FRONT_DISTANCE = 1000;

export class Lane {
    protected static instances: Map<DotaLane, Lane> = new Map();

    static reset() {
        this.instances = new Map();
        this.getLane(LANE_TOP);
        this.getLane(LANE_MID);
        this.getLane(LANE_BOT);
    }

    static get lanes() {
        return Array.from(Lane.instances.values());
    }

    static getLane(dotaLane: DotaLane) {
        const result = Lane.instances.get(dotaLane);

        if (result === undefined) {
            const newInstance = new Lane(dotaLane);
            Lane.instances.set(dotaLane, newInstance);
            return newInstance;
        }

        return result;
    }

    dotaLane: DotaLane;
    frontAmount: number;
    frontPos: vector;

    allyFrontMinions: Minion[];
    enemyFrontMinions: Minion[];

    allyFrontHeroes: Hero[];
    enemyFrontHeroes: Hero[];

    protected constructor(dotaLane: DotaLane) {
        this.dotaLane = dotaLane;

        this.frontAmount = GetLaneFrontAmount(GetTeam(), dotaLane, false);
        this.frontPos = GetLocationAlongLane(dotaLane, this.frontAmount);

        this.enemyFrontMinions = GetUnitList(UNIT_LIST_ENEMY_CREEPS)
            .map(hUnit => Minion.getInstance(hUnit))
            .filter(minion => GetUnitToLocationDistance(minion.hUnit, this.frontPos) <= UNIT_FRONT_DISTANCE);

        this.allyFrontMinions = GetUnitList(UNIT_LIST_ALLIED_CREEPS)
            .map(hUnit => Minion.getInstance(hUnit))
            .filter(minion => GetUnitToLocationDistance(minion.hUnit, this.frontPos) <= UNIT_FRONT_DISTANCE);

        this.enemyFrontHeroes = GetUnitList(UNIT_LIST_ENEMY_HEROES)
            .map(hUnit => Hero.getInstance(hUnit))
            .filter(hero => GetUnitToLocationDistance(hero.hUnit, this.frontPos) <= UNIT_FRONT_DISTANCE);

        this.allyFrontHeroes = GetUnitList(UNIT_LIST_ALLIED_HEROES)
            .map(hUnit => Hero.getInstance(hUnit))
            .filter(hero => GetUnitToLocationDistance(hero.hUnit, this.frontPos) <= UNIT_FRONT_DISTANCE);
    }
}
