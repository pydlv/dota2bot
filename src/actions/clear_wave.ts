import {Hero} from "../units/hero";
import {Action} from "./actions";
import {Lane} from "../lane";
import {getTravelRecommendation, TransportMode, TravelRecommendation} from "../util";
import {Tower} from "../units/tower";

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

    constructor(lane: Lane, hero: Hero) {
        this.lane = lane;
        this.hero = hero;

        this.ev = lane.enemyFrontMinions.length * EV_PER_CREEP /
            ((lane.allyFrontHeroes.length + 1) * ALLIED_HERO_ALREADY_IN_LANE_PENALTY_MULTIPLIER);

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

    calcProbableHealthLoss() {
        const closestTowers = Tower.getClosestTowers(this.hero, this.hero.team);

        if (closestTowers.length > 0) {
            const closestTower = closestTowers[0]!;


        }
    }

    execute(): void {
        if (this.isInPosition) {
            // We are in the correct position, clear the creeps
            // Find the closest creep and attack if we aren't already in the middle of an attack.
            if (this.hero.isAttacking) return;

            const enemyLaneCreeps = this.lane.enemyFrontMinions;
            if (enemyLaneCreeps.length > 0) {
                const creepToAttack = enemyLaneCreeps[0]!;
                this.hero.hUnit.Action_AttackUnit(creepToAttack.hUnit, true);
                return;
            } else {
                console.warn("Expected to find enemy creeps in lane but didn't.");
            }
        } else {
            if (this.travelRecommendation!.mode === TransportMode.Teleport) {
                const tpScroll = this.hero.getItemByName("item_tpscroll");

                if (tpScroll) {
                    this.hero.hUnit.Action_UseAbilityOnLocation(tpScroll.hItem, this.lane.frontPos);
                } else {
                    console.error("Tried to teleport when there was no tp scroll equipped.");
                }
            } else {
                this.hero.hUnit.Action_MoveToLocation(this.lane.frontPos);
            }
        }
    }
}
