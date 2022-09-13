import {dotaTeamToEnumTeam, EnumTeam} from "./enumTeam";

export class Team {
    static dire = new Team(EnumTeam.Dire);
    static radiant = new Team(EnumTeam.Radiant);

    protected static _currentTeam: Team;

    static get currentTeam() {
        return Team._currentTeam;
    }

    static fromEnumTeam(enumTeam: EnumTeam) {
        if (enumTeam === EnumTeam.Radiant) {
            return Team.radiant;
        } else if (enumTeam === EnumTeam.Dire) {
            return Team.dire;
        }

        throw "Value error";
    }

    static fromDotaTeam(dotaTeam: DotaTeam) {
        return Team.fromEnumTeam(dotaTeamToEnumTeam(dotaTeam));
    }

    static setCurrentTeam(team: Team) {
        Team._currentTeam = team;
    }

    enumTeam: EnumTeam;

    constructor(enumTeam: EnumTeam) {
        this.enumTeam = enumTeam;
    }

    matchTeam(other: EnumTeam) {
        if (this.enumTeam === other) {
            return true;
        } else {
            return this.enumTeam === EnumTeam.All;
        }
    }

    otherTeam() {
        if (this.enumTeam === EnumTeam.Radiant) {
            return Team.dire;
        } else if (this.enumTeam === EnumTeam.Dire) {
            return Team.radiant;
        } else {
            throw "Invalid team value";
        }
    }
}
