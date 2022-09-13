/** @noSelfInFile **/

declare interface hUnit {
    GetUnitName: () => string,
    GetTeam(): DotaTeam;

    IsAlive(): boolean;
    GetHealth(): number;
    GetMaxHealth(): number;
    GetLocation(): vector;
    GetLevel(): number;

    GetBaseMovementSpeed(): number;
    GetOffensivePower(): number;

    GetBountyGoldMin(): number;
    GetBountyGoldMax(): number;

    GetItemInSlot(nInventorySlot: number): hItem;

    GetAttackTarget: () => hUnit,
    GetNearbyTowers: (nRadius: number, bEnemies: boolean) => hUnit[],
    GetNearbyLaneCreeps: (nRadius: number, bEnemies: boolean) => hUnit[],

    Action_AttackUnit: (hUnit: hUnit, bOnce: boolean) => void,

    Action_MoveToLocation(location: vector)

    Action_UseAbilityOnLocation(hItem: hItem, location: vector): void;

    IsTower(): boolean;
    HasModifier(modifierName: string): boolean;

    GetEstimatedDamageToTarget(bCurrentlyAvailable: boolean, target: hUnit, duration: number, damageType: DotaDamageType): number;

    GetAttackRange(): number;
    GetAttackDamage(): number;
}

declare type dotaHUnit = hUnit;

declare interface vector {
    x: number;
    y: number;
    z: number;
}

declare interface hItem {
    GetName(): string;

    IsFullyCastable(): boolean;
}

declare interface AvoidanceZone {
    location: vector,
    ability: any,
    caster: any,
    radius: number
}

declare function GetBot(): hUnit;
declare function GetTeam(): DotaTeam;

declare function GetUnitList(uUnitType: DotaUnitType): hUnit[];

declare function GetUnitToUnitDistance(unit1: hUnit, unit2: hUnit): number;
declare function GetUnitToLocationDistance(hUnit: hUnit, vLocation: vector): number;

declare function GetLaneFrontAmount(team: DotaTeam, lane: DotaLane, bIgnoreTowers: boolean): number;
declare function GetLocationAlongLane(lane: DotaLane, fAmount: number): vector;

declare function RealTime(): number;

declare function DebugDrawLine(vStart: vector, vEnd: vector, nRed: number, nBlue: number, nGreen: number): void;

declare function GetAvoidanceZones(): AvoidanceZone[];
declare function RemoveAvoidanceZone(zone: AvoidanceZone): void;
declare function AddAvoidanceZone(pos: vector, radius: number): number;
declare function GeneratePath(start: vector,
                              end: vector,
                              avoidanceZones: AvoidanceZone[],
                              funcCompletion: (distance: number, waypoints: vector[]) => void);

declare function IsLocationVisible(loc: vector): boolean;
