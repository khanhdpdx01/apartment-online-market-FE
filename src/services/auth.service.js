import http from "./index";
import TokenService from "./token.service";

class AuthService {
  login({ username, password }) {
    return http
      .post("/auth/signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          TokenService.setUser(response.data);
        }

        return response.data;
      });
  }

  logout() {
    TokenService.removeUser();
  }

  register({ username, password, confirmPassword, mailNotification }) {
    return http.post("/auth/signup", {
      username,
      password,
      confirmPassword,
      mailNotification,
      
    });
  }
}

export default new AuthService();
