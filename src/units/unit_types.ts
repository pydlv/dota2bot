import {Tower} from "./tower";
import {Minion} from "./minion";
import {Hero} from "./hero";

export const UNIT_TYPES = [
    Tower,
    Minion,
    Hero
];

export function clearUnits() {
    for (const unitType of UNIT_TYPES) {
        unitType.clearInstances();
    }
}

export function reloadUnits() {
    clearUnits();

    for (const unitType of UNIT_TYPES) {
        unitType.populate();
    }
}
