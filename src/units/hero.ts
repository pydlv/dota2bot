import {Item} from "../items";
import {Team} from "../team/team";
import {Unit} from "./units";

export class Hero extends Unit<Hero>() {
    inventory: Item[];
    team: Team;
    baseMovementSpeed: number;
    offensivePower: number | null = null;

    static createInstance(hUnit: hUnit): Hero {
        return new Hero(hUnit);
    }

    static populate() {
        GetUnitList(UNIT_LIST_ENEMY_HEROES).concat(GetUnitList(UNIT_LIST_ALLIED_HEROES))
            .map(hUnit => Hero.getInstance(hUnit));
    }

    protected constructor(hUnit: hUnit) {
        super(hUnit);

        this.team = Team.fromDotaTeam(hUnit.GetTeam());

        if (this.team === Team.currentTeam) {
            this.offensivePower = this.hUnit.GetOffensivePower();
        }

        this.inventory = [];
        for (let i = 0; i <= 16; i++) {
            const hItem = this.hUnit.GetItemInSlot(i);
            if (!!hItem) {
                this.inventory.push({
                    name: hItem.GetName(),
                    hItem
                });
            }
        }

        this.baseMovementSpeed = hUnit.GetBaseMovementSpeed();
    }

    getItemByName(name: string) {
        for (const item of this.inventory) {
            if (item.name === name) {
                return item;
            }
        }
    }

    get canTeleport(): boolean {
        const tp = this.getItemByName("item_tpscroll");

        return !!tp && tp.hItem.IsFullyCastable();
    }

    get isAttacking(): boolean {
        return !!this.hUnit.GetAttackTarget();
    }
}
