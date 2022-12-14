import http from "./index";

class ProductService {
  fetchProducts() {
    return http.get("/products").then((response) => {
      return response.data;
    });
  }

  fetchDetailsProduct(productId) {
    return http.get(`/products/${productId}`).then((response) => {
      return response.data;
    });
  }

  fitlerProduct(data) {
    return http.post("/products/filter", data).then((response) => {
      return response.data;
    });
  }
}

export default new ProductService();
