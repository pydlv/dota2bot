import {Hero} from "./hero";
import {euclideanDistance} from "../util";
import {Unit} from "./units";
import {Team} from "../team/team";
import {DistanceResult} from "../actions/travel_recommendations";

export class Tower extends Unit<Tower>() {
    team: Team;

    static createInstance(hUnit: hUnit) {
        return new Tower(hUnit);
    }

    static populate() {
        GetUnitList(UNIT_LIST_ALLIED_BUILDINGS).concat(GetUnitList(UNIT_LIST_ENEMY_BUILDINGS))
            .filter(hUnit => hUnit.IsTower())
            .map(hUnit => Tower.getInstance(hUnit));
    }

    protected constructor(hUnit: hUnit) {
        super(hUnit);

        this.team = Team.fromDotaTeam(hUnit.GetTeam());
    }

    static getClosestTowers(pos: vector, team: Team) {
        const towers: DistanceResult<Tower>[] = Tower.all().filter(tower => tower.team.matchTeam(team.enumTeam))
            .map(tower => ({
                item: tower,
                distance: euclideanDistance(pos, tower.hUnit.GetLocation())
            }));

        towers.sort((a, b) => a.distance - b.distance);

        return towers;
    }
}
