import { BASE_URL, EndpointEnum } from "../constants";
class AuthService {
  constructor() {
    this.token = "";
  }

  setToken(token) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  async fetchAccessToken() {
    try {
      const tokenResponse = await fetch(`${BASE_URL}${EndpointEnum.Token}`);
      const tokenData = await tokenResponse.json();
      this.setToken(tokenData.access_token);
    } catch (error) {
      console.error("Error fetching access token:", error);
      throw error;
    }
  }
}

export default AuthService;
