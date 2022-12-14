class TokenService {
  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.refreshToken;
  }

  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.accessToken;
  }

  updateLocalAccessToken(token) {
    let user = JSON.parse(localStorage.getItem("user"));
    user.accessToken = token;
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem("user");
  }

  setTokenExpired(value) {
    let user = JSON.parse(localStorage.getItem("user"));
    user.isExpired = value;
    localStorage.setItem("user", JSON.stringify(user));
  }

  checkTokenExpired() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.isExpired;
  }
}

export default new TokenService();
