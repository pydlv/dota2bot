import {Action} from "./actions";
import {Hero} from "../units/hero";
import {Fountain} from "../units/fountain";
import {moveDirect, moveWithPathfind} from "./movement";

export class RunToSafetyAction implements Action {
    ev: number;
    hero: Hero;
    timeCost: number;

    constructor(hero: Hero) {
        this.hero = hero;

        this.ev = 0;
        this.timeCost = 1;
    }

    execute(): void {
        const fountain = Fountain.getFountainForTeam(this.hero.team.enumTeam);

        moveDirect(this.hero, fountain.hUnit.GetLocation());
    }

    isPossible: boolean = true;
}
