import {Team} from "../team/team";
import {Tower} from "../units/tower";
import {Path} from "./path";

const TOWER_RADIUS = 725;

export function resetAvoidanceZones() {
    const zones = GetAvoidanceZones();

    for (const zone of zones) {
        RemoveAvoidanceZone(zone);
    }
}

export function addTowersAsAvoidanceZones() {
    const ourTeam = Team.currentTeam;
    const enemyTeam = ourTeam.otherTeam();

    const enemyTowers = Tower.all().filter(tower => tower.team.matchTeam(enemyTeam.enumTeam));

    for (const tower of enemyTowers) {
        // console.log("Adding avoidance zone!");
        const {x, y} = tower.hUnit.GetLocation();
        AddAvoidanceZone(tower.hUnit.GetLocation(), TOWER_RADIUS);
    }
}

interface GeneratePathResult {
    distance: number,
    waypoints: vector[]
}

export async function pathfind(start: vector, end: vector): Promise<Path> {
    const promise: Promise<GeneratePathResult> = new Promise(() => {
        GeneratePath(start, end, [], (distance: number, waypoints: vector[]) => {
            Promise.resolve({
                distance,
                waypoints
            });
        });
    });

    const result = await promise;

    const path = new Path();

    let previous = start;

    for (const waypoint of result.waypoints) {
        path.addSegment(previous, waypoint);
        previous = waypoint;
    }

    return path;
}
