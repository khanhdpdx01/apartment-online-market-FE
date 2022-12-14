import http from "./index";
import TokenService from "./token.service";

const setup = (store) => {
  http.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      const isExpired = TokenService.checkTokenExpired();

      if (token && !isExpired) {
        config.headers["Authorization"] = "Bearer " + token; // for Spring Boot back-end
        // config.headers["x-access-token"] = token; // for Node.js Express back-end
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  http.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;

      if (originalConfig.url !== "/v1/auth/signin" && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          TokenService.setTokenExpired(true);

          try {
            const rs = await http.post("/v1/auth/refresh-token", {
              token: TokenService.getLocalRefreshToken(),
              tokenType: "Bearer",
            });
            const { accessToken } = rs.data;

            store.dispatch("auth/refreshToken", accessToken);
            TokenService.updateLocalAccessToken(accessToken);
            TokenService.setTokenExpired(false);

            return http(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
  );
};

export default setup;
