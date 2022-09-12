import {Item} from "../items";

export class Hero {
    hUnit: hUnit;
    inventory: Item[];
    team: DotaTeam;
    baseMovementSpeed: number;
    offensivePower: number | null = null;

    constructor(hUnit: hUnit) {
        this.hUnit = hUnit;

        this.team = this.hUnit.GetTeam();

        if (this.team === GetTeam()) {
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
