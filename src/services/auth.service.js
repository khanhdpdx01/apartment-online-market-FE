import http from "./index";
import TokenService from "./token.service";

class AuthService {
  login({ username, password }) {
    return http
      .post("/v1/auth/signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          TokenService.setUser(response.data);
          TokenService.setTokenExpired(false);
        }

        return response.data;
      });
  }

  logout() {
    TokenService.removeUser();
  }

  register({ username, password, confirmPassword, mailNotification }) {
    return http.post("/v1/auth/signup", {
      username,
      password,
      confirmPassword,
      mailNotification,
    });
  }
}

export default new AuthService();
