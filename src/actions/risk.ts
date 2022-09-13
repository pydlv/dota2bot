import {Hero} from "../units/hero";
import {Tower} from "../units/tower";
import {Minion} from "../units/minion";
import {respawnTimes} from "../misc/respawn_times";

const TOWER_ATTACK_RANGE = 700;
const ESTIMATED_TOWER_DAMAGE_MULTIPLIER = 2;

const MINION_ESTIMATED_DAMAGE_MULTIPLIER = 1;

const PENALTY_PER_SECOND_DEAD = 15;

function calculateDeathCost(hero: Hero) {
    const respawnTime = respawnTimes.get(hero.level)!;
    const avgBounty = (hero.hUnit.GetBountyGoldMin() + hero.hUnit.GetBountyGoldMax()) / 2;
    return respawnTime * PENALTY_PER_SECOND_DEAD + avgBounty;
}

export function calcHealthCost(hero: Hero, damage: number) {
    const health = hero.hUnit.GetHealth();

    const deathCost = calculateDeathCost(hero);

    const percentOfHealthRemaining = Math.min(damage / health, 1);

    return percentOfHealthRemaining * deathCost;
}

function calcCostFromTower(hero: Hero, pos: vector, willAgroBuildings: boolean) {
    let resultCost = 0;

    const closestTowers = Tower.getClosestTowers(pos, hero.team.otherTeam());

    const towersInAttackRange = closestTowers.filter(result => result.distance <= TOWER_ATTACK_RANGE ||
        result.item.getAttackTarget() === hero.hUnit);


    for (const tower of towersInAttackRange) {
        const towerTarget = tower.item.getAttackTarget();

        let wouldAttackHero = towerTarget === hero.hUnit || willAgroBuildings;

        // The tower is not already attacking the hero, so check if it would attack the hero if we entered its range
        if (!wouldAttackHero) {
            const minionsInTowerRange = Minion.all()
                .filter(unit => unit.team.matchTeam(hero.team.enumTeam))
                .filter(unit => GetUnitToUnitDistance(tower.item.hUnit, unit.hUnit) <= TOWER_ATTACK_RANGE);

            if (minionsInTowerRange.length === 0) {
                wouldAttackHero = true;
            }
        }

        if (wouldAttackHero) {
            if (tower.item.isVisible()) {
                const estimatedTowerDamage = tower.item.hUnit.GetEstimatedDamageToTarget(true,
                    hero.hUnit,
                    1,
                    DAMAGE_TYPE_ALL
                ) * ESTIMATED_TOWER_DAMAGE_MULTIPLIER;

                resultCost += calcHealthCost(hero, estimatedTowerDamage);
            } else {
                const estimatedTowerDamage = 200 * ESTIMATED_TOWER_DAMAGE_MULTIPLIER;
                resultCost += calcHealthCost(hero, estimatedTowerDamage);
            }
        }
    }

    return resultCost;
}

function calcCostFromMinions(hero: Hero) {
    const minions = Minion.getNearby(hero.hUnit.GetLocation())
        .filter(min => min.team.matchTeam(hero.team.otherTeam().enumTeam))
        .filter(min => min.getAttackTarget() === hero.hUnit);

    let estimatedDamage = 0;

    for (const minion of minions) {
        estimatedDamage += minion.hUnit.GetEstimatedDamageToTarget(true,
            hero.hUnit,
            1,
            DAMAGE_TYPE_ALL) * MINION_ESTIMATED_DAMAGE_MULTIPLIER;
    }

    return calcHealthCost(hero, estimatedDamage);
}

export function calculateRiskCost(hero: Hero, pos: vector, willAgroBuildings: boolean) {
    let result = 0;

    result += calcCostFromTower(hero, pos, willAgroBuildings);
    result += calcCostFromMinions(hero);

    return result;
}
