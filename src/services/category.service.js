import http from "./index";

class CategoryService {
  fetchCategories() {
    return http.get("/categories").then((response) => {
      return response.data;
    });
  }
}

export default new CategoryService();
