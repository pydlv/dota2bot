import {debugTick} from "./dota_debug";
import {generateActions} from "./actions/actions";
import {Hero} from "./units/hero";

export default function tick() {
    // debugTick();

    const hero = new Hero(GetBot());

    const actions = generateActions(hero);

    if (actions.length > 0) {
        const bestAction = actions[0]!;

        bestAction.execute();
    }
}
