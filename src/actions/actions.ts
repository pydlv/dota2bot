import {Hero} from "../units/hero";
import {ClearWaveAction} from "./clear_wave";
import {Lane} from "../lane";

export interface Action {
    ev: number,
    timeCost: number,
    hero: Hero,
    execute: () => void
}

function score(action: Action) {
    return action.ev / action.timeCost;
}

export function generateActions(hero: Hero) {
    const actions = [];

    for (const lane of Lane.lanes) {
        actions.push(new ClearWaveAction(lane, hero));
    }

    // Sort actions by score descending
    actions.sort((a, b) => score(b) - score(a));

    return actions;
}
