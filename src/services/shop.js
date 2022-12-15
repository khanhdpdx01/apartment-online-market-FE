import http from "./index";

class StoreService {
  GetProduct() {
        return http
            .get("http://34.143.194.243:9090/api/stores")
            .then((response) => {
                return response.data
            });
  }
}

export default new StoreService();
