/**
 * A class representing a service that processes the data for match schedule
 * and generates leaderboard.
 *
 * NOTE: MAKE SURE TO IMPLEMENT ALL EXISITNG METHODS BELOW WITHOUT CHANGING THE INTERFACE OF THEM,
 *       AND PLEASE DO NOT RENAME, MOVE OR DELETE THIS FILE.
 *
 *       ADDITIONALLY, MAKE SURE THAT ALL LIBRARIES USED IN THIS FILE FILE ARE COMPATIBLE WITH PURE JAVASCRIPT
 *
 */
class LeagueService {
  constructor() {
    this.matches = [];
  }
  /**
   * Sets the match schedule.
   * @param {Array} matches List of matches.
   */
  setMatches(matches) {
    this.matches = matches;
  }

  /**
   * Returns the full list of matches.
   * @returns {Array} List of matches.
   */
  getMatches() {
    return this.matches;
  }

  /**
   * Returns the leaderboard in a form of a list of JSON objecs.
   * @returns {Array} List of teams representing the leaderboard.
   */
  getLeaderboard() {
    const standingsMap = this._calculateStandings();
    const standingsArray = [...standingsMap.values()];
    return this._sortStandings(standingsArray);
  }
  _calculateStandings() {
    const standingsMap = new Map();

    for (const match of this.matches) {
      if (!standingsMap.has(match.homeTeam)) {
        this._initializeTeamStanding(match.homeTeam, standingsMap);
      }
      if (!standingsMap.has(match.awayTeam)) {
        this._initializeTeamStanding(match.awayTeam, standingsMap);
      }
      if (match.matchPlayed) {
        this._updateMatchResults(match, standingsMap);
      }
    }
    return standingsMap;
  }
  _initializeTeamStanding(teamName, standingsMap) {
    const teamStanding = {
      teamName: teamName,
      matchesPlayed: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      points: 0,
      headToHead: {},
    };
    standingsMap.set(teamName, teamStanding);
  }

  _updateMatchesPlayed(homeTeam, awayTeam) {
    homeTeam.matchesPlayed++;
    awayTeam.matchesPlayed++;
  }

  _updateTeamGoals(homeTeam, awayTeam, match) {
    homeTeam.goalsFor += match.homeTeamScore;
    homeTeam.goalsAgainst += match.awayTeamScore;

    awayTeam.goalsFor += match.awayTeamScore;
    awayTeam.goalsAgainst += match.homeTeamScore;
  }

  _updateHeadToHead(homeTeam, awayTeam, match) {
    homeTeam.headToHead[awayTeam.teamName] =
      homeTeam.headToHead[awayTeam.teamName] || 0;
    awayTeam.headToHead[homeTeam.teamName] =
      awayTeam.headToHead[homeTeam.teamName] || 0;

    if (match.homeTeamScore > match.awayTeamScore) {
      homeTeam.headToHead[awayTeam.teamName] += 3;
    } else if (match.homeTeamScore < match.awayTeamScore) {
      awayTeam.headToHead[homeTeam.teamName] += 3;
    } else {
      homeTeam.headToHead[awayTeam.teamName] += 1;
      awayTeam.headToHead[homeTeam.teamName] += 1;
    }
  }

  _updateTeamPoints(homeTeam, awayTeam, match) {
    if (match.homeTeamScore > match.awayTeamScore) {
      homeTeam.points += 3;
    } else if (match.homeTeamScore < match.awayTeamScore) {
      awayTeam.points += 3;
    } else {
      homeTeam.points += 1;
      awayTeam.points += 1;
    }
  }

  _sortStandings(standings) {
    return standings
      .sort((a, b) => {
        // Primary sorting by points
        const pointDifference = b.points - a.points;
        if (pointDifference !== 0) return pointDifference;

        // Secondary tiebreaker: head-to-head points
        const aToBHeadToHead = a.headToHead[b.teamName] || 0;
        const bToAHeadToHead = b.headToHead[a.teamName] || 0;
        const headToHeadDifference = bToAHeadToHead - aToBHeadToHead;
        if (headToHeadDifference !== 0) return headToHeadDifference;

        // Tertiary tiebreakers: goal difference 
        const goalDifference =
          b.goalsFor - b.goalsAgainst - (a.goalsFor - a.goalsAgainst);
        if (goalDifference !== 0) return goalDifference;

        // next tiebreaker: goals scored
        if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;

        // last tiebreaker: alphabetic order
        return a.teamName.localeCompare(b.teamName);
      })
      .map((team) => ({
        // Return only the required fields
        teamName: team.teamName,
        matchesPlayed: team.matchesPlayed,
        goalsFor: team.goalsFor,
        goalsAgainst: team.goalsAgainst,
        points: team.points,
      }));
  }
  _updateMatchResults(match, standingsMap) {
    const homeTeam = standingsMap.get(match.homeTeam);
    const awayTeam = standingsMap.get(match.awayTeam);
    this._updateMatchesPlayed(homeTeam, awayTeam);
    this._updateTeamGoals(homeTeam, awayTeam, match);
    this._updateTeamPoints(homeTeam, awayTeam, match);
    this._updateHeadToHead(homeTeam, awayTeam, match);
  }

  /**
   * Asynchronic function to fetch the data from the server and set the matches.
   */
  async fetchData() {
    try {
      const tokenResponse = await fetch(
        "http://localhost:3001/api/v1/getAccessToken"
      );
      if (!tokenResponse.ok) {
        throw new Error(
          `Failed to fetch access token: ${tokenResponse.status}`
        );
      }
      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;

      const matchesResponse = await fetch(
        "http://localhost:3001/api/v1/getAllMatches",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!matchesResponse.ok) {
        throw new Error(`Failed to fetch matches: ${matchesResponse.status}`);
      }
      const result = await matchesResponse.json();

      this.setMatches(result.matches);
    } catch (error) {
      console.error("Error fetching matches data:", error);
    }
  }
}

export default LeagueService;
