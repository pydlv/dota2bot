import {generateActions} from "./actions/actions";
import {Hero} from "./units/hero";
import {reloadUnits} from "./units/unit_types";
import {dotaTeamToEnumTeam} from "./team/enumTeam";
import {Team} from "./team/team";
import {Lane} from "./lane";
import {debugTick} from "./dota_debug";
import {addTowersAsAvoidanceZones, resetAvoidanceZones} from "./actions/pathfind";
import {Fountain} from "./units/fountain";

export default function tick() {
    // Should clear out old states
    Team.setCurrentTeam(Team.fromEnumTeam(dotaTeamToEnumTeam(GetTeam())));
    reloadUnits();
    Fountain.populate();
    Lane.reset();

    // resetAvoidanceZones();
    // addTowersAsAvoidanceZones();

    debugTick();
    const hero = Hero.getInstance(GetBot());

    const actions = generateActions(hero);

    if (actions.length > 0) {
        const bestAction = actions[0]!;

        if (bestAction.ev! < 0) {
            console.log("Taking action with negative ev");
        }

        bestAction.execute();
    }
}
