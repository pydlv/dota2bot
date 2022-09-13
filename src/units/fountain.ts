import {Unit} from "./units";
import {Team} from "../team/team";
import {EnumTeam} from "../team/enumTeam";

export class Fountain extends Unit<Fountain>() {
    team: Team;

    protected constructor(hUnit: hUnit) {
        super(hUnit);

        this.team = Team.fromDotaTeam(hUnit.GetTeam());
    }

    static createInstance(hUnit: hUnit) {
        return new Fountain(hUnit);
    }

    static populate() {
        GetUnitList(UNIT_LIST_ALLIED_BUILDINGS)
            .filter(hUnit => hUnit.HasModifier("modifier_fountain_aura"))
            .map(hUnit => this.getInstance(hUnit));
    }

    static getFountainForTeam(enumTeam: EnumTeam) {
        return Fountain.all()
            .filter(fountain => fountain.team.matchTeam(enumTeam))
            .shift()!;
    }
}
