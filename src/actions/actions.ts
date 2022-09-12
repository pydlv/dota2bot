import {Hero} from "../units/hero";
import {Lane} from "../lane";
import {ClearWaveAction} from "./clear_wave";

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

    const lanes = [
        new Lane(LANE_TOP),
        new Lane(LANE_MID),
        new Lane(LANE_BOT)
    ];

    for (const lane of lanes) {
        actions.push(new ClearWaveAction(lane, hero));
    }

    // Sort actions by score descending
    actions.sort((a, b) => score(b) - score(a));

    return actions;
}
