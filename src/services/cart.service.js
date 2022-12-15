import http from "./index";

class CartService {
  getCart() {
    return http.get("/cart").then((response) => {
      return response.data;
    });
  }

  addProductToCart({ productId, quantity }) {
    return http
      .post("/cart", {
        productId,
        quantity,
      })
      .then((response) => {
        return response.data;
      });
  }

  updateQuantity({ cartItemId, productId, quantity }) {
    return http
      .patch(`/cart-item/${cartItemId}`, {
        productId,
        quantity,
      })
      .then((response) => {
        return response.data;
      });
  }

  removeCartItem(cartId) {
    return http.delete(`/cart/${cartId}`).then((response) => {
      return response.data;
    });
  }
}

export default new CartService();
