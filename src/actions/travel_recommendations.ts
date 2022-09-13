import {Hero} from "../units/hero";
import {Team} from "../team/team";
import {Path} from "./path";
import {moveDirect, moveUsingItem} from "./movement";

export enum TransportMode {
    Walk,
    Teleport
}

export interface TravelRecommendation {
    mode: TransportMode,
    distance: number,
    targetBuilding?: hUnit  // Building to teleport to if we go that route.
}

export function getTravelRecommendation(hero: Hero, pos: vector, canTeleport: boolean): TravelRecommendation {
    const walkingDistance = GetUnitToLocationDistance(hero.hUnit, pos);

    if (canTeleport) {
        const closestBuilding = getClosestTeleportLocation(hero, pos);
        const teleportDistance = GetUnitToLocationDistance(closestBuilding, pos);

        if (teleportDistance < walkingDistance) {
            return {
                mode: TransportMode.Teleport,
                distance: teleportDistance,
                targetBuilding: closestBuilding
            }
        }
    }

    return {
        mode: TransportMode.Walk,
        distance: walkingDistance
    }
}

export function getClosestTeleportLocation(hero: Hero, pos: vector) {
    // TODO: implement boots of travel, etc.
    const alliedBuildings = GetUnitList(hero.team === Team.currentTeam ?
        UNIT_LIST_ALLIED_BUILDINGS : UNIT_LIST_ENEMY_BUILDINGS);

    alliedBuildings.sort((a, b) =>
        GetUnitToLocationDistance(a, pos) - GetUnitToLocationDistance(b, pos)
    );

    return alliedBuildings[0]!;
}

export interface DistanceResult<T> {
    item: T,
    distance: number
}

export function executeTravelRecommendation(hero: Hero, recommendation: TravelRecommendation, destination: vector) {
    if (recommendation.mode === TransportMode.Teleport) {
        const tpScroll = hero.getItemByName("item_tpscroll");

        if (tpScroll) {
            const path = new Path();
            const buildingLocation = recommendation.targetBuilding!.GetLocation()
            path.addSegment(hero.hUnit.GetLocation(), buildingLocation);
            path.addSegment(buildingLocation, destination);

            moveUsingItem(hero, tpScroll, path);
        } else {
            console.error("Tried to teleport when there was no tp scroll equipped.");
        }
    } else {
        moveDirect(hero, destination);
    }
}
