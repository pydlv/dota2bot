import {Action} from "./actions";
import {Hero} from "../units/hero";
import {Tower} from "../units/tower";
import {executeTravelRecommendation, getTravelRecommendation, TravelRecommendation} from "./travel_recommendations";
import {calculateRiskCost} from "./risk";

const EV_PER_BUILDING_HIT = 60;

export class HitBuildingsAction implements Action {
    ev: number | null;
    hero: Hero;
    timeCost: number | null;
    targetBuilding: Tower | undefined;
    isInPosition: boolean | undefined;
    travelRecommendation: TravelRecommendation | undefined;
    isPossible: boolean = true;

    constructor(hero: Hero) {
        this.hero = hero;

        const targetBuilding = Tower
            .getNearby(hero.hUnit.GetLocation())
            .filter(x => x.team.matchTeam(hero.team.otherTeam().enumTeam))
            .shift();

        if (!targetBuilding) {
            this.isPossible = false;
            this.timeCost = null;
            this.ev = null;
            return;
        }

        this.targetBuilding = targetBuilding;

        const pos = targetBuilding.hUnit.GetLocation();

        // ev
        this.ev = EV_PER_BUILDING_HIT;
        this.ev -= calculateRiskCost(hero, pos, true);

        // time
        const distance = GetUnitToLocationDistance(hero.hUnit, pos);
        // const distance = euclideanDistance(hero.hUnit.GetLocation(), pos);
        this.isInPosition = hero.hUnit.GetAttackRange() <= distance;

        if (!this.isInPosition) {
            this.travelRecommendation = getTravelRecommendation(hero, pos, hero.canTeleport);

            this.timeCost = this.travelRecommendation.distance / hero.baseMovementSpeed;
        } else {
            this.timeCost = 0;
        }
    }

    execute(): void {
        if (this.isInPosition) {
            this.hero.hUnit.Action_AttackUnit(this.targetBuilding!.hUnit, true);
        } else {
            executeTravelRecommendation(this.hero, this.travelRecommendation!, this.targetBuilding!.hUnit.GetLocation());
        }
    }
}
