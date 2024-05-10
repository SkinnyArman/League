/**
 *
 *  THIS IS A TESTING FILE. YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO TEST YOUR WORK.
 *  PLEASE DON´T CHANGE THE INTERFACE OF leagueService.js METHODS
 *
 */

require("jest-fetch-mock").enableMocks();
fetchMock.dontMock();

import LeagueService from "../src/services/LeagueService";

describe("laderboard", () => {
  let leagueService;

  beforeEach(() => {
    leagueService = new LeagueService();
  });

  test("check-leaderboard-teams", async () => {
    const matches = [
      {
        matchDate: Date.now(),
        stadium: "Maracanã",
        homeTeam: "Brazil",
        awayTeam: "France",
        matchPlayed: true,
        homeTeamScore: 2,
        awayTeamScore: 1,
      },
    ];
    leagueService.setMatches(matches);

    const leaderboard = leagueService.getLeaderboard();

    const firstTeam = leaderboard[0];
    expect(firstTeam.teamName).toBe("Brazil");
    expect(firstTeam.matchesPlayed).toBe(1);
    expect(firstTeam.goalsFor).toBe(2);
    expect(firstTeam.goalsAgainst).toBe(1);
    expect(firstTeam.points).toBe(3);

    const secondTeam = leaderboard[1];
    expect(secondTeam.teamName).toBe("France");
    expect(secondTeam.matchesPlayed).toBe(1);
    expect(secondTeam.goalsFor).toBe(1);
    expect(secondTeam.goalsAgainst).toBe(2);
    expect(secondTeam.points).toBe(0);
  });

  test("check leaderboard after a draw", () => {
    leagueService.setMatches([
      {
        matchDate: Date.now(),
        stadium: "National Stadium",
        homeTeam: "Japan",
        awayTeam: "Germany",
        matchPlayed: true,
        homeTeamScore: 2,
        awayTeamScore: 2,
      },
    ]);

    const leaderboard = leagueService.getLeaderboard();

    const japan = leaderboard.find((team) => team.teamName === "Japan");
    expect(japan.teamName).toBe("Japan");
    expect(japan.matchesPlayed).toBe(1);
    expect(japan.goalsFor).toBe(2);
    expect(japan.goalsAgainst).toBe(2);
    expect(japan.points).toBe(1);

    const germany = leaderboard.find((team) => team.teamName === "Germany");
    expect(germany.teamName).toBe("Germany");
    expect(germany.matchesPlayed).toBe(1);
    expect(germany.goalsFor).toBe(2);
    expect(germany.goalsAgainst).toBe(2);
    expect(germany.points).toBe(1);
  });

  test("check leaderboard after two matches (one draw, one win)", () => {
    leagueService.setMatches([
      {
        matchDate: Date.now(),
        stadium: "Estádio do Maracanã",
        homeTeam: "Brazil",
        awayTeam: "Argentina",
        matchPlayed: true,
        homeTeamScore: 3,
        awayTeamScore: 1,
      },
      {
        matchDate: Date.now() + 1000, // Different timestamp
        stadium: "Stade de France",
        homeTeam: "France",
        awayTeam: "Germany",
        matchPlayed: true,
        homeTeamScore: 0,
        awayTeamScore: 0,
      },
    ]);

    const leaderboard = leagueService.getLeaderboard();

    const brazil = leaderboard.find((team) => team.teamName === "Brazil");
    expect(brazil.teamName).toBe("Brazil");
    expect(brazil.matchesPlayed).toBe(1);
    expect(brazil.goalsFor).toBe(3);
    expect(brazil.goalsAgainst).toBe(1);
    expect(brazil.points).toBe(3);

    const argentina = leaderboard.find((team) => team.teamName === "Argentina");
    expect(argentina.teamName).toBe("Argentina");
    expect(argentina.matchesPlayed).toBe(1);
    expect(argentina.goalsFor).toBe(1);
    expect(argentina.goalsAgainst).toBe(3);
    expect(argentina.points).toBe(0);

    const france = leaderboard.find((team) => team.teamName === "France");
    expect(france.teamName).toBe("France");
    expect(france.matchesPlayed).toBe(1);
    expect(france.goalsFor).toBe(0);
    expect(france.goalsAgainst).toBe(0);
    expect(france.points).toBe(1);

    const germany = leaderboard.find((team) => team.teamName === "Germany");
    expect(germany.teamName).toBe("Germany");
    expect(germany.matchesPlayed).toBe(1);
    expect(germany.goalsFor).toBe(0);
    expect(germany.goalsAgainst).toBe(0);
    expect(germany.points).toBe(1);
  });

  test("check leaderboard after six matches with head-to-head tiebreaker between 2 teams", () => {
    leagueService.setMatches([
      // Matches setup
      {
        matchDate: Date.now(),
        stadium: "Maracanã",
        homeTeam: "Brazil",
        awayTeam: "Argentina",
        matchPlayed: true,
        homeTeamScore: 2,
        awayTeamScore: 1,
      },
      {
        matchDate: Date.now() + 1000,
        stadium: "Maracanã",
        homeTeam: "Brazil",
        awayTeam: "Germany",
        matchPlayed: true,
        homeTeamScore: 2,
        awayTeamScore: 2,
      },
      {
        matchDate: Date.now() + 2000,
        stadium: "Olympic Stadium Berlin",
        homeTeam: "Germany",
        awayTeam: "Italy",
        matchPlayed: true,
        homeTeamScore: 1,
        awayTeamScore: 0,
      },
      {
        matchDate: Date.now() + 3000,
        stadium: "Stadio Olimpico",
        homeTeam: "Italy",
        awayTeam: "Argentina",
        matchPlayed: true,
        homeTeamScore: 2,
        awayTeamScore: 2,
      },
      {
        matchDate: Date.now() + 4000,
        stadium: "Olympic Stadium Berlin",
        homeTeam: "Germany",
        awayTeam: "Argentina",
        matchPlayed: true,
        homeTeamScore: 1,
        awayTeamScore: 2,
      },
      {
        matchDate: Date.now() + 5000,
        stadium: "Stadio Olimpico",
        homeTeam: "Italy",
        awayTeam: "Brazil",
        matchPlayed: true,
        homeTeamScore: 1,
        awayTeamScore: 1,
      },
    ]);

    const leaderboard = leagueService.getLeaderboard();

    expect(leaderboard[0].points).toBe(5);
    expect(leaderboard[1].points).toBe(4);
    expect(leaderboard[2].points).toBe(4);
    expect(leaderboard[3].points).toBe(2);
  });

  test("check leaderboard after six matches with goal difference tiebreaker between 2 teams", () => {
    leagueService.setMatches([
      {
        matchDate: Date.now(),
        stadium: "Maracanã",
        homeTeam: "Brazil",
        awayTeam: "Argentina",
        matchPlayed: true,
        homeTeamScore: 2,
        awayTeamScore: 2,
      },
      {
        matchDate: Date.now() + 1000,
        stadium: "Maracanã",
        homeTeam: "Brazil",
        awayTeam: "Germany",
        matchPlayed: true,
        homeTeamScore: 3,
        awayTeamScore: 1,
      },
      {
        matchDate: Date.now() + 2000,
        stadium: "Olympic Stadium Berlin",
        homeTeam: "Germany",
        awayTeam: "Italy",
        matchPlayed: true,
        homeTeamScore: 0,
        awayTeamScore: 2,
      },
      {
        matchDate: Date.now() + 3000,
        stadium: "Stadio Olimpico",
        homeTeam: "Italy",
        awayTeam: "Argentina",
        matchPlayed: true,
        homeTeamScore: 1,
        awayTeamScore: 3,
      },
      {
        matchDate: Date.now() + 4000,
        stadium: "Olympic Stadium Berlin",
        homeTeam: "Germany",
        awayTeam: "Argentina",
        matchPlayed: true,
        homeTeamScore: 1,
        awayTeamScore: 0,
      },
      {
        matchDate: Date.now() + 5000,
        stadium: "Stadio Olimpico",
        homeTeam: "Italy",
        awayTeam: "Brazil",
        matchPlayed: true,
        homeTeamScore: 2,
        awayTeamScore: 0,
      },
    ]);

    const leaderboard = leagueService.getLeaderboard();

    const brazil = leaderboard.find((team) => team.teamName === "Brazil");
    const argentina = leaderboard.find((team) => team.teamName === "Argentina");

    expect(brazil.points).toBe(argentina.points);
    expect(argentina.goalsFor - argentina.goalsAgainst).toBeGreaterThan(
      brazil.goalsFor - brazil.goalsAgainst
    );
    expect(leaderboard[1]).toBe(argentina);
    expect(leaderboard[2]).toBe(brazil);
  });

  test("check leaderboard after six matches with goalsFor tiebreaker between teams", () => {
    leagueService.setMatches([
      {
        matchDate: Date.now(),
        stadium: "Maracanã",
        homeTeam: "Brazil",
        awayTeam: "Argentina",
        matchPlayed: true,
        homeTeamScore: 2,
        awayTeamScore: 2,
      },
      {
        matchDate: Date.now() + 1000,
        stadium: "Maracanã",
        homeTeam: "Brazil",
        awayTeam: "Germany",
        matchPlayed: true,
        homeTeamScore: 1,
        awayTeamScore: 1,
      },
      {
        matchDate: Date.now() + 2000,
        stadium: "Olympic Stadium Berlin",
        homeTeam: "Germany",
        awayTeam: "Italy",
        matchPlayed: true,
        homeTeamScore: 0,
        awayTeamScore: 0,
      },
      {
        matchDate: Date.now() + 3000,
        stadium: "Stadio Olimpico",
        homeTeam: "Italy",
        awayTeam: "Argentina",
        matchPlayed: true,
        homeTeamScore: 1,
        awayTeamScore: 1,
      },
      {
        matchDate: Date.now() + 4000,
        stadium: "Olympic Stadium Berlin",
        homeTeam: "Germany",
        awayTeam: "Argentina",
        matchPlayed: true,
        homeTeamScore: 3,
        awayTeamScore: 3,
      },
      {
        matchDate: Date.now() + 5000,
        stadium: "Stadio Olimpico",
        homeTeam: "Italy",
        awayTeam: "Brazil",
        matchPlayed: true,
        homeTeamScore: 0,
        awayTeamScore: 0,
      },
    ]);

    const leaderboard = leagueService.getLeaderboard();

    const germany = leaderboard.find((team) => team.teamName === "Germany");
    const argentina = leaderboard.find((team) => team.teamName === "Argentina");

    expect(germany.points).toBe(argentina.points);
    expect(germany.goalsFor - germany.goalsAgainst).toBe(
      argentina.goalsFor - argentina.goalsAgainst
    );

    expect(argentina.goalsFor).toBeGreaterThan(germany.goalsFor);
  });

  test("check leaderboard after six matches with alphabetical tiebreaker for teams", () => {
    leagueService.setMatches([
      {
        matchDate: Date.now(),
        stadium: "Maracanã",
        homeTeam: "Brazil",
        awayTeam: "Argentina",
        matchPlayed: true,
        homeTeamScore: 2,
        awayTeamScore: 2,
      },
      {
        matchDate: Date.now() + 1000,
        stadium: "Maracanã",
        homeTeam: "Brazil",
        awayTeam: "Germany",
        matchPlayed: true,
        homeTeamScore: 2,
        awayTeamScore: 2,
      },
      {
        matchDate: Date.now() + 2000,
        stadium: "Olympic Stadium Berlin",
        homeTeam: "Germany",
        awayTeam: "Italy",
        matchPlayed: true,
        homeTeamScore: 0,
        awayTeamScore: 0,
      },
      {
        matchDate: Date.now() + 3000,
        stadium: "Stadio Olimpico",
        homeTeam: "Italy",
        awayTeam: "Argentina",
        matchPlayed: true,
        homeTeamScore: 2,
        awayTeamScore: 2,
      },
      {
        matchDate: Date.now() + 4000,
        stadium: "Olympic Stadium Berlin",
        homeTeam: "Germany",
        awayTeam: "Argentina",
        matchPlayed: true,
        homeTeamScore: 1,
        awayTeamScore: 1,
      },
      {
        matchDate: Date.now() + 5000,
        stadium: "Stadio Olimpico",
        homeTeam: "Italy",
        awayTeam: "Brazil",
        matchPlayed: true,
        homeTeamScore: 1,
        awayTeamScore: 1,
      },
    ]);

    const leaderboard = leagueService.getLeaderboard();

    const brazil = leaderboard.find((team) => team.teamName === "Brazil");
    const argentina = leaderboard.find((team) => team.teamName === "Argentina");
    const germany = leaderboard.find((team) => team.teamName === "Germany");
    const italy = leaderboard.find((team) => team.teamName === "Italy");

    expect(brazil.points).toBe(argentina.points);
    expect(brazil.goalsFor - brazil.goalsAgainst).toBe(
      argentina.goalsFor - argentina.goalsAgainst
    );
    expect(brazil.goalsFor).toBe(argentina.goalsFor);

    expect(leaderboard.indexOf(argentina)).toBeLessThan(
      leaderboard.indexOf(brazil)
    );

    expect(leaderboard.indexOf(germany)).toBeLessThan(
      leaderboard.indexOf(italy)
    );
  });

  test("check leaderboard after six matches with GF as tiebreaker for 2 teams and GD tiebreaker between for another 2", () => {
    leagueService.setMatches([
      {
        matchDate: Date.now(),
        stadium: "Maracanã",
        homeTeam: "Brazil",
        awayTeam: "Argentina",
        matchPlayed: true,
        homeTeamScore: 0,
        awayTeamScore: 0,
      },
      {
        matchDate: Date.now() + 1000,
        stadium: "Maracanã",
        homeTeam: "Brazil",
        awayTeam: "Germany",
        matchPlayed: true,
        homeTeamScore: 5,
        awayTeamScore: 0,
      },
      {
        matchDate: Date.now() + 2000,
        stadium: "Olympic Stadium Berlin",
        homeTeam: "Germany",
        awayTeam: "Italy",
        matchPlayed: true,
        homeTeamScore: 0,
        awayTeamScore: 0,
      },
      {
        matchDate: Date.now() + 3000,
        stadium: "Stadio Olimpico",
        homeTeam: "Italy",
        awayTeam: "Argentina",
        matchPlayed: true,
        homeTeamScore: 0,
        awayTeamScore: 6,
      },
      {
        matchDate: Date.now() + 4000,
        stadium: "Olympic Stadium Berlin",
        homeTeam: "Germany",
        awayTeam: "Argentina",
        matchPlayed: true,
        homeTeamScore: 1,
        awayTeamScore: 1,
      },
      {
        matchDate: Date.now() + 5000,
        stadium: "Stadio Olimpico",
        homeTeam: "Italy",
        awayTeam: "Brazil",
        matchPlayed: true,
        homeTeamScore: 0,
        awayTeamScore: 0,
      },
    ]);

    const leaderboard = leagueService.getLeaderboard();

    const brazil = leaderboard.find((team) => team.teamName === "Brazil");
    const argentina = leaderboard.find((team) => team.teamName === "Argentina");
    const germany = leaderboard.find((team) => team.teamName === "Germany");
    const italy = leaderboard.find((team) => team.teamName === "Italy");

    expect(leaderboard[0]).toBe(argentina)
    expect(leaderboard[1]).toBe(brazil)
    expect(brazil.points).toBe(argentina.points)
    expect(leaderboard[2]).toBe(germany)
    expect(leaderboard[3]).toBe(italy)
    expect(germany.goalsFor - germany.goalsAgainst).toBeGreaterThan(italy.goalsFor - italy.goalsAgainst)
  });
});
