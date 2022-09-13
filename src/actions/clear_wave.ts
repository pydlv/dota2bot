import {Hero} from "../units/hero";
import {Action} from "./actions";
import {Lane} from "../lane";
import {calculateRiskCost} from "./risk";
import {Minion} from "../units/minion";
import {moveDirect, moveUsingItem} from "./movement";
import {Path} from "./path";
import {
    executeTravelRecommendation,
    getTravelRecommendation,
    TransportMode,
    TravelRecommendation
} from "./travel_recommendations";

const DISTANCE_HERO_IS_IN_POSITION = 1599;
const TIME_REQUIRED_TO_KILL_MULTIPLIER = 1;
const EV_PER_CREEP = 30;
const ALLIED_HERO_ALREADY_IN_LANE_PENALTY_MULTIPLIER = 1;

export class ClearWaveAction implements Action {
    ev: number;
    timeCost: number;
    lane: Lane;
    hero: Hero;
    travelRecommendation: TravelRecommendation | undefined;
    isInPosition: boolean;

    targetCreep: Minion | null;

    constructor(lane: Lane, hero: Hero) {
        this.lane = lane;
        this.hero = hero;

        // Find the target creep
        const enemyLaneCreeps = this.lane.enemyFrontMinions;
        // enemyLaneCreeps.sort((a, b) => GetUnitToUnitDistance(hero.hUnit, a.hUnit) -
        //     GetUnitToUnitDistance(hero.hUnit, b.hUnit));
        const attackDamage = hero.hUnit.GetAttackDamage();
        enemyLaneCreeps.sort((a, b) => {
            if (b.hUnit.GetHealth() <= attackDamage) return 1;
            if (a.hUnit.GetHealth() <= attackDamage) return -1;
            if (b.hUnit.GetHealth() >= a.hUnit.GetHealth()) return 1;
            else return b.hUnit.GetHealth() - a.hUnit.GetHealth();
        });

        if (enemyLaneCreeps.length > 0) {
            this.targetCreep = enemyLaneCreeps[0]!;
        } else {
            this.targetCreep = null;
        }

        // Find the EV
        this.ev = lane.enemyFrontMinions.length * EV_PER_CREEP /
            ((lane.allyFrontHeroes.length + 1) * ALLIED_HERO_ALREADY_IN_LANE_PENALTY_MULTIPLIER);

        if (this.targetCreep !== null) {
            this.ev -= calculateRiskCost(this.hero, this.targetCreep.hUnit.GetLocation(), false);
        } else {
            this.ev -= calculateRiskCost(this.hero, this.lane.frontPos, false);
        }

        // Find the time we need to clear the wave once we're in position
        const waveHealth = lane.enemyFrontMinions.reduce(
            (prev, curr) => prev + curr.health,
            0
        );

        let timeCost = waveHealth / this.hero.offensivePower! * TIME_REQUIRED_TO_KILL_MULTIPLIER;

        const distance = GetUnitToLocationDistance(this.hero.hUnit, this.lane.frontPos);

        this.isInPosition = distance <= DISTANCE_HERO_IS_IN_POSITION;

        if (!this.isInPosition) {
            this.travelRecommendation = getTravelRecommendation(hero, lane.frontPos, hero.canTeleport);

            timeCost += this.travelRecommendation.distance / hero.baseMovementSpeed;
        }

        this.timeCost = timeCost;
    }

    execute(): void {
        if (this.isInPosition) {
            // We are in the correct position, clear the creeps
            // Find the closest creep and attack if we aren't already in the middle of an attack.
            if (this.hero.isAttacking) return;

            if (this.targetCreep) {
                this.hero.hUnit.Action_AttackUnit(this.targetCreep.hUnit, true);
                return;
            }
        } else {
            executeTravelRecommendation(this.hero, this.travelRecommendation!, this.lane.frontPos);
        }
    }

    isPossible: boolean = true;
}
