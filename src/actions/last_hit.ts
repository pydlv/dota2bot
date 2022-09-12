import {Action} from "./actions";
import {Hero} from "../units/hero";
import {Minion} from "../units/minion";

class LastHitAction implements Action {
    ev: number;
    timeCost: number;
    hero: Hero;

    constructor(target: Minion, hero: Hero) {
        this.ev = 0;
        this.timeCost = 0;
        this.hero = hero;
        // TODO: implement this
    }

    execute(): void {
    }


}
