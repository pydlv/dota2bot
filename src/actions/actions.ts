import {Hero} from "../units/hero";
import {ClearWaveAction} from "./clear_wave";
import {Lane} from "../lane";
import {RunToSafetyAction} from "./safety";
import {HitBuildingsAction} from "./hit_buildings";

export interface Action {
    ev: number | null,
    timeCost: number | null,
    hero: Hero,
    isPossible: boolean;
    execute: () => void
}

function score(action: Action) {
    if (action.ev === null || action.timeCost === null) throw "Tried to score null action.";
    return action.ev / Math.max(action.timeCost, 1);
}

export function generateActions(hero: Hero) {
    let actions: Action[] = [];

    if (hero.hUnit.IsAlive()) {
        // Look to clear waves
        for (const lane of Lane.lanes) {
            actions.push(new ClearWaveAction(lane, hero));
        }

        // Look to hit buildings
        actions.push(new HitBuildingsAction(hero));

        // We can run to safety
        actions.push(new RunToSafetyAction(hero));
    }

    // Filter out any actions that aren't possible
    actions = actions.filter(action => action.isPossible);

    // Sort actions by score descending
    actions.sort((a, b) => score(b) - score(a));

    return actions;
}
