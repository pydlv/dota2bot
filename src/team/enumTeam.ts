export enum EnumTeam {
    Radiant = 1,
    Dire = 2,
    All = Radiant & Dire
}

export function dotaTeamToEnumTeam(dotaTeam: DotaTeam) {
    if (dotaTeam === TEAM_RADIANT) {
        return EnumTeam.Radiant;
    }

    return EnumTeam.Dire;
}
