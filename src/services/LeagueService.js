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
   * Match schedule will be given in the following form:
   * [
   *      {
   *          matchDate: [TIMESTAMP],
   *          stadium: [STRING],
   *          homeTeam: [STRING],
   *          awayTeam: [STRING],
   *          matchPlayed: [BOOLEAN],
   *          homeTeamScore: [INTEGER],
   *          awayTeamScore: [INTEGER]
   *      },
   *      {
   *          matchDate: [TIMESTAMP],
   *          stadium: [STRING],
   *          homeTeam: [STRING],
   *          awayTeam: [STRING],
   *          matchPlayed: [BOOLEAN],
   *          homeTeamScore: [INTEGER],
   *          awayTeamScore: [INTEGER]
   *      }
   * ]
   *
   * @param {Array} matches List of matches.
   */
  setMatches(matches) {
    this.matches = matches;
  }

  /**
   * Returns the full list of matches.
   *
   * @returns {Array} List of matches.
   */
  getMatches() {}

  /**
   * Returns the leaderboard in a form of a list of JSON objecs.
   *
   * [
   *      {
   *          teamName: [STRING]',
   *          matchesPlayed: [INTEGER],
   *          goalsFor: [INTEGER],
   *          goalsAgainst: [INTEGER],
   *          points: [INTEGER]
   *      },
   * ]
   *
   * @returns {Array} List of teams representing the leaderboard.
   */
  getLeaderboard() {}

  /**
   * Asynchronic function to fetch the data from the server and set the matches.
   */
  async fetchData() {
    //const matches = [] //TODO: replace this with the correct matches.
    //this.setMatches(matches);
    try {
      // Fetch the access token
      const tokenResponse = await fetch("http://localhost:3001/api/v1/getAccessToken");
      if (!tokenResponse.ok) {
        throw new Error(
          `Failed to fetch access token: ${tokenResponse.status}`
        );
      }
      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;

      // Use the access token to fetch the matches
      const matchesResponse = await fetch("http://localhost:3001/api/v1/getAllMatches", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!matchesResponse.ok) {
        throw new Error(`Failed to fetch matches: ${matchesResponse.status}`);
      }
      const result = await matchesResponse.json();

      // Set the matches in the service
      this.setMatches(result.matches);
    } catch (error) {
      console.error("Error fetching matches data:", error);
    }
  }
}

export default LeagueService;
