import {Hero} from "../units/hero";
import {Item} from "../items";
import {pathfind} from "./pathfind";
import {Path} from "./path";

function drawLine(start: vector, end: vector) {
    DebugDrawLine(start, end, 255, 0, 0);
}

function drawPath(path: Path) {
    for (const node of path.walk()) {
        drawLine(node.start, node.end);
    }
}

export function moveDirect(hero: Hero, pos: vector) {
    drawLine(hero.hUnit.GetLocation(), pos);

    hero.hUnit.Action_MoveToLocation(pos);
}

export function moveWithPathfind(hero: Hero, end: vector) {
    const path = pathfind(hero.hUnit.GetLocation(), end);
    path.then((path) => {
        drawPath(path);

        const segment = path.first();

        hero.hUnit.Action_MoveToLocation(segment.end);
    })
}

export function moveUsingItem(hero: Hero, item: Item, path: Path) {
    drawPath(path);

    const segment = path.first();
    hero.hUnit.Action_UseAbilityOnLocation(item.hItem, segment.end);
}
