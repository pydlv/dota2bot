/** @noSelfInFile **/

declare interface hUnit {
    GetUnitName: () => string,
    GetTeam(): DotaTeam;

    GetHealth(): number;

    GetBaseMovementSpeed(): number;
    GetOffensivePower(): number;

    GetItemInSlot(nInventorySlot: number): hItem;

    GetAttackTarget: () => hUnit,
    GetNearbyTowers: (nRadius: number, bEnemies: boolean) => hUnit[],
    GetNearbyLaneCreeps: (nRadius: number, bEnemies: boolean) => hUnit[],

    Action_AttackUnit: (hUnit: hUnit, bOnce: boolean) => void,

    Action_MoveToLocation(location: vector)

    Action_UseAbilityOnLocation(hItem: hItem, location: vector): void;

    IsTower(): boolean;
}

declare type dotaHUnit = hUnit;

declare interface vector {

}

declare interface hItem {
    GetName(): string;

    IsFullyCastable(): boolean;
}

declare function GetBot(): hUnit;
declare function GetTeam(): DotaTeam;

declare function GetUnitList(uUnitType: DotaUnitType): hUnit[];

declare function GetUnitToUnitDistance(unit1: hUnit, unit2: hUnit): number;
declare function GetUnitToLocationDistance(hUnit: hUnit, vLocation: vector): number;

declare function GetLaneFrontAmount(team: DotaTeam, lane: DotaLane, bIgnoreTowers: boolean): number;
declare function GetLocationAlongLane(lane: DotaLane, fAmount: number): vector;

declare function RealTime(): number;
